/**
 * Partner / brand-logo "wheel" — an auto-scrolling marquee of partner logos.
 *
 * HAND-OFF FRIENDLY — to add, remove, or reorder a partner you only touch the
 * PARTNERS list below:
 *   1. Drop the logo image into  assets/images/partners/  (a transparent PNG or
 *      an SVG looks best — roughly 200–400px wide).
 *   2. Add a line to PARTNERS with the name and the file path. Add an optional
 *      `url` to make that logo a clickable link.
 * That's it — every page with a [data-partner-wheel] updates automatically.
 *
 * If a logo image is missing, the partner's name is shown as text instead, so
 * the wheel always looks finished even before the real logos are added.
 */
(function () {
  var PARTNERS = [
    { name: "Rise to Thrive Foundation", logo: "assets/images/partners/rise-to-thrive.png" },
    { name: "Cloudtax",   logo: "assets/images/partners/cloudtax.png" },
    { name: "Neo",        logo: "assets/images/partners/neo.png" },
    { name: "PolicyMe",   logo: "assets/images/partners/policyme.png" },
    { name: "Walletifai", logo: "assets/images/partners/walletifai.png" },
    { name: "Drop",       logo: "assets/images/partners/drop.png" }
  ];

  function makeTile(p) {
    var tile = document.createElement(p.url ? "a" : "div");
    tile.className = "partner-item";
    if (p.url) {
      tile.href = p.url;
      tile.target = "_blank";
      tile.rel = "noopener noreferrer";
      tile.setAttribute("aria-label", p.name);
    }

    var img = document.createElement("img");
    img.className = "partner-logo";
    img.src = p.logo;
    img.alt = p.name;
    img.loading = "lazy";
    // Graceful fallback: if the file isn't there yet, swap in the name as text.
    img.addEventListener("error", function () {
      var span = document.createElement("span");
      span.className = "partner-name";
      span.textContent = p.name;
      if (img.parentNode) img.parentNode.replaceChild(span, img);
    });

    tile.appendChild(img);
    return tile;
  }

  function build(wheel) {
    if (!PARTNERS.length) {
      // No partners configured — hide the whole section so there's no empty band.
      var section = wheel.closest("[data-partner-section]");
      if (section) section.hidden = true;
      return;
    }

    var track = document.createElement("div");
    track.className = "partner-track";
    // Render the set twice so the marquee can loop seamlessly (CSS shifts it by
    // exactly one copy). Screen readers only need to hear the list once, so the
    // duplicate is hidden from them.
    PARTNERS.forEach(function (p) { track.appendChild(makeTile(p)); });
    PARTNERS.forEach(function (p) {
      var dupe = makeTile(p);
      dupe.setAttribute("aria-hidden", "true");
      track.appendChild(dupe);
    });

    wheel.appendChild(track);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-partner-wheel]").forEach(build);
  });
})();
