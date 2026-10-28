import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import PostBody, { slugify } from "@/components/PostBody";
import { CtaBanner } from "@/components/ui";
import { getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/insights/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ["AXORION"],
      tags: post.keywords,
    },
  };
}

const fmt = (d: string) => new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${site.url}/insights/${post.slug}`;
  const toc = post.blocks.flatMap((b) => (b.type === "h2" ? [{ id: slugify(b.text), text: b.text }] : b.type === "faq" ? [{ id: "faq", text: "Frequently asked questions" }] : []));
  const related = post.related.map((s) => getPost(s)).filter((p): p is NonNullable<typeof p> => !!p);
  const faq = post.blocks.find((b) => b.type === "faq");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: url,
      url,
      keywords: post.keywords.join(", "),
      articleSection: post.category,
      inLanguage: "en-IN",
      author: { "@type": "Organization", name: "AXORION", url: site.url },
      publisher: { "@type": "Organization", name: "AXORION", url: site.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/insights` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    ...(faq && faq.type === "faq"
      ? [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }]
      : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="hero-glow relative overflow-hidden border-b border-line">
          <div className="grid-bg absolute inset-0" aria-hidden />
          <div className="container-x relative max-w-3xl py-12 sm:py-20">
            <nav aria-label="Breadcrumb" className="text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link href="/" className="hover:text-fg">Home</Link></li>
                <li aria-hidden>/</li>
                <li><Link href="/insights" className="hover:text-fg">Blog</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-fg/80">{post.category}</li>
              </ol>
            </nav>
            <p className="eyebrow mt-6">{post.category}</p>
            <h1 className="mt-3 text-[1.9rem] font-bold leading-[1.15] tracking-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>By AXORION</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{fmt(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1"><Icon name="clock" size={14} /> {post.readMinutes} min read</span>
            </p>
          </div>
        </header>

        <div className="container-x max-w-3xl pt-10 sm:pt-14">
          {toc.length > 2 && (
            <nav aria-label="Table of contents" className="card mb-8 p-5">
              <p className="text-sm font-semibold">In this article</p>
              <ol className="mt-3 space-y-1.5 text-sm">
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} className="text-muted hover:text-accent2">{t.text}</a></li>
                ))}
              </ol>
            </nav>
          )}

          <PostBody blocks={post.blocks} />

          <aside className="card hero-glow mt-12 p-6 text-center sm:p-8">
            <h2 className="text-xl font-bold sm:text-2xl">Want to automate a process in your business?</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">Tell us what takes the most time, and we will suggest where automation or an AI agent can help.</p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn btn-primary">Get a Quote <Icon name="arrow" size={18} /></Link>
              <Link href="/#ai-agents" className="btn btn-ghost">Try an AI Agent demo</Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-x section" aria-label="Related articles">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Keep reading</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="card group p-6">
                <p className="eyebrow">{r.category}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug">{r.title}</h3>
                <p className="mt-2 text-sm text-muted">{r.excerpt}</p>
                <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent2">
                  Read article <Icon name="arrow" size={16} className="transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  );
}
