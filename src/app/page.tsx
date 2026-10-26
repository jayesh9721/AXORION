import Link from "next/link";
import AgentDemos from "@/components/AgentDemos";
import HeroVisual from "@/components/HeroVisual";
import { Icon, industryIcons } from "@/components/icons";
import TechTabs from "@/components/TechTabs";
import { CtaBanner, ProjectCard, Section } from "@/components/ui";
import { capabilities, industries, projects, services, stack } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero-glow relative overflow-hidden border-b border-line">
        <div className="grid-bg absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-center gap-6 py-12 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          <div>
            <p className="eyebrow fade-up">Web · AI · Automation · Digital Growth</p>
            <h1 className="fade-up mt-4 text-[2.15rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Building Scalable Websites, Software &amp; Digital Solutions for{" "}
              <span className="gradient-text">Ambitious Businesses.</span>
            </h1>
            <p className="fade-up mt-5 max-w-xl text-base text-muted sm:text-lg">
              From high-performing web platforms and mobile apps to AI automation and performance marketing, AXORION engineers digital products that scale.
            </p>
            <div className="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">Get a Quote <Icon name="arrow" size={18} /></Link>
              <Link href="/#ai-agents" className="btn btn-ghost">Try an AI Agent</Link>
            </div>
            <ul className="fade-up mt-8 flex flex-wrap gap-2" aria-label="Capabilities">
              {capabilities.map((c) => (
                <li key={c.label} className="chip gap-2 !rounded-full !px-3 !py-1.5 text-xs">
                  <Icon name={c.icon} size={14} className="text-accent2" /> {c.label}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Section id="ai-agents" eyebrow="AI Agents" title="Explore AXORION AI Agents.">
        <p className="-mt-4 mb-8 max-w-2xl text-muted">
          Here is what we can build. Click through realistic conversations for four business use cases. These are illustrative demos, not live customer deployments.
        </p>
        <AgentDemos />
      </Section>

      <Section eyebrow="Projects & Demonstrations" title="Explore AXORION projects, prototypes and AI demonstrations built to solve real business problems.">
        <div className="scroll-x">
          {projects.slice(0, 6).map((p) => <ProjectCard key={p.title} p={p} />)}
        </div>
        <p className="mt-2 text-xs text-muted">Demonstrations and concepts. Not client projects.</p>
        <Link href="/work" className="mt-1 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent2 hover:underline">
          View all projects <Icon name="arrow" size={16} />
        </Link>
      </Section>

      <Section eyebrow="Our Services" title="Everything you need to build, launch & scale.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.slug} href={`/services#${s.slug}`} className="card reveal group p-6">
              <span className="icon-box"><Icon name={s.slug} /></span>
              <h3 className="mt-4 font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.short}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent2">
                Learn more <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Industries" title="Digital solutions for modern industries.">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {industries.map((i, n) => (
            <div key={i.title} className={`card card-hover reveal p-4 sm:p-5 ${n === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
              <span className="icon-box !h-10 !w-10"><Icon name={industryIcons[n]} size={20} /></span>
              <h3 className="mt-3 text-sm font-semibold">{i.title}</h3>
              <p className="mt-1.5 text-xs text-muted">{i.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Core Solutions" title="What we build, and how.">
        <TechTabs />
      </Section>

      <section className="container-x section">
        <div className="card hero-glow reveal relative grid gap-8 overflow-hidden p-6 sm:p-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">White-Label Partner</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">Behind Your Brand. You Win Clients, We Deliver the Work.</h2>
            <Link href="/partner" className="btn btn-primary mt-6 w-full sm:w-auto">Partner With Us <Icon name="arrow" size={18} /></Link>
          </div>
          <ul className="space-y-4 self-center text-sm">
            {[
              ["users", "White-label development support", "Delivered under your brand."],
              ["lock", "Confidentiality by agreement", "NDA available on request."],
              ["shield", "Dedicated development teams", "Available based on project requirements."],
            ].map(([i, t, d]) => (
              <li key={t} className="flex items-start gap-3">
                <span className="icon-box !h-10 !w-10 shrink-0"><Icon name={i} size={18} /></span>
                <span className="text-muted"><b className="block text-fg">{t}</b>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Section eyebrow="Technology" title="The tools we build with.">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {stack.map((g) => (
            <div key={g.group} className="card reveal p-5">
              <h3 className="text-sm font-semibold">{g.group}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
