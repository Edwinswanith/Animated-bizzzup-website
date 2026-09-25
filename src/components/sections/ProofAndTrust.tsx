"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useReplay, containerVariants, fadeUpVariants } from "@/lib/animations";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "15", label: "selected builds" },
  { value: "12", label: "delivered or live" },
  { value: "45 days", label: "fixed delivery window" },
];

/* One-line client outcomes — facts sourced from src/data/projects.ts */
const OUTCOMES = [
  "Priya Natural Care: 7 branches on one operations system",
  "Cogniverse: production-ready healthcare voice assistant",
  "Intuitive Neurons: AI note editor from concept to product",
];

export default function ProofAndTrust() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative bg-bg-surface border-y border-border"
      style={{ padding: "clamp(2rem, 3.5vw, 2.75rem) 0" }}
    >
      <motion.div
        key={replayKey}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={prefersReduced ? undefined : containerVariants}
        className="max-w-[1400px] mx-auto px-6 lg:px-10"
      >
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="text-center sm:text-left"
            >
              <p className="font-display font-[800] text-text-primary leading-none mb-1.5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.1rem)" }}>
                {stat.value}
              </p>
              <p className="text-[0.8rem] leading-snug text-text-secondary">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-8 sm:my-10 border-t border-border" />

        {/* Client trust */}
        <motion.p
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="text-center font-mono text-[0.8rem] text-text-muted mb-7 max-w-2xl mx-auto"
        >
          Built with teams across healthcare, SaaS, retail operations, fitness
          technology, and custom ML.
        </motion.p>

        <motion.div
          variants={
            prefersReduced
              ? undefined
              : { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
          }
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {OUTCOMES.map((outcome) => (
            <motion.span
              key={outcome}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="font-display font-[600] text-[0.9rem] text-text-secondary px-5 py-3 rounded-lg border border-border bg-bg-card"
            >
              {outcome}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
