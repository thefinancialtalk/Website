// netlify/functions/auth-verify-otp.js
// Validates the OTP, marks it used, returns a signed JWT the browser stores.
// POST { email, otp }

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

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

  let email, otp, newsletterOptIn;
  try {
    ({ email, otp, newsletterOptIn } = JSON.parse(event.body));
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

  const userId = crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
  const now    = new Date();

  // Mark OTP used
  await supabase
    .from('otp_codes')
    .update({ used: true })
    .eq('email', email);

  // Grant (or refresh) a 30-day access window on every successful sign-in.
  const accessExpiresAt = new Date(now.getTime() + ACCESS_DAYS * 86400 * 1000).toISOString();
  const userRow = { id: userId, email, last_login: now.toISOString(), access_expires_at: accessExpiresAt };
  // Only ever record consent when it's given — never silently un-subscribe someone
  // who opted in earlier but didn't re-tick the box on a later sign-in.
  if (newsletterOptIn === true) userRow.newsletter_opt_in = true;
  await supabase.from('users').upsert(userRow, { onConflict: 'id' });

  // Optional: mirror opted-in emails into a Resend Audience so the newsletter
  // list builds itself. Skipped entirely if RESEND_AUDIENCE_ID isn't set, so
  // the app runs fine without any extra configuration.
  if (newsletterOptIn === true && process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
    try {
      await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({ email, unsubscribed: false })
      });
    } catch (e) {
      console.error('Resend audience sync failed (non-fatal):', e);
    }
  }

  // Issue JWT that stays valid for the access window (30 days)
  const token = signJWT({
    sub:   userId,
    email,
    iat:   Math.floor(Date.now() / 1000),
    exp:   Math.floor(Date.now() / 1000) + ACCESS_DAYS * 86400
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, token, userId, email, accessExpiresAt })
  };
};
