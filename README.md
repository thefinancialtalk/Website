# The Financial Talk — website

This is the website for **The Financial Talk** (thefinancialtalk.com): a
bilingual (English / Spanish) site for financial coaching rooted in Latina
culture.

**This guide is written for the site's owner, not a programmer.** You don't
need to know how to code to make changes. The idea is simple:

> You open this project in an AI assistant (like Claude) and describe the
> change you want in plain English. The AI edits the files for you.

The rest of this README tells you **what to say** to get common changes done,
and **where things live** so the AI (and you) always know what to touch.

---

## The one thing to understand first

The website is **static**. That means it's just a set of plain files (pages,
styling, images, and text) — there's no complicated software running behind
it. When a file changes, the live site updates automatically a minute or two
later. So "making a change" always comes down to editing one of the files
described below.

Everything you'd normally want to change — the words on a page, a photo, the
colors, the announcements — lives in a small number of predictable places.

---

## How to ask an AI to make a change

When you talk to Claude (or another AI), you don't need technical words. Just
be specific about **which page**, **what you see now**, and **what you want
instead**. Good requests look like this:

- *"On the About page, change the sentence that starts 'I help families…' to
  say '…' instead."*
- *"On the home page, swap the main photo for the new one I'm attaching."*
- *"Add a new announcement to the What's new section: title 'Free webinar',
  message 'Join us March 3rd'."*
- *"Change the site's main color from purple to a deep teal."*

Two habits that make everything go smoothly:

1. **Quote the exact words you want changed.** "The line that says X" is much
   easier to find than "the paragraph near the top."
2. **The site is bilingual.** Almost every sentence exists twice — once in
   English, once in Spanish. If you only give the English, just say *"and
   translate it to Spanish too"* and the AI will handle both. If you have the
   Spanish wording yourself, give both.

After the AI makes a change, it will save it and the live site updates on its
own. You can always ask *"show me what this will look like"* or *"undo that."*

---

## Ready-to-use prompts for common changes

Copy one of these, fill in the blanks, and paste it to the AI.

**Change wording on a page**
> On the `[home / about / services / get involved / contact / what's new]`
> page, find the text that says "`[paste the current words]`" and change it to
> "`[the new words]`". Update the Spanish version to match too.

**Add or update a homepage announcement** ("Latest updates" / "What's new")
> Add a new announcement with the title "`[title]`" and the message
> "`[message]`". Add a Spanish version too: title "`[Spanish title]`", message
> "`[Spanish message]`".

**Replace a photo**
> Replace the `[which photo — e.g. the main home page photo]` with the image
> I'm attaching. Keep it cropped and sized the same way.

**Change the site colors**
> Change the main brand color to `[describe or give a color]`. Show me the
> options first if there's more than one place it's used.

**Update a social media link**
> Update the `[Instagram / TikTok]` link across the whole site to point to
> `[the new profile URL]`.

**Change consultation prices**
> On the Contact page, change the consultation prices to `[new prices]`.
> Update the Spanish version too.

**Add a whole new page**
> Add a new page called "`[name]`" to the site, and add it to the top menu.
> It should have `[describe the content]`. Keep the same look as the other
> pages and make it bilingual.

**Fix a typo you spotted**
> There's a typo on the `[page]` page: it says "`[wrong]`" and should say
> "`[right]`". Fix the Spanish too if it has the same issue.

---

## Where things live (plain-English map)

You rarely need this — the AI knows where to look. It's here so you can follow
along or double-check.

| If you want to change… | It lives in… |
| --- | --- |
| **Any words / text** (English *and* Spanish) | `js/translations.js` — all site copy is here, in one place |
| **Homepage announcements** ("Latest updates") | `content/announcements.json` (or the `/admin` dashboard — see below) |
| **Colors / brand palette** | `js/config.js` (the color sets are near the top) |
| **Which language shows by default** | `js/config.js` (`defaultLanguage`) |
| **Photos and images** | `assets/images/` |
| **The overall look and styling** | `css/style.css` |
| **The pages themselves** (structure/layout) | the `.html` files in the main folder |

### The pages

