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

Drop these in to replace the temporary text placeholders:

- `rise-to-thrive.png`
- `cloudtax.png`
- `neo.png`
- `policyme.png`
- `walletifai.png`
- `drop.png`

Until a matching image file is added, the partner's **name shows as text**, so
the wheel always looks finished.
