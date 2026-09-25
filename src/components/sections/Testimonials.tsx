"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  fadeUpBlurVariants,
  scaleLineVariants,
} from "@/lib/animations";

/* ── Data ── */

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  accent: string;
  /** What was delivered, shown as lightweight context under the quote. */
  project: string;
  /** Link to the matching /work/[slug] case study, if one exists in the portfolio. */
  caseStudySlug?: string;
}

const TESTIMONIALS: Testimonial[] = [
  // TODO: add photo + LinkedIn URL
  {
    quote:
      "Bizzzup took our AI note editor from concept to a working product, with visible progress every single week. They build fast, and they build properly.",
    name: "Conroy Brown",
    role: "Intuitive Neurons",
    company: "",
    accent: "var(--color-accent-1)",
    project: "AI Note Editor, SaaS MVP",
  },
  // TODO: add photo + LinkedIn URL
  {
    quote:
      "They delivered our healthcare voice assistant production-ready, including consultations, scheduling, and prescriptions. It works, and it shipped on time.",
    name: "Rahul",
    role: "CEO",
    company: "Cogniverse",
    accent: "var(--color-accent-2)",
    project: "Healthcare voice assistant",
    caseStudySlug: "doctor-ai",
  },
];

/* ── Card ── */

function TestimonialCard({
  t,
  prefersReduced,
}: {
  t: Testimonial;
  prefersReduced: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.blockquote
      variants={prefersReduced ? undefined : fadeUpBlurVariants}
      className="clip-corner-card relative flex flex-col justify-between p-7 sm:p-9 bg-bg-card border border-border"
      whileHover={
        prefersReduced
          ? undefined
          : {
              y: -6,
              borderColor: "var(--color-border-hover)",
              boxShadow: "0 12px 40px var(--color-accent-glow)",
            }
      }
      transition={
        prefersReduced
          ? undefined
          : { type: "spring", stiffness: 300, damping: 20 }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Accent bar with animated height */}
      <motion.span
        className="absolute left-0 top-6 w-[3px] rounded-r-full"
        style={{ background: t.accent, opacity: 0.5 }}
        animate={{ height: hovered && !prefersReduced ? 60 : 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-hidden="true"
      />

      {/* Decorative quote mark */}
      <span
        className="absolute top-3 right-5 font-display text-[5rem] leading-none text-text-primary opacity-[0.06] pointer-events-none select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      {/* Quote */}
      <p className="mb-8 text-[1.05rem] leading-[1.8] text-text-secondary">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Attribution */}
      <footer className="mt-auto flex items-center gap-3">
        <div
          className="shrink-0 rounded-full border p-0.5"
          style={{ width: 41, height: 41, borderColor: t.accent }}
        >
          <span
            className="flex h-full w-full items-center justify-center rounded-full text-xs font-bold bg-bg-card font-display"
            style={{ color: t.accent }}
            aria-hidden="true"
          >
            {t.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-display text-[0.95rem] font-bold leading-tight text-text-primary">
            {t.name}
          </p>
          <p className="font-mono text-[0.78rem] text-text-muted tracking-[0.04em]">
            {t.company ? `${t.role}, ${t.company}` : t.role}
          </p>
        </div>
      </footer>

      {/* Project context */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-2 flex-wrap">
        <span className="font-mono text-[0.72rem] text-text-muted">
          Project: {t.project}
        </span>
        {t.caseStudySlug && (
          <Link
            href={`/work/${t.caseStudySlug}`}
            className="font-mono text-[0.72rem] text-accent-1 hover:text-accent-2 transition-colors duration-200 whitespace-nowrap"
          >
            View case study →
          </Link>
        )}
      </div>
    </motion.blockquote>
  );
}

/* ── Section ── */

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative py-10 sm:py-12 lg:py-14 bg-bg-surface"
    >
      <motion.div
        key={replayKey}
        className="mx-auto max-w-[1400px] px-6 lg:px-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section heading */}
        <motion.div
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mb-8 sm:mb-10 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
              Testimonials
            </span>
          </div>

          <h2
            className="font-display font-[800] leading-[1.15] text-text-primary"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            What clients say
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={
            prefersReduced
              ? undefined
              : {
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
                  },
                }
          }
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-4xl mx-auto"
        >
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              t={t}
              prefersReduced={prefersReduced}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
