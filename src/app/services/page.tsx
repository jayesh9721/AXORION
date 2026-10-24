import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { CtaBanner, PageHero } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Web, mobile, e-commerce, AI automation, UI/UX and digital growth services from AXORION.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Our Services" title={<>End-to-end digital solutions for <span className="gradient-text">modern businesses.</span></>} text="Six focused capabilities, delivered by one accountable team." />
      <div className="container-x grid gap-4 pt-10 sm:gap-5 sm:pt-14 lg:grid-cols-2">
        {services.map((s) => (
          <section key={s.slug} id={s.slug} className="card card-hover scroll-mt-24 p-6 sm:p-7">
            <span className="icon-box"><Icon name={s.slug} /></span>
            <h2 className="mt-4 text-xl font-semibold leading-snug">{s.title}</h2>
            <p className="mt-2 text-muted">{s.short}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2"><Icon name="check" size={16} className="shrink-0 text-accent2" /> {p}</li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              {s.stack.map((t) => <span key={t} className="chip font-mono">{t}</span>)}
            </div>
            <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent2 hover:underline">
              Discuss this service <Icon name="arrow" size={16} />
            </Link>
          </section>
        ))}
      </div>
      <CtaBanner />
    </>
  );
}
