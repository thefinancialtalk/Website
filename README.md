# The Financial Talk

A modern, bilingual personal-brand site for financial coaching rooted in
Latina culture. Static HTML/CSS/JS — no build step, no framework, works
anywhere (GitHub Pages, Netlify, any static host, or just double-click
`index.html`).

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html, about.html, services.html, contact.html
css/style.css        — all styling, theme via CSS custom properties
js/config.js          — default language, color palettes
js/translations.js    — all English/Spanish copy (incl. brand name)
js/i18n.js             — language-switching engine
js/theme.js            — color-palette-switching engine
js/main.js              — nav, scroll reveal, parallax, wiring
js/announcements.js      — renders content/announcements.json on the homepage
assets/images/            — photos (see Images below)
content/announcements.json — homepage "Latest updates" data, edited via /admin
admin/                       — Decap CMS (content editing dashboard)
netlify.toml                  — Netlify config (needed for the CMS backend)
```

## Customize

**Brand name** — set per language in `js/translations.js`'s `brand.name`
/ `brand.monogram` (English: "The Financial Talk" / "FT"; Spanish: "La
Charla Financiera" / "CF"). The favicon monogram letter is separate —
it's a static "F" baked into each page's data-URI favicon, since
favicons can't switch with the page language.

**Copy** — everything is in `js/translations.js`. Every string is
duplicated under `en` and `es`; edit both to keep languages in sync. The
About page bio is Nathaly's real story; the three home-page testimonials
still use realistic-but-placeholder names (Daniela R., Vanessa M., Camila
T.) and invented quotes — swap in real client testimonials (with their
permission) when available. There's no contact email yet — the contact
page currently points people to Instagram/TikTok only; add a real email
or booking link in `contact.card.body`/the contact page once you have
one.

**Default language** — set `defaultLanguage` in `js/config.js` to `"es"`
when Spanish should be the default. A visitor's choice is remembered
(localStorage) and overrides the default on repeat visits.

**Add a language** — add a new top-level key (e.g. `fr`) to
`TRANSLATIONS` in `js/translations.js` with every string translated, then
add `"fr"` to `SITE_CONFIG.supportedLanguages` in `js/config.js`. It will
automatically get a switcher button — add `<button data-lang-option="fr">FR</button>`
next to the EN/ES buttons in each page's `.lang-switcher`.

**Colors** — four palettes ship by default. `midnight-plum-gold` (Midnight
#1C1035, Deep Plum #2A1A4E, Violet #5C3FA0, Soft Gold #E8C97A, Body Plum
#4A3F6B for muted text) is the real brand palette and the default theme;
Fuchsia & Gold, Terracotta & Turquoise, and Violet & Coral are alternates.
Switchable live via the swatch picker in the header. Add more by adding
an entry to the `THEMES` array in `js/config.js` — it appears in the
picker automatically. Each theme is just a set of CSS custom property
overrides.

**Images** — `assets/images/home-about.jpg` and `assets/images/about-story.jpg`
are the two photos currently used, cropped and color-matched to blend into
the oval frame (`.room-photo`) on the home and about pages — the section
background is sampled from the photo's own studio backdrop, so there's no
visible seam. Three more portraits are in `assets/images/`
(`extra-purple-standing.jpg`, `extra-black-tan-bg.jpg`,
`extra-money-throw.jpg`) but not placed on any page yet. Each photo's alt
text is a translation key (e.g. `home.about.photoAlt` in
`js/translations.js`).

**Social links** — the `#` placeholders in the footer and contact page
social icons still need real URLs (LinkedIn, Instagram, TikTok, etc.) —
just find/replace the `href="#"` attributes in `index.html`, `about.html`,
`services.html`, and `contact.html`.

## Contact form (Formspree)

`contact.html` has a real form (name/email/message) that POSTs to
Formspree, which forwards submissions to an email inbox — no backend
needed. It's wired but not activated yet:

1. Go to https://formspree.io and sign up using `financialtalk@gmail.com`.
2. Create a new form. Formspree gives you a form ID / endpoint that looks
   like `https://formspree.io/f/abcd1234`.
3. In `contact.html`, find the `<form ... action="https://formspree.io/f/YOUR_FORM_ID">`
   line and replace `YOUR_FORM_ID` with your real ID.
4. Formspree's free tier covers 50 submissions/month, which should be
   plenty for a site like this.

Until step 3 is done, the form will fail to submit (the placeholder ID
isn't real) — happy to make that swap the moment you have the real ID,
just paste it here.

## Content editing (Decap CMS)

Non-technical editing dashboard, so someone other than a developer can
post announcements without touching code. This needs the site to be
hosted on Netlify (git-gateway backend) rather than GitHub Pages — the
`netlify.toml` file is already there for this.

Setup (one-time, needs to be done in your own Netlify account):

1. Go to https://app.netlify.com, sign up/log in, **Add new site → Import
   an existing project**, and connect the `financial-talk-website` GitHub
   repo. Leave the build settings as-is (no build command needed).
2. In the new site's dashboard: **Identity → Enable Identity**.
3. Still under Identity: **Settings → Registration → set to "Invite
   only"** (so random people can't sign themselves up as editors).
4. **Identity → Services → Git Gateway → Enable Git Gateway.** This is
   what lets Identity users save changes to the GitHub repo without
   needing their own GitHub account.
5. **Identity → Invite users** → invite `financialtalk@gmail.com` (or
   whoever should be able to post updates). They'll get an email to set a
   password.
6. Once logged in, the editing dashboard is at
   `https://YOUR-SITE-NAME.netlify.app/admin/`.

Right now there's one collection: **Announcements**, which powers the
"Latest updates" section on the homepage (`content/announcements.json`).
Each entry has an English title/message and an optional Spanish
title/message (falls back to English if left blank). More collections
(e.g. editable page copy) can be added later the same way — just extend
`admin/config.yml`.

**Heads up**: once this is live on Netlify, you'll have two working
copies of the site — the GitHub Pages one and the Netlify one, on
different URLs. Worth deciding which one is "real" (and pointing your
actual domain at it, and/or turning the other off) once this is set up,
so updates made through the CMS actually show up on the site people
visit.

## Calendar

Not built into the pages yet — two options depending on what's needed:

- **Just showing events/dates**: create a Google Calendar, then
  **Settings → Integrate calendar → Embed code**, and send me that embed
  code (or the calendar's public URL) to drop into the site.
- **Letting people book time**: sign up for Calendly's free tier, and
  send me your scheduling link — I'll wire it in as a "Book a
  Consultation" button/widget on the Services or Contact page.

Either (or both) can be added once you have the account set up — no code
changes needed on your end beyond sending me the link.
