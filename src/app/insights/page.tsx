import type { Metadata } from "next";
import { CtaBanner, PageHero } from "@/components/ui";
import { plannedTopics } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and guides on web engineering, AI automation and digital growth from AXORION.",
  alternates: { canonical: "/insights" },
};

export default function Insights() {
  return (
    <>
      <PageHero eyebrow="Blog" title={<>Guides and commentary, <span className="gradient-text">coming soon.</span></>} text="We are preparing practical articles on building and growing digital products." />
      <div className="container-x pt-10 sm:pt-14">
        <h2 className="text-lg font-semibold">Planned topics</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {plannedTopics.map((t) => (
            <li key={t} className="card p-6">
              <p className="font-semibold leading-snug">{t}</p>
              <p className="mt-3 text-xs text-muted">Coming soon</p>
            </li>
          ))}
        </ul>
      </div>
      <CtaBanner />
    </>
  );
}
