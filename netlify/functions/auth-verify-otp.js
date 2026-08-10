// netlify/functions/auth-verify-otp.js
// Validates the OTP, marks it used, returns a signed JWT the browser stores.
// POST { email, otp }

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const THRESHOLD   = parseInt(process.env.REFERRAL_THRESHOLD || '2', 10);
const ACCESS_DAYS = parseInt(process.env.ACCESS_DAYS || '30', 10);

// Minimal JWT implementation — no external library needed
function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function signJWT(payload) {
  const header  = base64url(Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const body    = base64url(Buffer.from(JSON.stringify(payload)));
  const sig     = base64url(
    crypto.createHmac('sha256', process.env.JWT_SECRET)
          .update(`${header}.${body}`)
          .digest()
  );
  return `${header}.${body}.${sig}`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let email, otp;
  try {
    ({ email, otp } = JSON.parse(event.body));
    if (!email || !otp) throw new Error();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'email and otp required' }) };
  }

  // Fetch stored OTP
  const { data, error } = await supabase
    .from('otp_codes')
    .select('otp, expires_at, used')
    .eq('email', email)
    .single();

  if (error || !data) {
    return { statusCode: 401, body: JSON.stringify({ error: 'No code found for this email' }) };
  }

  if (data.used) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Code already used — request a new one' }) };
  }

  if (new Date(data.expires_at) < new Date()) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Code expired — request a new one' }) };
  }

  if (data.otp !== String(otp).trim()) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Incorrect code' }) };
  }

  // Confirm this user is allowed in (active window, or enough referrals to unlock).
  const userId = crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
  const { data: user } = await supabase
    .from('users')
    .select('referral_count, referrals_at_last_grant, access_expires_at')
    .eq('id', userId)
    .maybeSingle();

  const now      = new Date();
  const active   = user && user.access_expires_at && new Date(user.access_expires_at) > now;
  const progress = user ? user.referral_count - user.referrals_at_last_grant : 0;
  const eligible = progress >= THRESHOLD;

  if (!active && !eligible) {
    return { statusCode: 403, body: JSON.stringify({ error: 'Access locked — unlock by inviting friends first.', code: 'locked' }) };
  }

  // Mark OTP used
  await supabase
    .from('otp_codes')
    .update({ used: true })
    .eq('email', email);

  // Grant a fresh 30-day window on unlock/renewal; leave it untouched for an
  // already-active user just logging back in.
  const update = { id: userId, email, last_login: now.toISOString() };
  if (!active && eligible) {
    update.access_expires_at       = new Date(now.getTime() + ACCESS_DAYS * 86400 * 1000).toISOString();
    update.referrals_at_last_grant = user.referral_count;
  }
  await supabase.from('users').upsert(update, { onConflict: 'id' });

  const accessExpiresAt = update.access_expires_at || (user && user.access_expires_at) || null;

  // Issue JWT (24 h expiry)
  const token = signJWT({
    sub:   userId,
    email,
    iat:   Math.floor(Date.now() / 1000),
    exp:   Math.floor(Date.now() / 1000) + 86400
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, token, userId, email, accessExpiresAt })
  };
};
