"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { applyTheme, themes, type ThemeId } from "@/lib/themes";
import { Icon } from "./icons";

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const snapshot = () => (document.documentElement.dataset.theme as ThemeId | undefined) ?? "dark";
const serverSnapshot = (): ThemeId => "dark";

export function useTheme() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

function Swatch({ bg, accent }: { bg: string; accent: string }) {
  return (
    <span className="relative inline-block h-5 w-5 shrink-0 overflow-hidden rounded-full border border-white/20" style={{ background: bg }} aria-hidden>
      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-tl-full" style={{ background: accent }} />
    </span>
  );
}

/** Desktop dropdown opened from the theme icon. */
export default function ThemePicker({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = useTheme();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change colour theme"
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn btn-ghost !min-h-10 !px-3 !py-2"
      >
        <Icon name="theme" size={18} />
      </button>
      {open && (
        <div role="menu" aria-label="Colour theme" className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-surface p-1.5 shadow-2xl">
          {themes.map((t) => (
            <button
              key={t.id}
              role="menuitemradio"
              aria-checked={current === t.id}
              onClick={() => { applyTheme(t.id); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface2 ${current === t.id ? "bg-surface2 font-semibold" : "text-muted"}`}
            >
              <Swatch bg={t.bg} accent={t.accent} />
              <span className="flex-1">{t.label}</span>
              {current === t.id && <Icon name="check" size={16} className="text-accent2" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Inline list used inside the mobile menu. */
export function ThemeList() {
  const current = useTheme();
  return (
    <div role="radiogroup" aria-label="Colour theme" className="grid grid-cols-2 gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          role="radio"
          aria-checked={current === t.id}
          onClick={() => applyTheme(t.id)}
          className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm ${current === t.id ? "border-accent bg-surface2 font-semibold" : "border-line text-muted"}`}
        >
          <Swatch bg={t.bg} accent={t.accent} /> {t.label}
        </button>
      ))}
    </div>
  );
}
