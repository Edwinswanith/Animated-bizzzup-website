import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PROJECTS } from "@/content/projects";
import { SERVICES } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${SITE.url}${p}`;
  return [
    ...["/", "/work", "/services", "/process", "/about", "/privacy-policy", "/content-rights"].map((p) => ({ url: u(p) })),
    ...SERVICES.map((s) => ({ url: u(`/services/${s.slug}`) })),
    ...PROJECTS.map((p) => ({ url: u(`/work/${p.slug}`) })),
  ];
}
