# Budget Dashboard — Integration Setup Guide
## thefinancialtalk.netlify.app

This guide walks you through every step to go from the files in this package
to a live, working budget dashboard with email login, encrypted cloud storage,
and AI financial analysis.

Estimated time: **45–90 minutes** (mostly waiting for accounts to verify).

---

## Files in this package

```
netlify/
  functions/
    auth-send-otp.js      ← sends 6-digit email code
    auth-verify-otp.js    ← validates code, issues session token
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
   - Update the `from:` address in `netlify/functions/auth-send-otp.js` to match.
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
| `SUPABASE_SERVICE_KEY`  | From Step 1 (service_role)    |
| `RESEND_API_KEY`        | From Step 2                   |
| `ANTHROPIC_API_KEY`     | From Step 3                   |
| `JWT_SECRET`            | From Step 4                   |
| `ENCRYPTION_PEPPER`     | Any long random string you choose — e.g. `tft-budget-pepper-2026-v1` |

3. Click **Save** after each one.

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

---

## Step 7 — Add a link to the dashboard from your site

The dashboard is **not** linked from the site navigation yet — add the link
only after you have completed Steps 1–5 and confirmed the flow works (Step 9),
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

Check the **Netlify → Functions** tab after deploy to confirm all five functions show as deployed.

---

## Step 9 — Test the flow

1. Visit `https://thefinancialtalk.netlify.app/budget`
2. Enter your email and click **Send access code**
3. Check your inbox for the 6-digit code (check spam if not in inbox)
4. Enter the code — the dashboard should unlock
5. Import a CSV and verify data saves (watch the "Saved ✓" indicator in the header)
6. Click **AI analysis** and verify a response comes back

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
