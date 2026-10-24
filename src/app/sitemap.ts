import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = ["", "/services", "/industries", "/work", "/partner", "/insights", "/company", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
