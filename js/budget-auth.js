/**
 * budget-auth.js
 * Client-side auth, AES-256-GCM encryption/decryption, and cloud sync.
 * Drop this into your /js/ folder and load it before budget-dashboard.js.
 *
 * Depends on: Web Crypto API (available in all modern browsers over HTTPS)
 * No external libraries required.
 */

const BudgetAuth = (() => {
  // ── Config ─────────────────────────────────────────────────────────────────
  // Your Netlify site URL — update if you use a custom domain
  const BASE = 'https://thefinancialtalk.netlify.app/.netlify/functions';

  // A public pepper mixed into key derivation.
  // This is NOT secret — it just adds site-specific context to the derived key.
  // Changing it will invalidate all existing encrypted data.
  const PEPPER = 'thefinancialtalk-budget-v1';

  const SESSION_KEY = 'tft_session';   // sessionStorage key

  // ── Session helpers ─────────────────────────────────────────────────────────
  function saveSession(token, userId, email) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ token, userId, email }));
  }

  function getSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    } catch {
      return null;
    }
  }

  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function isLoggedIn() {
    const s = getSession();
    return !!(s && s.token && s.userId);
  }

  // ── Encryption (AES-256-GCM, PBKDF2 key derivation) ───────────────────────
  // Key material = PBKDF2(userId + PEPPER, randomSalt, 100000 iterations, SHA-256)
  // This means: same user on a different site → different key. Server breach → no plaintext.

  async function deriveKey(userId, saltBuf) {
    const raw = new TextEncoder().encode(userId + PEPPER);
    const baseKey = await crypto.subtle.importKey('raw', raw, 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: saltBuf, iterations: 100000, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  function bufToB64(buf) {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  }

  function b64ToBuf(str) {
    return Uint8Array.from(atob(str), c => c.charCodeAt(0)).buffer;
  }

  async function encrypt(userId, plaintext) {
    const salt  = crypto.getRandomValues(new Uint8Array(16));
    const iv    = crypto.getRandomValues(new Uint8Array(12));
    const key   = await deriveKey(userId, salt);
    const data  = new TextEncoder().encode(plaintext);
    const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
    return {
      encrypted_blob: bufToB64(cipher),
      iv:             bufToB64(iv),
      salt:           bufToB64(salt)
    };
  }

  async function decrypt(userId, encrypted_blob, iv, salt) {
    const key    = await deriveKey(userId, b64ToBuf(salt));
    const plain  = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: b64ToBuf(iv) },
      key,
      b64ToBuf(encrypted_blob)
    );
    return new TextDecoder().decode(plain);
  }

  // ── API calls ───────────────────────────────────────────────────────────────
  async function sendOTP(email) {
    const res = await fetch(`${BASE}/auth-send-otp`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Could not send code');
    return data;
  }

  async function verifyOTP(email, otp) {
    const res = await fetch(`${BASE}/auth-verify-otp`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Verification failed');
    saveSession(data.token, data.userId, data.email);
    return data;
  }

  async function loadData() {
    const session = getSession();
    if (!session) throw new Error('Not authenticated');

    const res = await fetch(`${BASE}/data-load`, {
      headers: { 'Authorization': `Bearer ${session.token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Load failed');
    if (!data.data) return null;   // first login

    const plaintext = await decrypt(
      session.userId,
      data.data.encrypted_blob,
      data.data.iv,
      data.data.salt
    );
    return JSON.parse(plaintext);
  }

  async function saveData(payload) {
    const session = getSession();
    if (!session) throw new Error('Not authenticated');

    const encrypted = await encrypt(session.userId, JSON.stringify(payload));

    const res = await fetch(`${BASE}/data-save`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify(encrypted)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Save failed');
    return data;
  }

  async function analyse(summaryPayload) {
    const session = getSession();
    if (!session) throw new Error('Not authenticated');

    const res = await fetch(`${BASE}/ai-analyse`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify(summaryPayload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Analysis unavailable');
    return data.analysis;
  }

  function logout() {
    clearSession();
    window.location.reload();
  }

  // ── Public API ──────────────────────────────────────────────────────────────
  return { sendOTP, verifyOTP, loadData, saveData, analyse, isLoggedIn, getSession, logout };
})();