| Menu label | File | What it is |
| --- | --- | --- |
| Home | `index.html` | Landing page |
| About | `about.html` | Nathaly's story / bio |
| What's new | `whats-new.html` | Announcements + latest TikTok |
| Tools | `services.html` | Services + interactive money calculators |
| Get Involved | `get-involved.html` | Partnership / involvement info |
| Get in touch | `contact.html` | Contact form + consultation booking |

### The behind-the-scenes files (don't usually need editing)

These make the site work; you can leave them alone unless the AI says
otherwise: `js/i18n.js` (language switching), `js/theme.js` &
`js/theme-boot.js` (color switching), `js/main.js` (menus, animations),
`js/calculators.js` (the money calculators), `js/effects.js`,
`js/announcements.js`, `js/partners.js`, `js/tiktok.js`, and `netlify.toml`
(hosting settings).

---

## Two things that are already set up

**Contact form** — The "Get in touch" form on the Contact page is **live**. It
uses a service called **Formspree**, which emails submissions to
**thefinancialtalk@gmail.com**. Nothing in the code needs changing for it to
work. If you ever stop receiving messages, check the Formspree account
(logged in as thefinancialtalk@gmail.com) — most often it's the free plan's
50-messages-per-month limit, or a first-time "confirm your email" step that
was never clicked. The form's ID in the code is `xzdnyodk`.

**Consultation booking** — The Contact page has a Google Calendar booking
widget so people can pick a time. To change your availability or prices,
update it in your **Google Calendar appointment settings** — that's separate
from this website, and changes there show up on the site automatically.

---

## The no-code announcements dashboard (`/admin`)

There's an optional dashboard where you can post homepage announcements
**without any AI or code** — just log in and type. It's the `admin/` folder
(built with a tool called Decap CMS).

To use it, it has to be switched on once in your Netlify account (Netlify
**Identity** + **Git Gateway**, then invite your email as a user). Once that's
done, you visit `thefinancialtalk.com/admin/` and log in to post updates.

If you'd rather just ask the AI to add announcements for you (the prompt is in
the list above), you can ignore this entirely — both methods edit the same
"Latest updates" section.

---

## Built but not turned on yet: the Budget Dashboard

The project contains a **complete but unlaunched** feature: a private "Budget
Dashboard" where clients could log in and track a budget, with AI-assisted
analysis. It lives in `budget.html`, the `netlify/functions/` folder, the
`supabase/` folder, and `docs/BUDGET-SETUP.md`.

**It is not linked anywhere on the live site** — a normal visitor will never
see it. It only works after connecting outside accounts (Supabase, Resend,
Anthropic) and adding their keys in Netlify, following `docs/BUDGET-SETUP.md`.

It's being kept for a possible future launch. You can leave it as-is. If you
ever want to launch it — or decide to remove it — just ask the AI and it'll
walk you through it.

---

## For a developer / AI: technical notes

- **Stack:** hand-written static HTML/CSS/vanilla JS. No build step, no
  framework. Open `index.html` directly or run `python3 -m http.server 8000`
  to preview locally.
- **Hosting:** Netlify, publishing the repo root. Domain: thefinancialtalk.com.
  `netlify.toml` holds redirects, security headers for `/budget`, and the
  serverless-functions config.
- **i18n:** every user-facing string is a key under `en` and `es` in
  `js/translations.js`, applied via `data-i18n` attributes by `js/i18n.js`.
  **When editing copy, always change both languages** to keep them in sync.
- **Theming:** color palettes are defined in the `THEMES` array in
  `js/config.js` as CSS-custom-property sets; `js/theme.js` applies them and
  `js/theme-boot.js` prevents a flash on load. The active palette follows the
  language (`languageThemes` in `config.js`).
- **Contact form:** Formspree endpoint `https://formspree.io/f/xzdnyodk` in
  `contact.html`, delivering to thefinancialtalk@gmail.com. Includes a
  honeypot (`_gotcha`) and custom `_subject`.
- **Secrets:** never commit API keys or service credentials into the
  front-end files. The budget feature's keys live only in Netlify environment
  variables (see `docs/BUDGET-SETUP.md`).
- **DNS / email records:** the domain's email-verification DNS records
  (Mailgun, Google, DMARC, etc.) are unrelated to the site's content — do not
  touch them when making website changes.
