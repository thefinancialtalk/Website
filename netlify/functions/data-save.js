// netlify/functions/data-save.js
// Upserts the encrypted budget blob for the authenticated user.
// POST { encrypted_blob, iv, salt }  — Authorization: Bearer <jwt>
//
// Encryption is done CLIENT-SIDE before this call:
//   - Key derived with PBKDF2(userId + ENCRYPTION_PEPPER, salt, 100000, 32, sha256)
//   - Data encrypted with AES-256-GCM
//   - iv and salt are random per save, stored alongside the ciphertext
// The server never sees plaintext financial data.

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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const auth = event.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '').trim();
  const payload = verifyJWT(token);

  if (!payload) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Invalid or expired session' }) };
  }

  let encrypted_blob, iv, salt;
  try {
    ({ encrypted_blob, iv, salt } = JSON.parse(event.body));
    if (!encrypted_blob || !iv || !salt) throw new Error();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'encrypted_blob, iv, and salt required' }) };
  }

  // Enforce a reasonable size limit (5 MB of ciphertext)
  if (encrypted_blob.length > 5 * 1024 * 1024) {
    return { statusCode: 413, body: JSON.stringify({ error: 'Data too large' }) };
  }

  const { error } = await supabase
    .from('budget_data')
    .upsert(
      {
        user_id:        payload.sub,
        encrypted_blob,
        iv,
        salt,
        updated_at:     new Date().toISOString()
      },
      { onConflict: 'user_id' }
    );

  if (error) {
    console.error('Save error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Could not save data' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true })
  };
};
