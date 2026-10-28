import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

const routes = ["", "/services", "/industries", "/work", "/partner", "/insights", "/company", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.7 }));
  const articles = posts.map((p) => ({ url: `${site.url}/insights/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.8 }));
  return [...pages, ...articles];
}
