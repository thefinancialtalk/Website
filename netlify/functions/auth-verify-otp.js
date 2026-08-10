// netlify/functions/auth-verify-otp.js
// Validates the OTP, marks it used, returns a signed JWT the browser stores.
// POST { email, otp }

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

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

  // Mark OTP used
  await supabase
    .from('otp_codes')
    .update({ used: true })
    .eq('email', email);

  // Ensure user row exists in users table
  const userId = crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
  await supabase.from('users').upsert(
    { id: userId, email, last_login: new Date().toISOString() },
    { onConflict: 'id' }
  );

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
    body: JSON.stringify({ ok: true, token, userId, email })
  };
};
