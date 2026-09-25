"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PROJECTS, getProjectBySlug, type ProjectDetails } from "@/data/projects";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { fadeUpVariants } from "@/lib/animations";

const FEATURED_WORK_SLUGS = ["health-dashboard", "saloon", "doctor-ai"];

interface FilterDef {
  label: string;
  test: (p: ProjectDetails) => boolean;
}

const FILTERS: FilterDef[] = [
  { label: "All", test: () => true },
  { label: "Featured", test: (p) => p.featuredOnHome },
  { label: "Production", test: (p) => p.status === "Production" || p.status === "Launched" },
  { label: "MVP", test: (p) => p.status.includes("MVP") },
  { label: "In Progress", test: (p) => p.status === "In Progress" },
  { label: "AI Media", test: (p) => p.filterCategory === "AI Media" },
  { label: "Healthcare", test: (p) => p.filterCategory === "Healthcare" },
  { label: "Marketplace", test: (p) => p.filterCategory === "Marketplace" },
  { label: "Operations", test: (p) => p.filterCategory === "Operations" },
  { label: "Legal AI", test: (p) => p.filterCategory === "Legal AI" },
  { label: "Fintech", test: (p) => p.filterCategory === "Fintech" },
  { label: "HealthTech", test: (p) => p.filterCategory === "HealthTech" },
];

const FILTER_LABELS = FILTERS.map((f) => f.label);

const FEATURED_WORK = FEATURED_WORK_SLUGS.map(getProjectBySlug).filter(
  (p): p is ProjectDetails => Boolean(p)
);

// SSR-safe read of the initial ?category= deep link, mirroring the pattern in
// src/hooks/useIsMobile.ts: server snapshot is always null (matches the
// "All" default so hydration never mismatches), the real value applies only
// after mount. Deliberately avoids useSearchParams()/<Suspense>, which
// previously forced Next to bake an empty fallback into the prerendered
// /work page instead of the real project list.
function subscribe() {
  return () => {};
}
function getUrlCategory(): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get("category");
  return fromUrl && FILTER_LABELS.includes(fromUrl) ? fromUrl : null;
}
function getServerCategory(): string | null {
  return null;
}

export default function WorkExplorer() {
  const router = useRouter();
  const urlFilter = useSyncExternalStore(subscribe, getUrlCategory, getServerCategory);
  const [manualFilter, setManualFilter] = useState<string | null>(null);
  const active = manualFilter ?? urlFilter ?? "All";

  function selectFilter(label: string) {
    setManualFilter(label);
    const params = new URLSearchParams(window.location.search);
    if (label === "All") {
      params.delete("category");
    } else {
      params.set("category", label);
    }
    const query = params.toString();
    router.replace(query ? `/work?${query}` : "/work", { scroll: false });
  }

  const activeFilter = FILTERS.find((f) => f.label === active) ?? FILTERS[0];

  const filtered = useMemo(
    // Featured Work strip above always shows these 3 regardless of filter —
    // exclude them here so no project appears twice on the page.
    () => PROJECTS.filter(activeFilter.test).filter((p) => !FEATURED_WORK_SLUGS.includes(p.slug)),
    [activeFilter]
  );

  return (
    <div>
      {/* Featured Work */}
      <div className="mb-10 sm:mb-12">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-accent-1 font-medium block mb-4">
          Featured Work
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FEATURED_WORK.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="clip-corner-card group flex flex-col overflow-hidden bg-bg-card border border-accent-1/30 hover:border-accent-1/60 transition-colors duration-200"
            >
              <div className="relative h-[160px] bg-bg-surface">
                <ProjectMedia
                  src={project.image}
                  alt={`${project.name}: ${project.imageLabel}`}
                  label={project.imageLabel}
                  category={project.category}
                  previewLabel={project.previewLabel}
                  sizes="(max-width: 768px) 90vw, 400px"
                />
              </div>
              <div className="p-5">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-accent-1 font-medium">
                    {project.filterCategory}
                  </span>
                  <span className="shrink-0 rounded-md border border-accent-1/30 bg-accent-glow px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-accent-1">
                    {project.caseStudyTier}
                  </span>
                </div>
                <h3 className="font-display font-[800] text-text-primary text-[1.1rem] leading-tight mb-1">
                  {project.name}
                </h3>
                <p className="text-[0.82rem] text-text-secondary line-clamp-2">
                  {project.context}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Case-study depth note */}
      <p className="mb-6 max-w-2xl text-[0.85rem] leading-relaxed text-text-muted">
        Some projects include full case-study depth. Others are selected
        build snapshots. We show both to represent the breadth of systems
        we have built.
      </p>

      {/* Filter bar */}
      <div className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {FILTERS.map(({ label }) => (
          <button
            key={label}
            onClick={() => selectFilter(label)}
            aria-pressed={active === label}
            className={`shrink-0 rounded-md border px-3.5 py-1.5 font-mono text-[0.78rem] font-medium tracking-wide transition-colors duration-200 ${
              active === label
                ? "!bg-accent-1 border-accent-1 !text-white"
                : "!bg-bg-surface border-border text-text-secondary hover:border-border-hover"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filtered.map((project) => (
          <motion.article
            key={project.slug}
            variants={fadeUpVariants}
            className="clip-corner-card flex flex-col overflow-hidden bg-bg-card border border-border"
          >
            <div className="relative h-[180px] bg-bg-surface">
              <ProjectMedia
                src={project.image}
                alt={`${project.name}: ${project.imageLabel}`}
                label={project.imageLabel}
                category={project.filterCategory}
                previewLabel={project.previewLabel}
                sizes="(max-width: 768px) 90vw, 400px"
              />
              <span className="absolute top-2.5 left-2.5 rounded-md bg-bg-deep/70 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-white backdrop-blur-sm">
                {project.number}
              </span>
              <span className="absolute top-2.5 right-2.5 rounded-md border border-border bg-bg-card/85 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-text-primary backdrop-blur-sm">
                {project.status}
              </span>
            </div>

            <div className="flex-1 flex flex-col p-5">
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent-1 font-medium">
                  {project.filterCategory}
                </span>
                <span
                  className={`shrink-0 rounded-md border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] ${
                    project.caseStudyTier === "Full Case Study"
                      ? "text-accent-1 border-accent-1/30 bg-accent-glow"
                      : "text-text-muted border-border"
                  }`}
                >
                  {project.caseStudyTier}
                </span>
              </div>
              <h3 className="font-display font-[800] text-text-primary text-[1.15rem] leading-tight mb-0.5">
                {project.name}
              </h3>
              {project.akaName && (
                <p className="text-text-muted text-[0.75rem] mb-2">formerly {project.akaName}</p>
              )}

              <p className="text-[0.85rem] leading-relaxed text-text-secondary line-clamp-3 mb-3">
                {project.context}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-bg-surface px-2 py-0.5 font-mono text-[0.6rem] font-medium tracking-wide text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/work/${project.slug}`}
                className="group mt-auto self-start inline-flex items-center gap-1.5 font-display text-[0.85rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200"
              >
                View details
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
