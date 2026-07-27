/**
 * Minimal i18n engine driven by TRANSLATIONS (translations.js) and
 * SITE_CONFIG (config.js). Elements opt in via data attributes:
 *   data-i18n="home.hero.title"            -> sets textContent
 *   data-i18n-html="home.hero.title"       -> sets innerHTML
 *   data-i18n-attr-placeholder="contact.card.email" -> sets an attribute
 */
const STORAGE_KEY_LANG = "ft_lang";

function getTranslation(lang, keyPath) {
  const parts = keyPath.split(".");
  let node = TRANSLATIONS[lang];
  for (const part of parts) {
    if (node == null) return undefined;
    node = node[part];
  }
  return node;
}

function getCurrentLanguage() {
  return document.documentElement.getAttribute("lang") || SITE_CONFIG.defaultLanguage;
}

function applyLanguage(lang) {
  if (!SITE_CONFIG.supportedLanguages.includes(lang)) {
    lang = SITE_CONFIG.defaultLanguage;
  }

  document.documentElement.setAttribute("lang", lang);
  localStorage.setItem(STORAGE_KEY_LANG, lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getTranslation(lang, el.getAttribute("data-i18n"));
    if (typeof value === "string") el.textContent = value;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const value = getTranslation(lang, el.getAttribute("data-i18n-html"));
    if (typeof value === "string") el.innerHTML = value;
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const value = getTranslation(lang, el.getAttribute("data-i18n-title"));
    const brandName = getTranslation(lang, "brand.name");
    if (typeof value === "string") {
      document.title = `${value} · ${brandName}`;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const spec = el.getAttribute("data-i18n-attr"); // format: "attrName:key.path"
    const [attrName, keyPath] = spec.split(":");
    const value = getTranslation(lang, keyPath);
    if (typeof value === "string") el.setAttribute(attrName, value);
  });

  document.querySelectorAll("[data-lang-option]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.getAttribute("data-lang-option") === lang);
    btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-option") === lang ? "true" : "false");
  });

  document.dispatchEvent(new CustomEvent("ft:langchange", { detail: { lang } }));
}

function initLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY_LANG);
  const lang = saved && SITE_CONFIG.supportedLanguages.includes(saved) ? saved : SITE_CONFIG.defaultLanguage;
  applyLanguage(lang);
}

function setupLanguageSwitcher() {
  document.querySelectorAll("[data-lang-option]").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.getAttribute("data-lang-option")));
  });
}
