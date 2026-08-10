// netlify/functions/data-load.js
// Returns the encrypted budget blob for the authenticated user.
// GET — Authorization: Bearer <jwt>

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function verifyJWT(token) {
  try {
    const [header, body, sig] = token.split('.');
    const expected = base64url(
      crypto.createHmac('sha256', process.env.JWT_SECRET)
            .update(`${header}.${body}`)
            .digest()
    );
    if (sig !== expected) return null;
    const payload = JSON.parse(Buffer.from(body, 'base64').toString());
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const auth = event.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  const payload = verifyJWT(token);

  if (!payload) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid or expired session' }) };
  }

  const { data, error } = await supabase
    .from('budget_data')
    .select('encrypted_blob, iv, salt')
    .eq('user_id', payload.sub)
    .single();

  if (error || !data) {
    // First login — no data yet, return empty
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, data: null })
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, data })
  };
};
