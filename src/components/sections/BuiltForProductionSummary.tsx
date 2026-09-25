"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  scaleLineVariants,
} from "@/lib/animations";

interface Summary {
  label: string;
  description: string;
  icon: React.ReactNode;
}

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const SUMMARY: Summary[] = [
  {
    label: "Secure architecture",
    description: "Authenticated APIs, role-based access control, and containerized services for every system we ship.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Cloud deployment",
    description: "Managed cloud infrastructure with automated build, test, and deploy pipelines, not a laptop demo.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A5 5 0 0 0 6.5 19h11z" />
      </svg>
    ),
  },
  {
    label: "Monitoring & handover",
    description: "Logging, human review checkpoints, and fallback flows so issues get caught, not discovered by the client.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 17l5-5 4 4 8-9" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
];

export default function BuiltForProductionSummary() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative py-12 sm:py-14 lg:py-16 bg-bg-deep" ref={ref}>
      <motion.div
        key={replayKey}
        className="mx-auto max-w-[1400px] px-6 lg:px-10"
        variants={prefersReduced ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <motion.div
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="flex items-center gap-3 mb-6"
          >
            <motion.span
              variants={prefersReduced ? undefined : scaleLineVariants}
              className="block h-px w-[30px] bg-accent-1"
            />
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
              Built for Production
            </span>
          </motion.div>

          <motion.h2
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="font-display font-[800] leading-[1.15] text-text-primary text-balance"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Engineering practices, not a pitch deck
          </motion.h2>
        </div>

        <motion.div
          variants={
            prefersReduced
              ? undefined
              : { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
          }
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
        >
          {SUMMARY.map((item) => (
            <motion.div
              key={item.label}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="clip-corner-card flex flex-col gap-3 p-5 sm:p-6 bg-bg-card border border-border"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-glow text-accent-1">
                {item.icon}
              </span>
              <span className="font-display font-[700] text-[1rem] text-text-primary leading-tight">
                {item.label}
              </span>
              <span className="text-[0.85rem] leading-relaxed text-text-secondary">
                {item.description}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-[0.75rem] text-text-muted max-w-xl">
            We don&apos;t claim certifications we don&apos;t hold: no SOC 2, ISO,
            HIPAA, or uptime guarantees unless a specific engagement has been
            independently audited for them.
          </p>
          <Link
            href="/process#built-for-production"
            className="group shrink-0 inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200"
          >
            See our engineering process
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
