import Link from "next/link";
import type { ReactNode } from "react";
import { projects } from "@/lib/site";
import { Icon } from "./icons";

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-line">
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div className="container-x relative py-14 sm:py-24">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="fade-up mt-3 max-w-3xl text-[2rem] font-bold leading-[1.15] tracking-tight sm:text-5xl">{title}</h1>
        <p className="fade-up mt-5 max-w-2xl text-base text-muted sm:text-lg">{text}</p>
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, children, id }: { eyebrow?: string; title: ReactNode; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="container-x section">
      <div className="reveal">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      </div>
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  );
}

export function ProjectCard({ p }: { p: (typeof projects)[number] }) {
  return (
    <article className="card card-hover flex flex-col p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-accent/50 bg-accent/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent2">{p.label}</span>
        <span className="text-xs text-muted">{p.category}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{p.text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
    </article>
  );
}

export function CtaBanner() {
  return (
    <section className="container-x section">
      <div className="hero-glow relative overflow-hidden rounded-3xl border border-line bg-surface p-7 text-center sm:p-14">
        <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight sm:text-4xl">Let&apos;s build what&apos;s next.</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">Tell us what you want to build. We&apos;ll get back to you soon, and an NDA is available on request.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-primary">Book a Discovery Call <Icon name="arrow" size={18} /></Link>
            <Link href="/services" className="btn btn-ghost">Explore Services</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
