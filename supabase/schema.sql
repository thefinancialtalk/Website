-- ─────────────────────────────────────────────────────────────────
-- The Financial Talk — Budget Dashboard schema
-- Run this once in your Supabase project → SQL Editor → New query
-- ─────────────────────────────────────────────────────────────────

-- Users table (minimal — no passwords stored)
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,           -- sha256 hash of lowercase email
  email       TEXT NOT NULL UNIQUE,
  last_login  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- OTP codes table
CREATE TABLE IF NOT EXISTS otp_codes (
  email       TEXT PRIMARY KEY,
  otp         TEXT NOT NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Budget data table — one encrypted blob per user
-- The server never sees plaintext; all encryption/decryption happens client-side.
CREATE TABLE IF NOT EXISTS budget_data (
  user_id        TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  encrypted_blob TEXT NOT NULL,   -- AES-256-GCM ciphertext, base64-encoded
  iv             TEXT NOT NULL,   -- 12-byte GCM IV, base64-encoded
  salt           TEXT NOT NULL,   -- 16-byte PBKDF2 salt, base64-encoded
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_otp_email      ON otp_codes(email);
CREATE INDEX IF NOT EXISTS idx_budget_user_id ON budget_data(user_id);

-- Row Level Security
-- The service role key (used only in Netlify Functions) bypasses RLS.
-- Enable RLS on all tables so direct anon/public key access is blocked.
ALTER TABLE users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_codes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_data ENABLE ROW LEVEL SECURITY;

-- Deny all access via the anon/public key
-- (our functions use the service key, so they are unaffected)
CREATE POLICY "deny_all_users"       ON users       FOR ALL USING (false);
CREATE POLICY "deny_all_otp"         ON otp_codes   FOR ALL USING (false);
CREATE POLICY "deny_all_budget_data" ON budget_data FOR ALL USING (false);

-- Auto-clean expired/used OTPs older than 1 hour (optional cron — see README)
-- If you enable pg_cron extension in Supabase, uncomment:
-- SELECT cron.schedule('clean-otps', '0 * * * *',
--   $$DELETE FROM otp_codes WHERE expires_at < NOW() - INTERVAL '1 hour'$$);
