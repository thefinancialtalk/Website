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
