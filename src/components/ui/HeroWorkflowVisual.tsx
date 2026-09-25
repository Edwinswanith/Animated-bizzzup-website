"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EXPO_OUT } from "@/lib/animations";
import { HERO_WORKFLOWS, type WorkflowNode } from "@/data/heroWorkflows";

/* ------------------------------------------------------------------ */
/*  Icons — one small stroke icon per node type                        */
/* ------------------------------------------------------------------ */

const ICON_PROPS = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS: Record<WorkflowNode["icon"], React.ReactNode> = {
  upload: (
    <svg {...ICON_PROPS}>
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  voice: (
    <svg {...ICON_PROPS}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
    </svg>
  ),
  ai: (
    <svg {...ICON_PROPS}>
      <path d="M12 2l1.6 4.8L18 8l-4.4 1.2L12 14l-1.6-4.8L6 8l4.4-1.2z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
  ),
  calendar: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  billing: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  ),
  inventory: (
    <svg {...ICON_PROPS}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7M12 11v10" />
    </svg>
  ),
  dashboard: (
    <svg {...ICON_PROPS}>
      <rect x="3" y="3" width="7" height="9" rx="1.2" />
      <rect x="14" y="3" width="7" height="5" rx="1.2" />
      <rect x="14" y="12" width="7" height="9" rx="1.2" />
      <rect x="3" y="16" width="7" height="5" rx="1.2" />
    </svg>
  ),
  ocr: (
    <svg {...ICON_PROPS}>
      <path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3" />
      <path d="M8 12h8" />
    </svg>
  ),
  search: (
    <svg {...ICON_PROPS}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
    </svg>
  ),
  doc: (
    <svg {...ICON_PROPS}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13h6M9 17h6" />
    </svg>
  ),
  check: (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Timing                                                              */
/* ------------------------------------------------------------------ */

const STEP_MS = 950; // one node activates + rail fill advances
const HOLD_MS = 1700; // pause once the flow + console output are complete
const WORKFLOW_SWITCH_MS = 450; // cross-fade between projects

/* ------------------------------------------------------------------ */
/*  Status pill — "Running workflow" while active, done label on finish */
/* ------------------------------------------------------------------ */

function StatusPill({ isComplete, doneStatus }: { isComplete: boolean; doneStatus: string }) {
  const color = isComplete ? "var(--color-accent-2)" : "var(--color-accent-1)";
  return (
    <span
      className="inline-flex max-w-full shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[0.6rem] font-semibold sm:px-2.5 sm:text-[0.65rem]"
      style={{ color, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
    >
      <span className="relative flex h-1.5 w-1.5">
        {!isComplete && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-70" style={{ background: color }} />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      </span>
      {isComplete ? doneStatus : "Running workflow"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Node rail — horizontal chips on a single fill-progress line         */
/* ------------------------------------------------------------------ */

function NodeRail({
  nodes,
  step,
  doneStatus,
}: {
  nodes: WorkflowNode[];
  step: number;
  doneStatus: string;
}) {
  const isComplete = step >= nodes.length;
  const stepNumber = Math.min(step + 1, nodes.length);

  return (
    <div className="px-3 pt-4 pb-3.5 sm:px-5">
      {/* Meta row — step counter + status pill */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[0.68rem] text-text-muted">
          Step <span className="text-text-primary font-semibold">{stepNumber}</span> of {nodes.length}
        </span>
        <StatusPill isComplete={isComplete} doneStatus={doneStatus} />
      </div>

      <div className="relative flex items-center justify-between">
        {/* Track */}
        <div className="absolute left-[16px] right-[16px] top-1/2 h-px -translate-y-1/2 bg-border sm:left-[18px] sm:right-[18px]" />
        {/* Fill */}
        <motion.div
          className="absolute left-[16px] top-1/2 h-px -translate-y-1/2 origin-left sm:left-[18px]"
          style={{ right: "16px", background: "var(--color-accent-1)" }}
          initial={false}
          animate={{
            scaleX: Math.min(step, nodes.length - 1) / (nodes.length - 1),
          }}
          transition={{ duration: 0.5, ease: EXPO_OUT }}
        />

        {nodes.map((node, i) => {
          const state = i < step ? "done" : i === step ? "active" : "pending";
          return (
            <div
              key={node.label}
              className="relative z-10 flex flex-col items-center gap-1.5"
              style={{ flex: "0 0 auto" }}
            >
              <span
                className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors duration-300 sm:h-9 sm:w-9"
                style={{
                  color: state === "pending" ? "var(--color-text-muted)" : "var(--color-accent-1)",
                  borderColor: state === "pending" ? "var(--color-border)" : "var(--color-accent-1)",
                  background: "var(--color-bg-card)",
                }}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "done" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="var(--color-accent-2)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  ICONS[node.icon]
                )}
                {state === "active" && (
                  <motion.span
                    className="absolute -inset-1 rounded-full pointer-events-none"
                    style={{ border: "1px solid var(--color-accent-1)" }}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.35 }}
                    transition={{ duration: 0.9, ease: "easeOut", repeat: Infinity }}
                  />
                )}
              </span>
              <span
                className="hidden font-mono text-[0.62rem] leading-none whitespace-nowrap transition-colors duration-300 sm:block"
                style={{
                  color: state === "pending" ? "var(--color-text-muted)" : "var(--color-text-primary)",
                  fontWeight: state === "active" ? 700 : 500,
                }}
              >
                {node.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Output console — progressively revealed terminal-style lines       */
/* ------------------------------------------------------------------ */

function OutputConsole({
  outputs,
  revealed,
}: {
  outputs: string[];
  revealed: number;
}) {
  return (
    <div
      className="mx-3 mb-4 rounded-md border px-3 py-3.5 sm:mx-5 sm:mb-5 sm:px-4"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
    >
      <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted mb-2.5">
        Output preview
      </span>

      <div className="flex flex-col gap-2 min-h-[104px]">
        {outputs.map((line, i) => {
          const shown = i < revealed;
          const isLatest = i === revealed - 1;
          return (
            <motion.div
              key={line}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: EXPO_OUT }}
              className="flex items-center gap-2.5 font-mono text-[0.72rem] leading-snug sm:text-[0.78rem]"
            >
              <span className="shrink-0" style={{ color: shown ? "var(--color-accent-2)" : "var(--color-text-muted)" }}>
                {shown ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                )}
              </span>
              <span
                style={{
                  color: shown ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontWeight: isLatest ? 700 : 500,
                }}
              >
                {line}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header — eyebrow, project title, category badge                    */
/* ------------------------------------------------------------------ */

function WorkflowHeader({ project, category }: { project: string; category: string }) {
  return (
    <div className="border-b border-border">
      {/* Console chrome strip — reinforces the "real product console" feel */}
      <div className="flex items-center gap-1.5 px-5 pt-3">
        <span className="w-2 h-2 rounded-full bg-accent-1/40" />
        <span className="w-2 h-2 rounded-full bg-accent-2/40" />
        <span className="w-2 h-2 rounded-full bg-accent-3/40" />
      </div>
      <div className="flex items-center justify-between gap-3 px-4 pt-2 pb-3.5 sm:px-5">
        <div className="min-w-0">
          <span className="block font-mono text-[0.62rem] uppercase tracking-[0.14em] text-text-muted">
            Real Bizzzup system
          </span>
          <span className="block font-display font-[700] text-[1.1rem] text-text-primary leading-tight mt-1 truncate">
            {project}
          </span>
        </div>
        <span
          className="max-w-[42%] shrink-0 truncate rounded-md px-2 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] sm:px-2.5 sm:text-[0.64rem] sm:tracking-[0.1em]"
          style={{
            color: "var(--color-accent-2)",
            background: "color-mix(in srgb, var(--color-accent-2) 10%, transparent)",
          }}
        >
          {category}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal mapping — output lines unlock over the tail of the flow      */
/* ------------------------------------------------------------------ */

function revealedCount(step: number, nodeCount: number, outputCount: number) {
  const offset = nodeCount - outputCount;
  return Math.max(0, Math.min(outputCount, step - offset));
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion static view                                         */
/* ------------------------------------------------------------------ */

function StaticConsole() {
  const workflow = HERO_WORKFLOWS[0];
  return (
    <div className="clip-corner-md overflow-hidden border border-border bg-bg-card">
      <WorkflowHeader project={workflow.project} category={workflow.category} />
      <NodeRail nodes={workflow.nodes} step={workflow.nodes.length} doneStatus={workflow.doneStatus} />
      <OutputConsole outputs={workflow.outputs} revealed={workflow.outputs.length} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function HeroWorkflowVisual({
  inView,
  reduced,
}: {
  inView: boolean;
  reduced: boolean;
}) {
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [step, setStep] = useState(0); // 0..nodes.length; nodes.length = fully complete
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduced || !inView) return;

    const workflow = HERO_WORKFLOWS[workflowIndex];
    const isComplete = step >= workflow.nodes.length;

    timerRef.current = setTimeout(
      () => {
        if (!isComplete) {
          setStep((s) => s + 1);
        } else {
          setWorkflowIndex((idx) => (idx + 1) % HERO_WORKFLOWS.length);
          setStep(0);
        }
      },
      isComplete ? HOLD_MS : STEP_MS
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inView, reduced, workflowIndex, step]);

  if (reduced) {
    return (
      <div className="w-full max-w-full mx-auto lg:mx-0 lg:ml-auto lg:max-w-[540px]">
        <StaticConsole />
      </div>
    );
  }

  const workflow = HERO_WORKFLOWS[workflowIndex];
  const revealed = revealedCount(step, workflow.nodes.length, workflow.outputs.length);

  return (
    <div className="w-full max-w-full mx-auto lg:mx-0 lg:ml-auto lg:max-w-[540px]">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: EXPO_OUT }}
        className="clip-corner-md overflow-hidden border border-border bg-bg-card shadow-[0_8px_32px_color-mix(in_srgb,var(--color-shadow)_12%,transparent)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={workflow.project}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: WORKFLOW_SWITCH_MS / 1000, ease: EXPO_OUT }}
          >
            <WorkflowHeader project={workflow.project} category={workflow.category} />
            <NodeRail nodes={workflow.nodes} step={step} doneStatus={workflow.doneStatus} />
            <OutputConsole outputs={workflow.outputs} revealed={revealed} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <Link
        href={workflow.href}
        className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.76rem] text-accent-1 hover:text-accent-2 transition-colors duration-200"
      >
        See the {workflow.project} case study
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}
