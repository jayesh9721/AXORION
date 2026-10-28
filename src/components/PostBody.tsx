import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/posts";
import { Icon } from "./icons";

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Renders **bold** and [text](url) inside a string. Internal links use next/link. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("http") ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-accent2 underline underline-offset-4">{label}</a>
          ) : (
            <Link key={i} href={href} className="font-medium text-accent2 underline underline-offset-4">{label}</Link>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold text-fg">{bold[1]}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const body = "text-base leading-8 text-fg/90 sm:text-[1.0625rem]";

export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} id={slugify(b.text)} className="scroll-mt-24 pt-6 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="pt-2 text-lg font-semibold sm:text-xl">{b.text}</h3>;
          case "p":
            return <p key={i} className={body}><Inline text={b.text} /></p>;
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((t) => (
                  <li key={t} className={`${body} flex gap-3`}>
                    <Icon name="check" size={18} className="mt-1.5 shrink-0 text-accent2" />
                    <span><Inline text={t} /></span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5">
                {b.items.map((t, n) => (
                  <li key={t} className={`${body} flex gap-3`}>
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent2">{n + 1}</span>
                    <span><Inline text={t} /></span>
                  </li>
                ))}
              </ol>
            );
          case "takeaways":
            return (
              <aside key={i} className="card !border-accent/40 p-5 sm:p-6" aria-label="Key takeaways">
                <p className="eyebrow">Key takeaways</p>
                <ul className="mt-3 space-y-2">
                  {b.items.map((t) => (
                    <li key={t} className="flex gap-3 text-[15px] leading-7">
                      <Icon name="bolt" size={16} className="mt-1.5 shrink-0 text-accent2" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            );
          case "flow":
            return (
              <div key={i} className={`card p-5 ${b.highlight ? "!border-accent/50" : ""}`}>
                <p className={`text-sm font-semibold ${b.highlight ? "text-accent2" : "text-muted"}`}>{b.label}</p>
                <ol className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  {b.steps.map((s, n) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="rounded-lg border border-line bg-surface2 px-3 py-2">{s}</span>
                      {n < b.steps.length - 1 && <Icon name="arrow" size={16} className="hidden text-muted sm:block" />}
                    </li>
                  ))}
                </ol>
              </div>
            );
          case "faq":
            return (
              <section key={i} aria-label="Frequently asked questions" className="pt-6">
                <h2 id="faq" className="scroll-mt-24 text-2xl font-bold tracking-tight sm:text-3xl">Frequently asked questions</h2>
                <div className="mt-5 space-y-3">
                  {b.items.map((f) => (
                    <details key={f.q} className="card group p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                        {f.q}
                        <Icon name="arrow" size={18} className="shrink-0 rotate-90 text-accent2 transition-transform group-open:-rotate-90" />
                      </summary>
                      <p className={`${body} mt-3`}>{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            );
        }
      })}
    </div>
  );
}
