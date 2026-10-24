"use client";

import { useState } from "react";
import { techTabs } from "@/lib/site";

export default function TechTabs() {
  const [active, setActive] = useState(techTabs[0].id);
  const tab = techTabs.find((t) => t.id === active)!;
  return (
    <div>
      <div role="tablist" aria-label="Capabilities" className="flex flex-wrap gap-2">
        {techTabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              t.id === active ? "border-accent bg-accent text-onaccent" : "border-line text-muted hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <ul role="tabpanel" className="mt-6 grid gap-3 sm:grid-cols-2">
        {tab.items.map((i) => (
          <li key={i} className="card flex items-center gap-3 p-4 text-sm">
            <span className="text-accent2" aria-hidden>✓</span> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
