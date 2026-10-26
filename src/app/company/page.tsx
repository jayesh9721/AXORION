import type { Metadata } from "next";
import { CtaBanner, PageHero } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "AXORION is an independent digital growth and technology partner based in Palamaner, Andhra Pradesh, India.",
  alternates: { canonical: "/company" },
};

const values = [
  ["Practical first", "We focus on solutions that solve a real business problem, not technology for its own sake."],
  ["Speed and quality", "Fast websites, clean code and honest timelines."],
  ["Clear communication", "You know what is being built and why. NDAs are available on request."],
];

export default function Company() {
  const a = site.address;
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>An independent <span className="gradient-text">digital growth and technology partner.</span></>}
        text="AXORION is an emerging technology company building web, software, AI and automation solutions for businesses."
      />
      <div className="container-x pt-10 sm:pt-14">
        <p className="max-w-3xl text-lg text-muted">
          We are new, and we focus on practical digital solutions: websites that load fast and get found, software that fits how a business works, and AI agents and automation that remove repetitive work. Instead of long claims, we show what we can build through live demonstrations.
        </p>
      </div>
      <div className="container-x grid gap-4 pt-8 sm:grid-cols-3 sm:gap-5">
        {values.map(([t, d]) => (
          <article key={t} className="card card-hover p-6">
            <h2 className="font-semibold">{t}</h2>
            <p className="mt-2 text-sm text-muted">{d}</p>
          </article>
        ))}
      </div>
      <div className="container-x pt-8">
        <div className="card p-6 text-sm text-muted">
          <h2 className="text-base font-semibold text-fg">Where we work from</h2>
          <p className="mt-2">{a.street}, {a.district}, {a.region}, {a.country} – {a.postalCode}</p>
        </div>
      </div>
      <CtaBanner />
    </>
  );
}
