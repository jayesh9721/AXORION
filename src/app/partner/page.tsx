import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "White-Label Partner",
  description: "White-label development support for agencies, delivered under your brand.",
  alternates: { canonical: "/partner" },
};

const perks = [
  ["White-label development support", "We build under your brand so you can focus on winning and managing your clients."],
  ["Confidentiality by agreement", "An NDA is available on request before any project details are shared."],
  ["Dedicated development teams", "Available based on project requirements, from a single developer to a small team."],
  ["Flexible engagement", "Project-based or ongoing capacity. We agree scope, communication and delivery up front."],
];

export default function Partner() {
  return (
    <>
      <PageHero eyebrow="White-Label Partner" title={<>Behind your brand. <span className="gradient-text">You win clients, we deliver the work.</span></>} text="White-label development support under your brand, for agencies that want to take on more work." />
      <div className="container-x grid gap-4 pt-10 sm:gap-5 sm:pt-14 sm:grid-cols-2">
        {perks.map(([t, d]) => (
          <article key={t} className="card card-hover p-6 sm:p-7">
            <h2 className="text-lg font-semibold">{t}</h2>
            <p className="mt-2 text-muted">{d}</p>
          </article>
        ))}
      </div>
      <div className="container-x pt-10">
        <Link href="/contact" className="btn btn-primary">Discuss a partnership</Link>
      </div>
      <CtaBanner />
    </>
  );
}
