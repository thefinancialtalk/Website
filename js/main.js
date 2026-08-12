document.addEventListener("DOMContentLoaded", () => {
  // Render dynamic controls first so i18n/theme can populate them.
  renderThemeSwitcher();
  initTheme();
  initLanguage();
  setupLanguageSwitcher();

  document.querySelectorAll("[data-theme-option]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-theme-option") === localStorage.getItem(STORAGE_KEY_THEME));
  });

  // Mobile nav toggle
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-reveal animation. Siblings sharing a parent (e.g. cards in a
  // grid) get an incrementing --reveal-i so their CSS transition-delay
  // staggers them into a cascade instead of popping in together.
  const revealEls = document.querySelectorAll("[data-reveal]");
  const siblingCounts = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    const i = siblingCounts.get(parent) || 0;
    el.style.setProperty("--reveal-i", i);
    siblingCounts.set(parent, i + 1);
  });
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Parallax background layers — decorative shapes drift at a fraction
  // of scroll speed for a sense of depth. Skipped for
  // prefers-reduced-motion, and never applied to interactive elements.
  const parallaxEls = document.querySelectorAll("[data-parallax]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (parallaxEls.length && !prefersReducedMotion) {
    let ticking = false;
    const updateParallax = () => {
      const viewportMid = window.innerHeight / 2;
      parallaxEls.forEach((el) => {
        const factor = parseFloat(el.getAttribute("data-parallax")) || 0;
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + rect.height / 2;
        const delta = (viewportMid - elMid) * factor;
        el.style.setProperty("--parallax-y", `${delta.toFixed(1)}px`);
      });
      ticking = false;
    };
    const onParallaxScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    updateParallax();
    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    window.addEventListener("resize", onParallaxScroll);
  }

  // Scroll-linked section fade. Each top-level section is fully opaque while
  // it sits in the middle of the screen and gently fades toward the top and
  // bottom edges — so the section you're scrolling away from fades out while
  // the next one fades in as it rolls into view. Purely decorative, so it's
  // skipped entirely for prefers-reduced-motion.
  const fadeSections = document.querySelectorAll("main > section");
  if (fadeSections.length && !prefersReducedMotion) {
    // Distance (as a fraction of the viewport height) a section travels while
    // fading between hidden and fully shown. Smaller = tighter, heavier fade
    // that resolves over a shorter scroll distance.
    const FADE_RANGE = 0.36;
    // Sections fade almost all the way out at the edges for a heavier feel.
    const MIN_OPACITY = 0.02;
    // How far (px) a section drifts up as it fades in, so it "settles" into place.
    const MAX_SHIFT = 64;
    // Ease the raw linear progress so sections linger dim, then resolve quickly.
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Fade targets: the main sections plus the stats grid (the Bilingual /
    // Culturally Rooted / Judgment-Free badges). The badges get a lead offset
    // (as a fraction of viewport height) and skip the drift transform, so they
    // fade out a beat *before* the section above them finishes — and so the
    // group fade never fights the cards' one-shot scale-in reveal.
    const targets = [];
    fadeSections.forEach((s) => {
      s.classList.add("section-fade");
      targets.push({ el: s, lead: 0, drift: true });
    });
    const statsGrid = document.querySelector(".stats-grid");
    if (statsGrid) {
      statsGrid.classList.add("section-fade");
      targets.push({ el: statsGrid, lead: 0.35, drift: false });
    }

    let fadeTicking = false;
    const updateFades = () => {
      const vh = window.innerHeight;
      const range = vh * FADE_RANGE || 1;
      targets.forEach(({ el, lead, drift }) => {
        const rect = el.getBoundingClientRect();
        const leadPx = vh * lead;
        // Fade IN as its top rises up from the bottom edge...
        const enter = (vh - rect.top) / range;
        // ...and OUT as its bottom slides up past the top edge. The lead offset
        // pulls the fade-out earlier so badges clear before the section does.
        const leave = (rect.bottom - leadPx) / range;
        let t = Math.min(enter, leave);
        if (t > 1) t = 1;
        if (t < 0) t = 0;
        const eased = easeInOutCubic(t);
        const o = MIN_OPACITY + (1 - MIN_OPACITY) * eased;
        el.style.opacity = o.toFixed(3);
        if (drift) {
          // Drift up from below as it resolves; 0 once fully shown.
          const shift = (1 - eased) * MAX_SHIFT;
          el.style.transform = shift > 0.5 ? `translate3d(0, ${shift.toFixed(1)}px, 0)` : "";
        }
      });
      fadeTicking = false;
    };
    const onFadeScroll = () => {
      if (!fadeTicking) {
        window.requestAnimationFrame(updateFades);
        fadeTicking = true;
      }
    };
    updateFades();
    window.addEventListener("scroll", onFadeScroll, { passive: true });
    window.addEventListener("resize", onFadeScroll);
  }

  // FAQ accordion — open one, close the rest (single-open behavior).
  const faqItems = document.querySelectorAll("[data-faq] details");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Footer year
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Header shadow on scroll
  const header = document.querySelector("[data-site-header]");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
});
