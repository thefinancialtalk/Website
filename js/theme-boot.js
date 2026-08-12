/**
 * Applies the saved (or default) color palette synchronously in <head>,
 * before the body paints, so navigating between pages never flashes the
 * CSS default palette before theme.js runs. Requires config.js (THEMES,
 * SITE_CONFIG) to be loaded immediately before this script. theme.js still
 * runs later to wire up the switcher and active-state UI.
 */
(function () {
  try {
    var saved = localStorage.getItem("ft_theme");
    var theme =
      THEMES.find(function (t) { return t.id === saved; }) ||
      THEMES.find(function (t) { return t.id === SITE_CONFIG.defaultTheme; }) ||
      THEMES[0];
    var root = document.documentElement.style;
    Object.keys(theme.vars).forEach(function (prop) {
      root.setProperty(prop, theme.vars[prop]);
    });
  } catch (e) {
    /* localStorage unavailable — fall back to CSS defaults */
  }
})();
