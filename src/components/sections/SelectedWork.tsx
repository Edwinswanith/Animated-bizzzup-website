"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FEATURED_PROJECTS, PROJECTS, type ProjectDetails } from "@/data/projects";
import { useReplay, containerVariants, fadeUpBlurVariants, fadeUpVariants } from "@/lib/animations";

/* Status wording comes straight from src/data/projects.ts; only the dot colour is derived. */
function statusTone(status: ProjectDetails["status"]) {
  if (status === "Production" || status === "Launched" || status === "Production-ready MVP") return "bg-accent-2";
  if (status === "In Progress") return "bg-text-muted";
  return "bg-accent-1-text";
}

function WorkCard({ p, priority }: { p: ProjectDetails; priority: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-card transition-colors duration-300 hover:border-border-accent"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-bg-surface">
        <Image
          src={p.image}
          alt={`${p.name}: ${p.imageLabel} screen`}
          fill
          sizes="(min-width: 1024px) 640px, 100vw"
          priority={priority}
          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-muted">
            {p.number} · {p.category}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[0.75rem] font-medium text-text-secondary">
            <span className={`h-1.5 w-1.5 rounded-full ${statusTone(p.status)}`} aria-hidden="true" />
            {p.status}
          </span>
        </div>
        <h3 className="font-display text-[1.35rem] font-bold leading-tight text-text-primary">
          {p.name}
          <span className="mt-1 block text-[0.95rem] font-medium text-text-secondary">{p.tagline}</span>
        </h3>
        <p className="max-w-[60ch] text-[0.95rem] leading-relaxed text-text-secondary">{p.context}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display font-semibold text-text-primary transition-colors group-hover:text-accent-1">
          Read the case study
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/** `exclude`: projects already shown in the Connected Build scene above, so nothing repeats. */
export default function SelectedWork({ exclude = [] }: { exclude?: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} id="work" aria-labelledby="work-title" className="relative bg-bg-deep" style={{ padding: "clamp(4rem, 7vw, 6.5rem) 0" }}>
      <motion.div
        key={replayKey}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReduced ? undefined : containerVariants}
        className="mx-auto max-w-[1400px] px-6 lg:px-10"
      >
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={prefersReduced ? undefined : fadeUpVariants} className="max-w-2xl">
            <p className="mb-3 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-accent-1">Selected work</p>
            <h2 id="work-title" className="font-display font-[800] leading-[1.15] text-text-primary" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
              {exclude.length ? "More real products." : "Real products. Real screens."}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-text-secondary">
              Every screen below is from the actual product. Each card shows where the project stands today and links to the full case study.
            </p>
          </motion.div>
          <motion.div variants={prefersReduced ? undefined : fadeUpVariants}>
            <Link href="/work" className="group inline-flex items-center gap-2 font-display font-semibold text-text-primary hover:text-accent-2">
              View all {PROJECTS.length} projects
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {FEATURED_PROJECTS.filter((p) => !exclude.includes(p.slug)).map((p, i) => (
            <motion.li key={p.slug} variants={prefersReduced ? undefined : fadeUpBlurVariants}>
              <WorkCard p={p} priority={i < 2} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
