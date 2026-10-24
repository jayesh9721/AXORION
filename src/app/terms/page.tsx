import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" text="Draft template: have it reviewed by a legal professional before launch." />
      <div className="container-x max-w-3xl space-y-4 pt-12 text-muted">
        <p>The content on this website is provided for general information about AXORION services and does not constitute a binding offer.</p>
        <p>Project work is governed by a separate written agreement between AXORION and the client.</p>
      </div>
    </>
  );
}
