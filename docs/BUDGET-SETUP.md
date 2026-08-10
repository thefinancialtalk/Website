# Budget Dashboard — Integration Setup Guide
## thefinancialtalk.netlify.app

This guide walks you through every step to go from the files in this package
to a live, working budget dashboard with email login, encrypted cloud storage,
and AI financial analysis.

Estimated time: **45–90 minutes** (mostly waiting for accounts to verify).

---

## How access works (invite gate)

Access is **invite-based**, not open sign-up:

1. A visitor lands on `/budget`, follows you on Instagram + TikTok (honor checkbox),
   and enters their email to get a **personal invite link** (`…/budget?ref=CODE`).
2. Each friend who opens that link and enters their own email counts as **1**.
   When they hit the threshold (**2** friends by default), the system emails them —
   they're unlocked.
3. They enter the 6-digit code and get **30 days** of access to the dashboard.
4. After 30 days, login is refused until they invite **2 more** friends (the counter
   snapshots on each grant, so it's always "2 *new* friends" to renew).

**You (super-user) can grant or extend access to anyone at any time**, and you'll need
to do this to seed the very first users (they have nobody to invite them yet). See
*Seeding & approving users* near the end.

> Note on social verification: Instagram and TikTok give no API to confirm a specific
> person actually followed or shared, so the follow step is an honor checkbox. The
> *invite* requirement is the real, un-gameable gate — it's measured by actual new
> email sign-ups through each person's link.

---

## Files in this package

```
netlify/
  functions/
    access-register.js    ← registers email, hands back invite link, counts referrals
    auth-send-otp.js      ← sends 6-digit code (only to unlocked/active users)
    auth-verify-otp.js    ← validates code, grants 30-day access, issues session token
    data-load.js          ← loads encrypted user data
    data-save.js          ← saves encrypted user data
    ai-analyse.js         ← calls Claude API, returns analysis
supabase/
  schema.sql              ← run once in Supabase SQL editor
budget.html               ← the complete, self-contained dashboard page
                            (auth + AES-256-GCM encryption are inlined —
                            no separate js/budget-auth.js needed)
netlify.toml              ← merged into the repo's existing netlify.toml
package.json              ← Netlify Functions dependencies
docs/BUDGET-SETUP.md      ← this file
```

> **Note:** In this repo the files above are already committed on the
> `claude/financial-talk-setup-5050fx` branch and `budget.html` is complete —
> you do not need to copy files or paste in dashboard JS. Steps 1–5 (external
> accounts + Netlify environment variables) are the only setup left.

---

## Step 1 — Create a Supabase project (free)

1. Go to https://supabase.com and sign up (free tier is sufficient).
2. Click **New project**. Name it `thefinancialtalk-budget`. Choose a region close to Canada (us-east-1 or ca-central-1 if available). Set a database password and save it somewhere.
3. Wait ~2 minutes for the project to provision.
4. Go to **SQL Editor → New query**. Paste the entire contents of `supabase/schema.sql` and click **Run**.
   - **If you already ran an earlier version of this schema:** just run the updated
     `supabase/schema.sql` again. Every statement is guarded (`IF NOT EXISTS` /
     `CREATE OR REPLACE` / `DROP POLICY IF EXISTS`), so re-running is safe and it adds
     the new invite/access columns and the `grant_access()` / `increment_referral()`
     helper functions without touching your existing data.
5. Go to **Project Settings → API**. Copy:
   - **Project URL** → this is your `SUPABASE_URL`
   - **service_role** key (under "Project API keys") → this is your `SUPABASE_SERVICE_KEY`
   - Do NOT use the `anon` key in your functions — always use the service key.

---

## Step 2 — Create a Resend account (free — 3,000 emails/month)

1. Go to https://resend.com and sign up.
2. Go to **API Keys → Create API Key**. Name it `thefinancialtalk`. Copy the key → `RESEND_API_KEY`.
3. Go to **Domains → Add Domain**. Add your sending domain.
   - If you do not have a custom domain yet, Resend provides a shared `resend.dev` sending address for testing.
   - Update the `from:` address in **both** `netlify/functions/auth-send-otp.js` and
     `netlify/functions/access-register.js` to match your verified sender.
4. Follow Resend's DNS verification steps (add TXT/MX records in your domain registrar).

---

## Step 3 — Get your Anthropic API key

1. Go to https://console.anthropic.com and sign in (or create an account).
2. Go to **API Keys → Create Key**. Copy it → `ANTHROPIC_API_KEY`.
3. Add a small credit to your account ($5 covers thousands of analysis requests at Sonnet pricing).

---

## Step 4 — Generate a JWT secret

This is a random string used to sign session tokens. Run this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Copy the output → `JWT_SECRET`. Keep it private — changing it invalidates all active sessions.

---

## Step 5 — Add environment variables to Netlify

1. Go to your Netlify dashboard → **thefinancialtalk** site → **Site configuration → Environment variables**.
2. Add each of the following as a new variable:

| Variable name           | Value                          |
|-------------------------|-------------------------------|
| `SUPABASE_URL`          | From Step 1                   |
| `SUPABASE_SERVICE_KEY`  | From Step 1 (service_role / Secret key) |
| `RESEND_API_KEY`        | From Step 2                   |
| `ANTHROPIC_API_KEY`     | From Step 3                   |
| `JWT_SECRET`            | From Step 4                   |
| `ENCRYPTION_PEPPER`     | Any long random string you choose — e.g. `tft-budget-pepper-2026-v1` |
| `REFERRAL_THRESHOLD`    | *(optional)* How many friends must join through someone's link to unlock. Defaults to `2`. |
| `ACCESS_DAYS`           | *(optional)* Length of the access window in days. Defaults to `30`. |
| `SITE_URL`              | *(optional)* Your site's base URL used in emails. Defaults to `https://thefinancialtalk.netlify.app`. |

3. Click **Save** after each one.

> **Tuning the gate:** `REFERRAL_THRESHOLD` and `ACCESS_DAYS` are read at runtime, so you
> can change the "2 friends / 30 days" rule any time by editing these variables and
> redeploying — no code change needed.

---

## Step 6 — Files are already in the repo

All of the files are already committed on the `claude/financial-talk-setup-5050fx`
branch — the functions in `netlify/functions/`, `supabase/schema.sql`,
`package.json`, the merged `netlify.toml`, and the **complete** `budget.html`.

`budget.html` is self-contained and final:
- The auth + AES-256-GCM encryption module is inlined (no separate
  `js/budget-auth.js`).
- The full dashboard logic (CSV import + column mapping, category tables,
  ledger, Income/Savings/Debt/Trends/Alerts tabs, targets modal, period
  navigation) is present.
- `saveData()` is the cloud version (local backup + debounced cloud save via
  `scheduleSave()`), and the demo/seed data block has been removed so cloud
  data loads instead.

There is nothing to copy or paste — once Steps 1–5 (accounts + Netlify
environment variables) are done and the branch is deployed, the page works.

**One quick edit — your social handles.** Near the top of the `<script>` block in
`budget.html`, set the two follow links to your real profiles:

```js
const IG_URL = 'https://instagram.com/thefinancialtalk';
const TT_URL = 'https://tiktok.com/@thefinancialtalk';
```

(If your handles already match those, you can leave them.)

---

## Step 7 — Add a link to the dashboard from your site

The dashboard is **not** linked from the site navigation yet — add the link
only after you have completed Steps 1–5 and confirmed the flow works (Step 10),
so visitors never reach a non-functional page.

When ready, add to your main navigation (e.g. in `index.html` and the other
pages' `<nav class="main-nav">`):

```html
<a href="/budget" data-i18n="nav.budget">Budget</a>
```

The `/budget` → `/budget.html` redirect is already configured in `netlify.toml`.

---

## Step 8 — Deploy

```bash
git add .
git commit -m "Add budget dashboard with auth, encryption, and AI analysis"
git push origin main
```

Netlify will detect the push and deploy automatically. The functions deploy alongside the site — no separate step needed.

Check the **Netlify → Functions** tab after deploy to confirm all six functions show as deployed.

---

## Step 9 — Seeding & approving users

Because access is invite-based, the first users have nobody to invite them — so you
seed them by hand. You are also the approval/override for anyone at any time.

1. Have the person visit `/budget`, tick the follow box, and enter their email to
   **create their row** (they'll land on the "Share to unlock" screen — that's fine).
2. In Supabase → **SQL Editor → New query**, grant them access:

   ```sql
   SELECT grant_access('their@email.com');       -- 30 days (default)
   SELECT grant_access('their@email.com', 90);   -- or a custom number of days
   ```

3. They can now use **"Already have access? Sign in"** on the page to get their code.

To see who's active or how referrals are going:

```sql
SELECT email, referral_count, referrals_at_last_grant, access_expires_at
FROM users ORDER BY created_at DESC;
```

---

## Step 10 — Test the full flow

1. Visit `https://thefinancialtalk.netlify.app/budget`
2. Tick the follow box, enter your email, click **Get my invite link** → you'll see
   your share link and "0 of 2 friends joined".
3. Grant yourself access with `SELECT grant_access('you@email.com');` (Step 9), then
   click **Send my access code** (or **Already have access? Sign in**).
4. Check your inbox for the 6-digit code (check spam if not in inbox) and enter it —
   the dashboard should unlock.
5. Import a CSV and verify data saves (watch the "Saved ✓" indicator in the header).
6. Click **AI analysis** and verify a response comes back.
7. **Optional — test the invite loop:** open your invite link in a private/incognito
   window, register a second email, then reload your Share screen (or **Refresh
   progress**) — the counter should tick up.

---

## Ongoing costs

| Service      | Free tier                          | Paid starts at     |
|--------------|------------------------------------|--------------------|
| Supabase     | 500 MB DB, 2 GB transfer           | $25/month          |
| Resend       | 3,000 emails/month                 | $20/month (50k)    |
| Anthropic    | Pay per use (~$0.003 per analysis) | No subscription    |
| Netlify      | 125k function invocations/month    | $19/month (500k)   |

For personal or small-group use, the free tiers cover everything comfortably.

---

## Security notes

- **No plaintext financial data ever reaches the server.** Encryption (AES-256-GCM) and key derivation (PBKDF2) happen in the browser using the Web Crypto API before data is sent.
- **The JWT secret** signs session tokens. If it leaks, rotate it (existing sessions expire within 24 hours automatically).
- **The service role key** must never appear in client-side code. It only lives in Netlify environment variables and is used only inside the serverless functions.
- **OTP codes** expire after 10 minutes and are marked used after a single successful verification.
- **Row Level Security** on Supabase blocks all direct database access via the public anon key — only the service role key (used in functions) can read or write.

---

## Bilingual support

The dashboard detects language from:
1. `document.documentElement.lang` (set by your existing theme switcher)
2. `localStorage.getItem('tft_lang')` (fallback)

The AI analysis language is controlled independently by the EN/ES toggle in the AI panel header, so users can get analysis in either language regardless of the site language.

To add more translated strings, edit the `t` object at the top of the `<script>` block in `budget.html`.

---

## Troubleshooting

**"Could not send code"** — Check the Netlify function logs (Site → Functions → auth-send-otp → View logs). Usually a missing `RESEND_API_KEY` or an unverified sending domain.

**"Invalid or expired session"** — The JWT_SECRET may have changed, or the session is over 24 hours old. The user just needs to log in again.

**"AI analysis unavailable"** — Check the `ai-analyse` function logs. Usually a missing `ANTHROPIC_API_KEY` or insufficient API credits.

**Data not saving** — Check the `data-save` function logs. Usually a Supabase permission issue — confirm the schema was run correctly and the `SUPABASE_SERVICE_KEY` (not the anon key) is set.

**Functions not appearing after deploy** — Confirm `netlify.toml` has the `[functions]` block pointing to `netlify/functions`, and that `package.json` is in the repo root.
