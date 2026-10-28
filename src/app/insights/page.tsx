import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBanner, PageHero } from "@/components/ui";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "AI Automation, AI Agents & WhatsApp Blog",
  description:
    "Practical guides from AXORION on AI business automation, AI agents for customer support and lead qualification, and WhatsApp automation for businesses.",
  alternates: { canonical: "/insights" },
};

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default function Insights() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Guides on AI automation, AI agents &amp; <span className="gradient-text">WhatsApp for business.</span></>}
        text="Practical, plain-language articles on using automation and AI to reduce repetitive work and respond to customers faster."
      />
      <div className="container-x pt-10 sm:pt-14">
        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="card card-hover group relative flex flex-col p-6">
              <p className="eyebrow">{p.category}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug">
                <Link href={`/insights/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{p.excerpt}</p>
              <p className="mt-5 flex items-center gap-3 text-xs text-muted">
                <time dateTime={p.date}>{fmt(p.date)}</time>
                <span aria-hidden>·</span>
                <span>{p.readMinutes} min read</span>
              </p>
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent2">
                Read article <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
              </p>
            </article>
          ))}
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
