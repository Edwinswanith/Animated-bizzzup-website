import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES: {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "weekly", priority: 0.9 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/process", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/content-rights", changeFrequency: "yearly", priority: 0.4 },
];

/** Build-time guard: every project must contribute exactly one sitemap URL. */
function assertUniqueSlugs(projects: typeof PROJECTS) {
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) {
      throw new Error(
        `sitemap.ts: duplicate project slug "${project.slug}" would produce duplicate sitemap URLs`
      );
    }
    seen.add(project.slug);
  }
}

/** Build-time guard: every service must contribute exactly one sitemap URL. */
function assertUniqueServiceSlugs(services: typeof SERVICES) {
  const seen = new Set<string>();
  for (const service of services) {
    if (seen.has(service.slug)) {
      throw new Error(
        `sitemap.ts: duplicate service slug "${service.slug}" would produce duplicate sitemap URLs`
      );
    }
    seen.add(service.slug);
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  assertUniqueSlugs(PROJECTS);
  assertUniqueServiceSlugs(SERVICES);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: route.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries, ...serviceEntries];
}
