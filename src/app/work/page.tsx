import type { Metadata } from "next";
import ProjectsExplorer from "@/components/ProjectsExplorer";
import { CtaBanner, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Projects, Prototypes & AI Demonstrations",
  description: "Explore AXORION projects, prototypes and AI demonstrations built to solve real business problems.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  return (
    <>
      <PageHero
        eyebrow="Projects & Demonstrations"
        title={<>Projects, prototypes &amp; <span className="gradient-text">AI demonstrations.</span></>}
        text="Explore AXORION projects, prototypes and AI demonstrations built to solve real business problems."
      />
      <div className="container-x pt-10 sm:pt-14">
        <p className="mb-6 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
          Everything on this page is an AXORION demo, concept or illustrative use case. None of it is a client project. Client case studies will be added here as projects are delivered.
        </p>
        <ProjectsExplorer />
      </div>
      <CtaBanner />
    </>
  );
}
