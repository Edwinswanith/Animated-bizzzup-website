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

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Scope",
    description:
      "20-minute call, then a 2-page proposal. Fixed scope, fixed price, and 50% advance to begin.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Demo every Friday. The client watches the product take shape week by week. No black box.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Live in 45 days: deployed, tested, documented, and handed over properly.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Monthly retainer for iterations, fixes, monitoring, and new features after launch.",
  },
];

export default function FlagshipProcess() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} id="how-we-work" className="relative py-12 sm:py-14 lg:py-16 bg-bg-surface">
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
              How We Work
            </span>
          </motion.div>

          <motion.h2
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="font-display font-[800] leading-[1.15] text-text-primary mb-5 text-balance"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Your AI-ready MVP, live in 45 days
          </motion.h2>

          <motion.p
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="text-[1.1rem] leading-[1.75] text-text-secondary max-w-[540px]"
          >
            Web, mobile, and AI features built around one clear business
            workflow. Fixed scope, fixed price, weekly demos, and production
            handover.
          </motion.p>
        </div>

        <motion.div
          variants={
            prefersReduced
              ? undefined
              : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
          }
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="clip-corner-card flex flex-col gap-3 p-5 sm:p-6 bg-bg-card border border-border"
            >
              <span className="font-mono text-[0.75rem] font-semibold text-accent-1/60 tracking-widest">
                {step.number}
              </span>
              <h3 className="font-display font-[700] text-text-primary text-[1.2rem]">
                {step.title}
              </h3>
              <p className="text-[0.92rem] leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mt-8 flex flex-col items-center gap-3 text-center"
        >
          <p className="font-mono text-[0.85rem] text-text-muted">
            No hourly billing. No open-ended scope. No disappearing for a month.
          </p>
          <Link
            href="/process"
            className="group inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200"
          >
            See our engagement models
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
