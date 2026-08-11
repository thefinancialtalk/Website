/**
 * Partner / brand-logo "wheel" — an auto-scrolling marquee of partner logos.
 *
 * HAND-OFF FRIENDLY — to add, remove, or reorder a partner you only touch the
 * PARTNERS list below:
 *   1. Drop the logo image into  assets/images/partners/  (a transparent PNG,
 *      WebP, or SVG looks best — roughly 200–400px wide).
 *   2. Add a line to PARTNERS with the name and the file path. Add an optional
 *      `url` to make that logo a clickable link.
 * That's it — every page with a [data-partner-wheel] updates automatically.
 *
 * If a logo image is missing, the partner's name is shown as text instead, so
 * the wheel always looks finished even before the real logos are added.
 */
(function () {
  var PARTNERS = [
    { name: "Simplii Financial",     logo: "assets/images/partners/simplii.svg",       url: "https://www.simplii.com/en/home.html" },
    { name: "Neo Financial",         logo: "assets/images/partners/neo.png",           url: "https://www.neofinancial.com/" },
    { name: "Rise to Thrive Foundation", logo: "assets/images/partners/rise-to-thrive.png", url: "https://www.risingtothrive.org/" },
    { name: "CloudTax",              logo: "assets/images/partners/cloudtax.svg",       url: "https://www.cloudtax.ca/" },
    { name: "PolicyMe",              logo: "assets/images/partners/policyme.svg",       url: "https://www.policyme.com/" },
    { name: "FinCon",                logo: "assets/images/partners/fincon.png",         url: "https://finconexpo.com/" }
  ];

  var PX_PER_SEC = 55; // scroll speed — higher is faster

  function makeTile(p, hidden) {
    var tile = document.createElement(p.url ? "a" : "div");
    tile.className = "partner-item";
    if (p.url) {
      tile.href = p.url;
      tile.target = "_blank";
      tile.rel = "noopener noreferrer";
      tile.setAttribute("aria-label", p.name);
    }
    // Duplicated copies (used only to fill/loop the row) are hidden from
    // screen readers and keyboard focus so the list is announced just once.
    if (hidden) {
      tile.setAttribute("aria-hidden", "true");
      if (p.url) tile.setAttribute("tabindex", "-1");
    }

    var img = document.createElement("img");
    img.className = "partner-logo";
    img.src = p.logo;
    img.alt = hidden ? "" : p.name;
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

  function appendSet(track, hidden) {
    PARTNERS.forEach(function (p) { track.appendChild(makeTile(p, hidden)); });
  }

  function build(wheel) {
    wheel.innerHTML = "";

    if (!PARTNERS.length) {
      // No partners configured — hide the whole section so there's no empty band.
      var section = wheel.closest("[data-partner-section]");
      if (section) section.hidden = true;
      return;
    }

    var track = document.createElement("div");
    track.className = "partner-track";
    wheel.appendChild(track);

    // Under reduced-motion the CSS lays the logos out as a centered, wrapping
    // row — no marquee — so a single (visible) set is all we need.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      appendSet(track, false);
      return;
    }

    // First set is the "real" one (announced to screen readers).
    appendSet(track, false);
    // Second set lets us measure exactly how far one set advances, including the
    // spacing at the seam between sets.
    appendSet(track, true);
    var setLen = PARTNERS.length;
    var shift = track.children[setLen].offsetLeft - track.children[0].offsetLeft;

    // Keep repeating the set until the row is wide enough that scrolling by one
    // set never exposes a blank gap on the right — this is what stops the logos
    // from bunching to the left on wide screens.
    var need = wheel.clientWidth + shift;
    var guard = 0;
    while (track.scrollWidth < need && guard < 24) {
      appendSet(track, true);
      guard++;
    }

    // Drive the loop: shift by exactly one set, at a steady speed.
    track.style.setProperty("--partner-shift", shift + "px");
    track.style.animationDuration = Math.max(16, Math.round(shift / PX_PER_SEC)) + "s";
  }

  function buildAll() {
    document.querySelectorAll("[data-partner-wheel]").forEach(build);
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildAll();
    // Rebuild on resize (debounced) so the row stays gap-free across widths.
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(buildAll, 200);
    });
  });
})();
