import type { Metadata } from "next";
import { Icon, industryIcons } from "@/components/icons";
import { CtaBanner, PageHero } from "@/components/ui";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description: "Digital solutions for retail, logistics, real estate, manufacturing and healthcare.",
  alternates: { canonical: "/industries" },
};

export default function Industries() {
  return (
    <>
      <PageHero eyebrow="Industries We Serve" title={<>Solving real challenges <span className="gradient-text">across industries.</span></>} text="We build technology around the way your business operates." />
      <div className="container-x grid gap-4 pt-10 sm:gap-5 sm:pt-14 sm:grid-cols-2">
        {industries.map((i, n) => (
          <article key={i.title} className="card card-hover p-6 sm:p-7">
            <span className="icon-box"><Icon name={industryIcons[n]} /></span>
            <h2 className="mt-4 text-xl font-semibold">{i.title}</h2>
            <p className="mt-2 text-muted">{i.text}</p>
          </article>
        ))}
      </div>
      <CtaBanner />
    </>
  );
}
