import type { Metadata } from "next";
import ContactWizard from "@/components/ContactWizard";
import { PageHero } from "@/components/ui";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get a quote or book a discovery call with AXORION.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title={<>Tell us about <span className="gradient-text">your project.</span></>} text="Three quick steps. Tell us what you want to build and we will get back to you soon." />
      <div className="container-x grid gap-8 pt-14 lg:grid-cols-[1.4fr_1fr]">
        <ContactWizard />
        <aside className="space-y-4 text-sm text-muted">
          <div className="card p-6">
            <h2 className="font-semibold text-fg">Prefer to talk?</h2>
            <p className="mt-2"><a className="text-accent2 hover:underline" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p>
            {site.emails.map((e) => <p key={e}><a className="hover:text-fg" href={`mailto:${e}`}>{e}</a></p>)}
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-fg">Your idea stays private</h2>
            <p className="mt-2">An NDA is available on request.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
