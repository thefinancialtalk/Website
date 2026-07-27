/**
 * Site-wide configuration.
 * Change DEFAULT_LANGUAGE to "es" when Spanish should become the default.
 * Add new entries to THEMES to offer more color palettes later.
 */
const SITE_CONFIG = {
  defaultLanguage: "en", // "en" | "es" — flip to "es" to make Spanish the default
  supportedLanguages: ["en", "es"],
  defaultTheme: "midnight-plum-gold",
};

const THEMES = [
  {
    // Real brand palette, supplied directly (not derived) — keep this one
    // first/default since it's the actual chosen brand identity.
    id: "midnight-plum-gold",
    labelKey: "theme.midnightPlumGold",
    swatch: ["#5C3FA0", "#E8C97A"],
    vars: {
      "--color-primary": "#5C3FA0",
      "--color-primary-dark": "#2A1A4E",
      "--color-primary-light": "#E9E1F5",
      "--color-secondary": "#E8C97A",
      "--color-secondary-dark": "#C9A94F",
      "--color-accent": "#1C1035",
      "--color-bg": "#FAF7FC",
      "--color-bg-alt": "#F1EAF8",
      "--color-surface": "#FFFFFF",
      "--color-text": "#1C1035",
      "--color-text-muted": "#4A3F6B",
      "--gradient-hero": "linear-gradient(135deg, #5C3FA0 0%, #2A1A4E 55%, #1C1035 100%)",
    },
  },
  {
    id: "fuchsia-gold",
    labelKey: "theme.fuchsiaGold",
    swatch: ["#C6146C", "#F2A73B"],
    vars: {
      "--color-primary": "#C6146C",
      "--color-primary-dark": "#8E0F52",
      "--color-primary-light": "#F7D6E6",
      "--color-secondary": "#F2A73B",
      "--color-secondary-dark": "#C87F1C",
      "--color-accent": "#6C2A83",
      "--color-bg": "#FFF8F1",
      "--color-bg-alt": "#FFEFDF",
      "--color-surface": "#FFFFFF",
      "--color-text": "#2B1330",
      "--color-text-muted": "#6B5468",
      "--gradient-hero": "linear-gradient(135deg, #C6146C 0%, #8E1E7A 45%, #6C2A83 100%)",
    },
  },
  {
    id: "terracotta-turquesa",
    labelKey: "theme.terracottaTurquesa",
    swatch: ["#E2703A", "#1FA2A6"],
    vars: {
      "--color-primary": "#E2703A",
      "--color-primary-dark": "#B44F22",
      "--color-primary-light": "#FBDFCB",
      "--color-secondary": "#1FA2A6",
      "--color-secondary-dark": "#137C7F",
      "--color-accent": "#B23A6B",
      "--color-bg": "#FFF6ED",
      "--color-bg-alt": "#FDEBDA",
      "--color-surface": "#FFFFFF",
      "--color-text": "#2B1B14",
      "--color-text-muted": "#6E5A4C",
      "--gradient-hero": "linear-gradient(135deg, #E2703A 0%, #C4506A 50%, #1FA2A6 100%)",
    },
  },
  {
    id: "violeta-coral",
    labelKey: "theme.violetaCoral",
    swatch: ["#7A2D8C", "#FF6F61"],
    vars: {
      "--color-primary": "#7A2D8C",
      "--color-primary-dark": "#5A2068",
      "--color-primary-light": "#EBD9F0",
      "--color-secondary": "#FF6F61",
      "--color-secondary-dark": "#D9503F",
      "--color-accent": "#FFC857",
      "--color-bg": "#FBF3FA",
      "--color-bg-alt": "#F3E3F0",
      "--color-surface": "#FFFFFF",
      "--color-text": "#2A1330",
      "--color-text-muted": "#6B5568",
      "--gradient-hero": "linear-gradient(135deg, #7A2D8C 0%, #B23A6B 50%, #FF6F61 100%)",
    },
  },
];
