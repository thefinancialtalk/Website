// netlify/functions/access-register.js
// Registers an email into the invite system, attests the IG/TikTok follow,
// attributes the referral (if the visitor arrived via someone's link), and
// returns the caller's own shareable code + progress toward unlocking.
//
// POST { email, follows: true, ref?: "A1B2C3" }
// →   { referralCode, referralCount, threshold, needed, active, eligible }

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const THRESHOLD = parseInt(process.env.REFERRAL_THRESHOLD || '2', 10);
const SITE_URL  = process.env.SITE_URL || 'https://thefinancialtalk.netlify.app';

// Unambiguous alphabet (no 0/O/1/I/L) for shareable codes
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function makeCode(len = 6) {
  let out = '';
  const bytes = crypto.randomBytes(len);
  for (let i = 0; i < len; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

async function uniqueCode() {
  // A couple of attempts is plenty given the keyspace (~10^8).
  for (let i = 0; i < 5; i++) {
    const code = makeCode();
    const { data } = await supabase.from('users').select('id').eq('referral_code', code).maybeSingle();
    if (!data) return code;
  }
  return makeCode(8); // fall back to a longer code
}

async function notifyUnlocked(email) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from:    'The Financial Talk <noreply@thefinancialtalk.com>', // must be a Resend-verified domain
        to:      [email],
        subject: "You've unlocked the Budget Dashboard 🎉",
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
            <h2 style="font-size:20px;font-weight:600;margin:0 0 8px;">You're unlocked!</h2>
            <p style="color:#6b7280;margin:0 0 24px;font-size:14px;">
              Enough friends joined through your link. Head back to the dashboard,
              enter this email, and I'll send your access code — good for 30 days.
            </p>
            <div style="text-align:center;margin-bottom:24px;">
              <a href="${SITE_URL}/budget" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 22px;border-radius:8px;">Open the Budget Dashboard</a>
            </div>
            <p style="color:#9ca3af;font-size:12px;margin:0;">The Financial Talk</p>
          </div>
        `
      })
    });
  } catch (e) {
    console.error('Unlock notification failed:', e);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let email, follows, ref;
  try {
    ({ email, follows, ref } = JSON.parse(event.body));
    email = String(email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) throw new Error('Invalid email');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) };
  }

  if (follows !== true) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Please confirm you follow The Financial Talk on Instagram and TikTok.' })
    };
  }

  ref = ref ? String(ref).trim().toUpperCase() : null;
  const userId = crypto.createHash('sha256').update(email).digest('hex');

  // Does this user already exist?
  const { data: existing } = await supabase
    .from('users')
    .select('referral_code, referral_count, referrals_at_last_grant, access_expires_at')
    .eq('id', userId)
    .maybeSingle();

  let row = existing;

  if (!existing) {
    // Brand-new user — attribute the referral (if the ref is a real, different user).
    let referredBy = null;
    if (ref) {
      const { data: referrer } = await supabase
        .from('users')
        .select('id, referral_code')
        .eq('referral_code', ref)
        .maybeSingle();
      if (referrer && referrer.id !== userId) referredBy = ref;
    }

    const code = await uniqueCode();
    const { data: inserted, error: insErr } = await supabase
      .from('users')
      .insert({
        id: userId,
        email,
        referral_code: code,
        referred_by: referredBy,
        referral_count: 0,
        referrals_at_last_grant: 0,
        follows_attested: true
      })
      .select('referral_code, referral_count, referrals_at_last_grant, access_expires_at')
      .single();

    if (insErr) {
      console.error('Insert error:', insErr);
      return { statusCode: 500, body: JSON.stringify({ error: 'Could not register. Try again.' }) };
    }
    row = inserted;

    // Credit the referrer (atomic) and notify them if they just crossed the line.
    if (referredBy) {
      const { data: bumped, error: rpcErr } = await supabase.rpc('increment_referral', { code: referredBy });
      const r = Array.isArray(bumped) ? bumped[0] : bumped;
      if (!rpcErr && r) {
        const active   = r.access_expires_at && new Date(r.access_expires_at) > new Date();
        const eligible = (r.referral_count - r.referrals_at_last_grant) >= THRESHOLD;
        if (eligible && !active) await notifyUnlocked(r.email);
      }
    }
  } else {
    // Returning registrant — just re-attest the follow, never re-count.
    await supabase.from('users').update({ follows_attested: true }).eq('id', userId);
  }

  const active   = row.access_expires_at && new Date(row.access_expires_at) > new Date();
  const progress = row.referral_count - row.referrals_at_last_grant;
  const eligible = progress >= THRESHOLD;

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      referralCode:  row.referral_code,
      referralCount: Math.max(0, progress),
      threshold:     THRESHOLD,
      needed:        Math.max(0, THRESHOLD - progress),
      active,
      eligible
    })
  };
};
