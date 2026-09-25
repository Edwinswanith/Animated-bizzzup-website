"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import HeroWorkflowVisual from "@/components/ui/HeroWorkflowVisual";
import { useIsMobile } from "@/hooks/useIsMobile";
import { EXPO_OUT } from "@/lib/animations";

/* ------------------------------------------------------------------ */
/*  Word Reveal — word-by-word stagger                                 */
/* ------------------------------------------------------------------ */

function WordReveal({
  text,
  delay = 0,
  reduced,
  wordClassName,
}: {
  text: string;
  delay?: number;
  reduced: boolean;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            className={`inline-block mr-[0.3em] ${wordClassName ?? ""}`}
            /* .gradient-text sets margin-inline-end:-0.12em (beats the mr utility);
               inline style restores the word gap: 0.12em padding + 0.18em = 0.3em */
            style={wordClassName ? { marginInlineEnd: "0.18em" } : undefined}
            initial={reduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: delay + i * 0.02, ease: EXPO_OUT }}
          >
            {word}
          </motion.span>
          {/* Word gaps above are CSS margin only — no real space character
              separates words in the DOM text, so crawlers/screen readers/
              copy-paste see them run together (e.g. "system,live"). This
              sr-only space fixes raw-text extraction without touching the
              visual layout. */}
          {i < words.length - 1 && <span className="sr-only"> </span>}
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion() ?? false;
  const isMobile = useIsMobile();

  /* Scroll-driven transforms */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Entrance complete state — wait for entrance animations to finish */
  const [entranceComplete, setEntranceComplete] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const canScroll = entranceComplete && !prefersReduced && !isMobile;

  /* Parallax transform for text */
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center overflow-hidden bg-bg-deep lg:min-h-[calc(100svh-72px)]"
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-24 pb-10 sm:pt-28 lg:px-10 lg:pt-8 lg:pb-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:gap-8">
          {/* ── Left: Text Content ── */}
          <motion.div className="min-w-0" style={{ y: canScroll ? textY : 0 }}>
            {/* Badge */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EXPO_OUT }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-border-accent bg-accent-glow"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-1" />
              </span>
              <span className="text-xs font-semibold tracking-[0.12em] uppercase font-mono text-accent-1">
                AI Systems &amp; Product Engineering
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-display font-[800] leading-[1.12] tracking-tight mb-4 text-text-primary"
              style={{ fontSize: "clamp(2.6rem, 4vw + 1rem, 4.2rem)" }}
            >
              <WordReveal
                text="Your AI system,"
                delay={0.05}
                reduced={prefersReduced}
              />
              <span className="sr-only"> </span>
              <span className="block">
                <WordReveal
                  text="live in 45 days."
                  delay={0.11}
                  reduced={prefersReduced}
                  wordClassName="gradient-text italic"
                />
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
              className="text-base md:text-lg leading-[1.6] max-w-xl mb-6 text-text-secondary"
            >
              Fixed price. Demo every Friday. AI agents, voice, RAG, and
              custom software built for production, not demos.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EXPO_OUT }}
              className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <motion.a
                href="#contact"
                className="clip-corner-md inline-flex w-full items-center justify-center px-8 py-3.5 !text-white font-display font-semibold text-base bg-accent-1 transition-colors duration-200 hover:bg-accent-1-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep sm:w-auto"
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
              >
                Book an AI audit
              </motion.a>

              <Link
                href="/work"
                className="group inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 font-display font-semibold text-base rounded-sm transition-colors border border-border text-text-primary hover:border-border-accent hover:bg-bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep sm:w-auto"
              >
                View our work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Right: AI Workflow Canvas ── */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.0, delay: 0.3, ease: EXPO_OUT }}
            className="relative flex min-w-0 flex-col items-center justify-center lg:col-span-1"
          >
            <HeroWorkflowVisual inView={inView} reduced={prefersReduced} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
