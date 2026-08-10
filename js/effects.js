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
    var duration = reduce ? 500 : 3200; // count 0 -> 100 over ~3.2s
    var holdMs = reduce ? 0 : 650;      // linger on 100% so it's clearly seen
    var start = null;
    var done = false;

    document.body.classList.add("preloading");

    function render(v) {
      if (bar) bar.style.width = v + "%";
      if (pct) pct.textContent = v + "%";
    }

    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      render(Math.round(t * 100));
      if (t < 1) requestAnimationFrame(step);
      else finish();
    }

    function finish() {
      if (done) return;
      done = true;
      render(100); // always land on a visible 100%
      setTimeout(function () {
        pre.classList.add("is-done");
        document.body.classList.remove("preloading");
        setTimeout(function () {
          if (pre.parentNode) pre.parentNode.removeChild(pre);
        }, 800);
      }, holdMs);
    }

    requestAnimationFrame(step);
    setTimeout(finish, duration + 4000); // hard fallback so it can never get stuck
  }

  /* ---------- Space background: drifting, twinkling starfield ---------- */
  function initSpace() {
    var hero = document.querySelector(".hero");
    if (!hero) return;

    var canvas = document.createElement("canvas");
    canvas.className = "hero-space";
    canvas.setAttribute("aria-hidden", "true");
    hero.insertBefore(canvas, hero.firstChild);
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    var stars = [];
    var shooters = [];
    var nextShoot = 0;
    var w = 0, h = 0, mx = 0, my = 0;

    function build() {
      var count = Math.min(Math.round((w * h) / 5200), 220);
      stars = [];
      for (var i = 0; i < count; i++) {
        var depth = Math.random(); // 0 = far, 1 = near
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + depth * 1.5,
          a: 0.22 + Math.random() * 0.6,
          tw: 0.9 + Math.random() * 2.4,
          ph: Math.random() * Math.PI * 2,
          vx: (-0.11 - depth * 0.20) * (0.4 + Math.random()),
          vy: (-0.07 - depth * 0.13) * (0.4 + Math.random()),
          depth: depth,
          gold: Math.random() < 0.2
        });
      }
    }

    function resize() {
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var px = mx - w / 2, py = my - h / 2;
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += s.vx; s.y += s.vy;
        if (s.x < -2) s.x = w + 2; else if (s.x > w + 2) s.x = -2;
        if (s.y < -2) s.y = h + 2; else if (s.y > h + 2) s.y = -2;
        var tw = 0.3 + 0.7 * Math.sin(t * 0.001 * s.tw + s.ph); // stronger twinkle
        if (tw < 0) tw = 0;
        var ox = px * s.depth * 0.03, oy = py * s.depth * 0.03;
        ctx.beginPath();
        ctx.arc(s.x + ox, s.y + oy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? "rgba(232,201,122," + (s.a * tw).toFixed(3) + ")"
          : "rgba(255,255,255," + (s.a * tw).toFixed(3) + ")";
        ctx.fill();
      }
      drawShooters(t);
    }

    function drawShooters(t) {
      if (reduce) return;
      if (t > nextShoot) {
        nextShoot = t + 4500 + Math.random() * 6000; // one every ~4.5-10.5s
        shooters.push({
          x: Math.random() * w * 0.7,
          y: Math.random() * h * 0.35,
          ang: Math.PI * (0.11 + Math.random() * 0.13),
          sp: 7 + Math.random() * 5,
          len: 90 + Math.random() * 120,
          life: 0,
          max: 90
        });
      }
      for (var i = shooters.length - 1; i >= 0; i--) {
        var sh = shooters[i];
        sh.x += Math.cos(sh.ang) * sh.sp;
        sh.y += Math.sin(sh.ang) * sh.sp;
        sh.life++;
        var tx = sh.x - Math.cos(sh.ang) * sh.len;
        var ty = sh.y - Math.sin(sh.ang) * sh.len;
        var fade = 1 - sh.life / sh.max;
        var g = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        g.addColorStop(0, "rgba(255,255,255," + (0.85 * fade).toFixed(3) + ")");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        if (sh.life > sh.max || sh.x > w + sh.len || sh.y > h + sh.len) shooters.splice(i, 1);
      }
    }

    var raf = 0, running = false;
    function loop(t) { draw(t); raf = requestAnimationFrame(loop); }
    function start() { if (!running) { running = true; raf = requestAnimationFrame(loop); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    window.addEventListener("resize", resize);
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else if (!reduce) start();
    });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting && !reduce) start(); else stop();
      }, { threshold: 0 }).observe(hero);
    }

    resize();
    if (reduce) draw(0); // static field, no animation
    else start();
  }

  initPreloader();
  document.addEventListener("DOMContentLoaded", function () {
    initSpace();
  });
})();
