/**
 * Visual flourishes: intro preloader, custom cursor, interactive hero glow.
 * All progressive-enhancement and accessibility-first:
 *   - None of this is needed to read the site; with JS off, nothing runs and
 *     the preloader (hidden by default) never shows.
 *   - The custom cursor only activates on fine-pointer (mouse) devices.
 *   - Everything is skipped or simplified under prefers-reduced-motion.
 */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Intro preloader ---------- */
  function initPreloader() {
    var pre = document.querySelector("[data-preloader]");
    if (!pre) return;

    var bar = pre.querySelector(".preloader-bar span");
    var pct = pre.querySelector(".preloader-pct");
    var start = Date.now();
    var minMs = reduce ? 250 : 1200;
    var done = false;
    var p = 0;

    document.body.classList.add("preloading");

    var tick = setInterval(function () {
      p = Math.min(p + Math.random() * 11 + 3, 92);
      if (bar) bar.style.width = p + "%";
      if (pct) pct.textContent = Math.floor(p) + "%";
    }, 150);

    function finish() {
      if (done) return;
      done = true;
      clearInterval(tick);
      var wait = Math.max(0, minMs - (Date.now() - start));
      setTimeout(function () {
        if (bar) bar.style.width = "100%";
        if (pct) pct.textContent = "100%";
        pre.classList.add("is-done");
        document.body.classList.remove("preloading");
        setTimeout(function () {
          if (pre.parentNode) pre.parentNode.removeChild(pre);
        }, 800);
      }, wait);
    }

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
    setTimeout(finish, 6000); // hard fallback so it can never get stuck
  }

  /* ---------- Custom cursor (mouse devices only) ---------- */
  function initCursor() {
    if (!finePointer || reduce) return;

    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    var ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("has-custom-cursor");

    var mx = window.innerWidth / 2, my = window.innerHeight / 2;
    var rx = mx, ry = my;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px)";
    });

    (function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    })();

    var hoverSel = "a, button, summary, .card, [data-lang-option], .theme-swatch";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest(hoverSel)) document.body.classList.remove("cursor-hover");
    });
    document.addEventListener("mouseleave", function () { document.body.classList.add("cursor-hidden"); });
    document.addEventListener("mouseenter", function () { document.body.classList.remove("cursor-hidden"); });
  }

  /* ---------- Interactive hero glow (follows the cursor) ---------- */
  function initGlow() {
    if (reduce) return;
    var hero = document.querySelector(".hero");
    if (!hero) return;
    var queued = false;
    hero.addEventListener("mousemove", function (e) {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
        hero.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
        queued = false;
      });
    });
  }

  initPreloader();
  document.addEventListener("DOMContentLoaded", function () {
    initCursor();
    initGlow();
  });
})();
