"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  scaleLineVariants,
} from "@/lib/animations";

interface Tier {
  name: string;
  badge?: string;
  price: string;
  approx: string;
  duration: string;
  bullets: string[];
}

const TIERS: Tier[] = [
  {
    name: "Launch Sprint",
    price: "Starting from ₹60k",
    approx: "From ~$900",
    duration: "10 days",
    bullets: [
      "Landing page + waitlist",
      "Analytics wired in",
      "One AI feature demo",
      "Validate before you build",
    ],
  },
  {
    name: "Core MVP",
    badge: "Most Popular",
    price: "Starting from ₹2.5L",
    approx: "From ~$3k",
    duration: "45 days",
    bullets: [
      "Web + mobile apps",
      "Auth, payments, deploy",
      "1 to 2 AI features",
      "Weekly Friday demos",
    ],
  },
  {
    name: "Growth Retainer",
    price: "Starting from ₹30k/month",
    approx: "From ~$450/month",
    duration: "Ongoing",
    bullets: [
      "Iterations and new features",
      "Fixes and monitoring",
      "Priority response",
      "Keep shipping after launch",
    ],
  },
];

export default function EngagementModels() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      ref={ref}
      id="engagement-models"
      className="relative py-10 sm:py-12 lg:py-14 bg-bg-deep"
    >
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
              Engagement Models
            </span>
          </motion.div>

          <motion.h2
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="font-display font-[800] leading-[1.15] text-text-primary"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Three ways to work with us
          </motion.h2>
        </div>

        <motion.div
          variants={
            prefersReduced
              ? undefined
              : { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
          }
          className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="relative"
            >
              {tier.badge && (
                <span className="absolute -top-3 left-7 z-10 rounded-md bg-accent-1 px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-white">
                  {tier.badge}
                </span>
              )}

              <div
                className={`clip-corner-card flex h-full flex-col gap-4 border bg-bg-card p-6 sm:p-7 ${
                  tier.badge ? "border-accent-1/40" : "border-border"
                }`}
              >
                <h3 className="font-display font-[800] text-text-primary text-[1.3rem]">
                  {tier.name}
                </h3>

                <div>
                  <p className="font-display font-[800] text-text-primary" style={{ fontSize: "1.5rem" }}>
                    {tier.price}
                  </p>
                  <p className="text-[0.85rem] text-text-muted">{tier.approx}</p>
                  <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent-1">
                    {tier.duration}
                  </p>
                </div>

                <ul className="flex flex-col gap-2 mt-2">
                  {tier.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[0.9rem] leading-snug text-text-secondary">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-1 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mt-8 text-center font-mono text-[0.85rem] text-text-muted"
        >
          Fixed price. 50% advance to start. Final quote after a 20-minute scoping call.
        </motion.p>
        <motion.p
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mt-2 text-center text-[0.8rem] text-text-muted max-w-lg mx-auto"
        >
          Final quote depends on scope, integrations, AI complexity, and deployment requirements.
        </motion.p>
      </motion.div>
    </section>
  );
}
