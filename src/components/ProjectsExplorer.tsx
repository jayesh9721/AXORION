"use client";

import { useState } from "react";
import { projectCategories, projects } from "@/lib/site";
import { ProjectCard } from "./ui";

export default function ProjectsExplorer() {
  const [cat, setCat] = useState<string>("All");
  const shown = cat === "All" ? projects : projects.filter((p) => p.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {["All", ...projectCategories].map((c) => (
          <button
            key={c}
            aria-pressed={c === cat}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${c === cat ? "border-accent bg-accent text-onaccent" : "border-line text-muted hover:text-fg"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.length ? shown.map((p) => <ProjectCard key={p.title} p={p} />) : <p className="text-muted">No projects in this category yet.</p>}
      </div>
    </div>
  );
}
