/**
 * Color-theme engine driven by THEMES (config.js). Applies a theme's CSS
 * custom properties to :root and persists the choice. To add a palette,
 * add an entry to THEMES in config.js — it will appear here automatically.
 */
const STORAGE_KEY_THEME = "ft_theme";

function findTheme(id) {
  return THEMES.find((t) => t.id === id) || THEMES.find((t) => t.id === SITE_CONFIG.defaultTheme) || THEMES[0];
}

function applyTheme(id) {
  const theme = findTheme(id);
  const root = document.documentElement.style;
  Object.entries(theme.vars).forEach(([prop, value]) => root.setProperty(prop, value));
  localStorage.setItem(STORAGE_KEY_THEME, theme.id);

  document.querySelectorAll("[data-theme-option]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-theme-option") === theme.id);
    btn.setAttribute("aria-pressed", btn.getAttribute("data-theme-option") === theme.id ? "true" : "false");
  });
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY_THEME);
  applyTheme(saved || SITE_CONFIG.defaultTheme);
}

function renderThemeSwitcher() {
  const containers = document.querySelectorAll("[data-theme-switcher]");
  if (!containers.length) return;

  containers.forEach((container) => {
    container.innerHTML = "";
    THEMES.forEach((theme) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-swatch";
      btn.setAttribute("data-theme-option", theme.id);
      btn.setAttribute("data-i18n-attr", `aria-label:${theme.labelKey}`);
      btn.style.setProperty("--swatch-a", theme.swatch[0]);
      btn.style.setProperty("--swatch-b", theme.swatch[1]);
      btn.innerHTML = '<span class="theme-swatch__half"></span><span class="theme-swatch__half"></span>';
      btn.addEventListener("click", () => applyTheme(theme.id));
      container.appendChild(btn);
    });
  });
}
