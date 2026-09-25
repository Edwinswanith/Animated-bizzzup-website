"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  useReplay,
  containerVariants,
  fadeUpVariants,
  scaleLineVariants,
} from "@/lib/animations";

interface Practice {
  label: string;
  description: string;
  icon: React.ReactNode;
}

const ICON_PROPS = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PRACTICES: Practice[] = [
  {
    label: "Secure API Architecture",
    description: "Authenticated, rate-limited API layers separating client, business logic, and data tiers.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Role-Based Access Control",
    description: "Scoped permissions per role (owner, manager, staff, patient, doctor), enforced server-side, not just in the UI.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: "Dockerized Services",
    description: "Every system ships as containerized, multi-stage builds for consistent local, staging, and production environments.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Cloud Deployment",
    description: "Deployed on managed cloud infrastructure (Cloud Run, containerized hosts), not a laptop demo, not a local script.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.4-1.5A5 5 0 0 0 6.5 19h11z" />
      </svg>
    ),
  },
  {
    label: "CI/CD Pipelines",
    description: "Build, test, and deploy steps automated so releases are repeatable, not manual and error-prone.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="6" cy="6" r="2.5" />
        <circle cx="6" cy="18" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
        <path d="M6 8.5V15.5M8.3 7l7.4 3.7M8.3 17l7.4-3.7" />
      </svg>
    ),
  },
  {
    label: "Monitoring & Logging",
    description: "Request tracing, error logging, and audit trails so issues are caught and traced, not discovered by the client first.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 17l5-5 4 4 8-9" />
        <path d="M14 7h6v6" />
      </svg>
    ),
  },
  {
    label: "Database & Vector DB Setup",
    description: "Structured databases (PostgreSQL, MongoDB) alongside vector stores for retrieval, scoped, indexed, and access-controlled.",
    icon: (
      <svg {...ICON_PROPS}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    ),
  },
  {
    label: "Human Review Checkpoints",
    description: "AI output that affects real decisions (prescriptions, clinical notes, financial records) stays a draft until a person reviews it.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M9 12.5l2.5 2.5L16 9" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    label: "Fallback Flows",
    description: "When an AI step fails or is uncertain, systems degrade to a manual path instead of silently breaking.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </svg>
    ),
  },
  {
    label: "Data Privacy",
    description: "Client data is scoped, access-controlled, and never used to train or improve systems for other clients without agreement.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
];

export default function BuiltForProduction() {
  const ref = useRef<HTMLElement>(null);
  const [isInView, replayKey] = useReplay(ref, { margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section ref={ref} id="built-for-production" className="relative py-10 sm:py-12 lg:py-14 bg-bg-deep">
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
            className="font-display font-[800] leading-[1.15] text-text-primary mb-5 text-balance"
            style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
          >
            Engineering practices, not a pitch deck
          </motion.h2>

          <motion.p
            variants={prefersReduced ? undefined : fadeUpVariants}
            className="text-[1.05rem] leading-[1.75] text-text-secondary"
          >
            Every system we ship carries the same production checklist,
            whether it&apos;s a 10-day sprint or a 45-day MVP.
          </motion.p>
        </div>

        <motion.div
          variants={
            prefersReduced
              ? undefined
              : { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }
          }
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {PRACTICES.map((practice) => (
            <motion.div
              key={practice.label}
              variants={prefersReduced ? undefined : fadeUpVariants}
              className="clip-corner-sm flex flex-col gap-3 p-4 sm:p-5 bg-bg-card border border-border"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-glow text-accent-1">
                {practice.icon}
              </span>
              <span className="font-display font-[700] text-[0.92rem] text-text-primary leading-tight">
                {practice.label}
              </span>
              <span className="text-[0.8rem] leading-relaxed text-text-secondary">
                {practice.description}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={prefersReduced ? undefined : fadeUpVariants}
          className="mt-8 text-[0.82rem] text-text-muted max-w-2xl"
        >
          We don&apos;t claim certifications we don&apos;t hold. No SOC 2, ISO,
          HIPAA, or uptime guarantees are stated here unless a specific
          engagement has been independently audited for them. These are the
          engineering practices every system is actually built with.
        </motion.p>
      </motion.div>
    </section>
  );
}
