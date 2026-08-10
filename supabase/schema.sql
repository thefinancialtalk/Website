-- ─────────────────────────────────────────────────────────────────
-- The Financial Talk — Budget Dashboard schema
-- Run this once in your Supabase project → SQL Editor → New query.
-- Safe to re-run: every statement guards against "already exists".
-- ─────────────────────────────────────────────────────────────────

-- Users table (minimal — no passwords stored)
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,           -- sha256 hash of lowercase email
  email       TEXT NOT NULL UNIQUE,
  last_login  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Invite / access columns (added to users) ──────────────────────
-- referral_code           : the code this user shares (…/budget?ref=CODE)
-- referred_by             : the referral_code of whoever invited them
-- referral_count          : lifetime count of friends who joined via their link
-- referrals_at_last_grant : referral_count snapshot when access was last granted
--                           (eligible for a new 30-day grant when
--                            referral_count - referrals_at_last_grant >= threshold)
-- access_expires_at       : when the current 30-day access window lapses
-- follows_attested        : ticked "I follow on Instagram + TikTok"
ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_code           TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referred_by             TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referral_count          INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS referrals_at_last_grant INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS access_expires_at       TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS follows_attested        BOOLEAN DEFAULT FALSE;

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
CREATE INDEX IF NOT EXISTS idx_otp_email          ON otp_codes(email);
CREATE INDEX IF NOT EXISTS idx_budget_user_id     ON budget_data(user_id);
CREATE INDEX IF NOT EXISTS idx_users_referral     ON users(referral_code);

-- ── Referral counter (atomic) ─────────────────────────────────────
-- Increments the owner of `code`'s referral_count by one and returns
-- their current state, so the function can decide whether they've just
-- crossed the unlock threshold and should be emailed.
CREATE OR REPLACE FUNCTION increment_referral(code TEXT)
RETURNS TABLE (
  email                   TEXT,
  referral_count          INT,
  referrals_at_last_grant INT,
  access_expires_at       TIMESTAMPTZ
) AS $$
  UPDATE users
     SET referral_count = referral_count + 1
   WHERE referral_code = code
  RETURNING email, referral_count, referrals_at_last_grant, access_expires_at;
$$ LANGUAGE sql;

-- ── Admin helper: grant (or extend) access, bypassing referrals ────
-- Use this to seed your first users and to approve/override anyone.
-- The person must have entered their email on the /budget page at least
-- once (that creates their row). Then, in the SQL editor, run e.g.:
--     SELECT grant_access('friend@example.com');        -- 30 days
--     SELECT grant_access('friend@example.com', 90);    -- 90 days
CREATE OR REPLACE FUNCTION grant_access(user_email TEXT, days INT DEFAULT 30)
RETURNS TIMESTAMPTZ AS $$
DECLARE new_exp TIMESTAMPTZ;
BEGIN
  new_exp := NOW() + (days || ' days')::INTERVAL;
  UPDATE users
     SET access_expires_at       = new_exp,
         referrals_at_last_grant  = referral_count
   WHERE email = user_email;
  RETURN new_exp;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security
-- The service role key (used only in Netlify Functions) bypasses RLS.
-- Enable RLS on all tables so direct anon/public key access is blocked.
ALTER TABLE users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE otp_codes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_data ENABLE ROW LEVEL SECURITY;

-- Deny all access via the anon/public key
-- (our functions use the service key, so they are unaffected)
DROP POLICY IF EXISTS "deny_all_users"       ON users;
DROP POLICY IF EXISTS "deny_all_otp"         ON otp_codes;
DROP POLICY IF EXISTS "deny_all_budget_data" ON budget_data;
CREATE POLICY "deny_all_users"       ON users       FOR ALL USING (false);
CREATE POLICY "deny_all_otp"         ON otp_codes   FOR ALL USING (false);
CREATE POLICY "deny_all_budget_data" ON budget_data FOR ALL USING (false);
