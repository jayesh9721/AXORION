import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" text="Draft template: have it reviewed by a legal professional before launch." />
      <div className="container-x max-w-3xl space-y-4 pt-12 text-muted">
        <p>AXORION collects the details you submit through our contact form (name, email, company, project information) solely to respond to your enquiry.</p>
        <p>We do not sell your data. With your consent, we may use Google Analytics and Meta Pixel to understand site usage and measure advertising. They only load after you click Accept in the cookie banner, and you can change your choice at any time using Cookie settings in the footer.</p>
        <p>The AI agent demos on this site are simulated conversations. They do not call an AI model and do not store what you click.</p>
        <p>To request access to or deletion of your data, email contact@axorion.com.</p>
      </div>
    </>
  );
}
