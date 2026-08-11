# Partner logos

These are the logos shown in the auto-scrolling "wheel" on the Home page
(between *Community voices* and *Latest updates*) and on the Tools page.

## How to add or change a logo

1. Save the logo image in **this folder**. A **transparent PNG** or an **SVG**
   works best (roughly 200–400px wide). Keep the file name lowercase with
   hyphens, e.g. `cloudtax.png`.
2. Open **`js/partners.js`** and edit the `PARTNERS` list near the top —
   add, remove, or reorder a line. Each line is:

   ```js
   { name: "Cloudtax", logo: "assets/images/partners/cloudtax.png" },
   ```

   Add an optional link to make the logo clickable:

   ```js
   { name: "Cloudtax", logo: "assets/images/partners/cloudtax.png", url: "https://cloudtax.ca" },
   ```

That's everything — both pages update automatically, and the logo is
duplicated behind the scenes so the wheel keeps looping smoothly.

## File names the site is currently looking for

Current status (the file each brand points to in `js/partners.js`):

- `simplii.svg`  — Simplii Financial ✅ in place
- `neo.png`  — Neo Financial ✅ in place (logo sits on a white background)
- `cloudtax.svg`  — CloudTax ✅ in place
- `policyme.svg`  — PolicyMe ✅ in place
- `fincon.png`  — FinCon ✅ in place (the round FC icon)
- `rise-to-thrive.png`  — Rise to Thrive Foundation ⛔ still needed
  (shows as text until a logo file is added)

Until a matching image file is added, the partner's **name shows as text**, so
the wheel always looks finished.

Unused extras kept in this folder: `turbotax.svg` (not in the wheel),
`fincon-white.webp` (white-on-transparent — invisible on a light page) and
`fincon-event.webp` (an event graphic, not a logo).
