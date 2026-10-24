export type ThemeId = "dark" | "light" | "indigo" | "emerald" | "gold";

// bg/accent are only used for the swatch dots in the picker; real colours live in globals.css.
export const themes: { id: ThemeId; label: string; bg: string; accent: string }[] = [
  { id: "dark", label: "Dark Blue", bg: "#060912", accent: "#2f6bff" },
  { id: "light", label: "Light", bg: "#f6f8fd", accent: "#1d4ed8" },
  { id: "indigo", label: "Midnight Indigo", bg: "#0a0a18", accent: "#6366f1" },
  { id: "emerald", label: "Emerald Slate", bg: "#06130f", accent: "#10b981" },
  { id: "gold", label: "Graphite & Gold", bg: "#0e0e10", accent: "#e0a82e" },
];

export const themeIds = themes.map((t) => t.id);

export function applyTheme(id: ThemeId) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem("theme", id);
  } catch {}
}
