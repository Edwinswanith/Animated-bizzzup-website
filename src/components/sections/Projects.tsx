"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import {
  containerVariants,
  fadeUpVariants,
  scaleLineVariants,
  EXPO_OUT,
} from "@/lib/animations";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { FEATURED_PROJECTS as PROJECTS, type ProjectDetails } from "@/data/projects";

/* ── Staggered content variants for active card ── */

const contentStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const contentFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EXPO_OUT },
  },
};

const pillStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.35 },
  },
};

const pillFade: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EXPO_OUT },
  },
};

/* ── Card interior with staggered animations ── */

function CardContent({
  project,
  priority,
  isActive,
  prefersReduced,
  onViewDetails,
}: {
  project: ProjectDetails;
  priority?: boolean;
  isActive: boolean;
  prefersReduced: boolean | null;
  onViewDetails: () => void;
}) {
  return (
    <>
      {/* Primary screenshot with subtle zoom pulse */}
      <div className="relative h-[200px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-bg-surface">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: prefersReduced ? 1 : isActive ? 1.02 : 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            duration: 0.8,
          }}
        >
          <ProjectMedia
            src={project.image}
            alt={`${project.name}: ${project.imageLabel}`}
            label={project.imageLabel}
            category={project.category}
            previewLabel={project.previewLabel}
            sizes="(max-width: 768px) 90vw, 65vw"
            priority={priority}
          />
        </motion.div>

        {/* Floating image label */}
        <motion.div
          className="absolute bottom-2.5 left-3"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 8,
          }}
          transition={{ duration: 0.4, ease: EXPO_OUT }}
        >
          <span className="inline-block px-2 py-0.5 rounded-md bg-bg-card/85 backdrop-blur-sm border border-border text-[0.65rem] font-mono font-medium uppercase tracking-[0.1em] text-text-muted">
            {project.imageLabel}
          </span>
        </motion.div>

        {/* Subtle gradient overlay on active card */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--color-bg-card) 0%, transparent 40%)",
          }}
          animate={{ opacity: isActive ? 0.6 : 0 }}
          transition={{ duration: 0.5, ease: EXPO_OUT }}
        />
      </div>

      {/* Info panel with staggered content reveals */}
      <div className="flex-1 min-h-0 flex flex-col justify-between px-5 pt-4 pb-5 bg-bg-card overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isActive ? `${project.slug}-active` : `${project.slug}-inactive`}
            variants={prefersReduced ? undefined : contentStagger}
            initial={prefersReduced ? undefined : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
          >
            {/* Category label */}
            <motion.span
              variants={prefersReduced ? undefined : contentFadeUp}
              className="block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-1 font-medium mb-2"
            >
              {project.category}
            </motion.span>

            {/* Title */}
            <motion.h3
              variants={prefersReduced ? undefined : contentFadeUp}
              className="font-display font-[800] text-text-primary leading-[1.1] mb-1"
              style={{ fontSize: "clamp(1.35rem, 2vw, 1.7rem)" }}
            >
              {project.name}
            </motion.h3>

            {/* Tagline */}
            <motion.p
              variants={prefersReduced ? undefined : contentFadeUp}
              className="text-accent-2 text-[0.9rem] leading-snug font-medium"
            >
              {project.tagline}
            </motion.p>

            {/* Overview */}
            <motion.p
              variants={prefersReduced ? undefined : contentFadeUp}
              className="mt-2 text-[0.83rem] leading-relaxed text-text-secondary line-clamp-2"
            >
              {project.fullDetails.overview}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between gap-2 mt-3">
          {/* Tech pills with stagger */}
          <motion.div
            className="flex flex-wrap gap-1 min-w-0"
            variants={prefersReduced ? undefined : pillStagger}
            initial={prefersReduced ? undefined : "hidden"}
            animate={prefersReduced ? undefined : "visible"}
            key={`pills-${project.slug}-${isActive}`}
          >
            {/* Chips beyond the first two hide below sm — the mobile card is
                fixed-height and 3+ wrapped chip rows overflow its bottom edge */}
            {project.tags.slice(0, 4).map((tag, i) => (
              <motion.span
                key={tag}
                variants={prefersReduced ? undefined : pillFade}
                className={`px-2 py-0.5 rounded-full text-[0.63rem] font-mono font-medium tracking-wide bg-bg-surface text-text-muted border border-border ${
                  i >= 2 ? "hidden sm:inline-block" : ""
                }`}
              >
                {tag}
              </motion.span>
            ))}
            {project.tags.length > 4 && (
              <motion.span
                variants={prefersReduced ? undefined : pillFade}
                className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[0.55rem] font-mono font-medium tracking-wide bg-bg-surface text-text-muted border border-border"
              >
                +{project.tags.length - 4}
              </motion.span>
            )}
          </motion.div>

          {/* CTA button with entrance */}
          <AnimatePresence>
            {isActive && (
              <motion.button
                initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, x: 10 }}
                animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1, x: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, x: 10 }}
                transition={{ duration: 0.4, ease: EXPO_OUT, delay: 0.3 }}
                onClick={(e) => { e.stopPropagation(); onViewDetails(); }}
                className="group shrink-0 inline-flex items-center gap-1.5 font-display text-[0.85rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200 whitespace-nowrap"
              >
                View details
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Always-present, crawlable link to the full case study — the
            "View details" button above only opens the modal and is gated
            behind isActive/JS, so this is the one real href to /work/[slug]
            on the homepage carousel. */}
        <Link
          href={`/work/${project.slug}`}
          className="mt-2 inline-flex items-center gap-1.5 self-start font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-muted transition-colors duration-200 hover:text-accent-1"
        >
          View full case study
        </Link>
      </div>
    </>
  );
}

/* ── Auto-advance config ── */

const AUTO_ADVANCE_MS = 7000;

/* ── Slide transition spring config ── */

const SLIDE_SPRING = {
  type: "tween" as const,
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

/* ── Main section ── */

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const viewportRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Responsive card sizing */
  const isMobile = containerW < 500;
  const isTablet = containerW >= 500 && containerW < 900;

  const activeRatio = isMobile ? 0.88 : isTablet ? 0.62 : 0.56;
  const peekRatio = isMobile ? 0.15 : isTablet ? 0.17 : 0.19;

  const activeW = containerW * activeRatio;
  const peekW = containerW * peekRatio;
  const gap = isMobile ? 10 : 16;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const carouselInView = useInView(carouselRef, { once: true, amount: 0.2 });
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(
    scrollYProgress, [0, 1],
    prefersReduced ? [0, 0] : [20, -12]
  );

  /* Manual navigation permanently stops auto-advance (spec: any manual
     interaction — dot, swipe, arrow key — ends the slideshow) */
  const [autoEnabled, setAutoEnabled] = useState(true);
  const stopAuto = useCallback(() => setAutoEnabled(false), []);

  const navigate = useCallback((dir: number) => {
    stopAuto();
    setActiveIndex((i) => {
      const next = i + dir;
      return Math.max(0, Math.min(PROJECTS.length - 1, next));
    });
  }, [stopAuto]);

  const prev = useCallback(() => navigate(-1), [navigate]);
  const next = useCallback(() => navigate(1), [navigate]);

  /* Keyboard navigation — scoped to the carousel viewport (tabIndex=0),
     so arrow keys don't fire while typing elsewhere on the page */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    },
    [prev, next]
  );

  /* Touch/swipe support */
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStart.current = null;
  }, [next, prev]);

  /* ── Auto-advance (pause on hover; permanently off after manual nav) ── */
  const [isHovering, setIsHovering] = useState(false);

  const autoAdvance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % PROJECTS.length);
  }, []);

  useEffect(() => {
    if (prefersReduced || !autoEnabled || isHovering) return;
    const timer = setTimeout(autoAdvance, AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isHovering, autoEnabled, prefersReduced, autoAdvance]);

  /* Hover pause/resume for the carousel viewport */
  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  const sectionReveal: Variants = {
    hidden: { opacity: 1, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO_OUT } },
  };
  const reducedFade: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  /* Circular offset: wraps so project 1 is always +1 after project 6 */
  function circularOffset(index: number) {
    const n = PROJECTS.length;
    let off = index - activeIndex;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
  }

  /* Compute position for each card in the layered layout */
  function getCardTransform(index: number) {
    const offset = circularOffset(index);

    if (offset === 0) {
      return {
        x: (containerW - activeW) / 2,
        scale: 1,
        opacity: 1,
        zIndex: 3,
        rotateY: 0,
        filter: "blur(0px)",
      };
    }

    if (offset === -1) {
      return {
        x: isMobile ? -peekW * 0.3 : (containerW - activeW) / 2 - peekW - gap,
        scale: isMobile ? 0.82 : 0.88,
        opacity: isMobile ? 0.35 : 0.5,
        zIndex: 2,
        rotateY: isMobile ? 0 : 3,
        filter: isMobile ? "blur(1px)" : "blur(1.5px)",
      };
    }

    if (offset === 1) {
      return {
        x: isMobile
          ? containerW - peekW * 0.7
          : (containerW - activeW) / 2 + activeW + gap,
        scale: isMobile ? 0.82 : 0.88,
        opacity: isMobile ? 0.35 : 0.5,
        zIndex: 2,
        rotateY: isMobile ? 0 : -3,
        filter: isMobile ? "blur(1px)" : "blur(1.5px)",
      };
    }

    // Far offscreen cards — always exit/enter from the correct side
    return {
      x: offset < 0 ? -activeW * 1.2 : containerW + activeW * 0.2,
      scale: 0.75,
      opacity: 0,
      zIndex: 1,
      rotateY: 0,
      filter: "blur(3px)",
    };
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative bg-bg-surface overflow-hidden"
        style={{ padding: "clamp(2.5rem, 4vw, 3.5rem) 0" }}
      >
        {/* Background mesh */}
        {!prefersReduced && (
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{ background: "var(--gradient-mesh)" }}
          />
        )}

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">

          {/* ── Section header ── */}
          <motion.div
            ref={headerRef}
            style={{ y: headerY }}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="mb-8 sm:mb-10 max-w-2xl"
          >
            <motion.div variants={fadeUpVariants} className="flex items-center gap-3 mb-5">
              <motion.span variants={scaleLineVariants} className="block h-px w-[30px] bg-accent-1" />
              <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
                Featured Client Work
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-[800] leading-[1.15] text-text-primary mb-4"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}
            >
              Selected client systems
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="text-base lg:text-lg leading-relaxed text-text-secondary"
            >
              A selection of delivered, live, and in-progress builds across healthcare, commerce, legal, and operations, each grounded in a real client workflow.
            </motion.p>
          </motion.div>

          {/* ── Layered Slider ── */}
          <motion.div
            ref={carouselRef}
            initial="hidden"
            animate={carouselInView ? "visible" : "hidden"}
            variants={prefersReduced ? reducedFade : sectionReveal}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative">

              {/* Viewport — focusable so arrow keys work only when the
                  carousel has focus, not while typing elsewhere */}
              <div
                ref={viewportRef}
                className="overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40 focus-visible:ring-offset-2"
                role="group"
                aria-label="Featured projects carousel"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ perspective: "1200px" }}
              >
                <div
                  className={`relative h-[420px] sm:h-[530px] lg:h-[590px] transition-opacity duration-150 ${
                    containerW === 0 ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {PROJECTS.map((project, i) => {
                    const transform = getCardTransform(i);
                    const isActive = i === activeIndex;
                    return (
                      <motion.article
                        key={project.slug}
                        className={`absolute top-0 bottom-0 flex flex-col rounded-2xl overflow-hidden border bg-bg-card ${
                          isActive
                            ? "border-border-hover shadow-xl cursor-pointer"
                            : "border-border shadow-none"
                        }`}
                        style={{
                          width: isActive ? activeW : peekW > activeW * 0.5 ? activeW * 0.85 : activeW,
                          transformStyle: "preserve-3d",
                        }}
                        animate={
                          prefersReduced
                            ? {
                                x: transform.x,
                                opacity: transform.opacity,
                                zIndex: transform.zIndex,
                              }
                            : {
                                x: transform.x,
                                scale: transform.scale,
                                opacity: transform.opacity,
                                zIndex: transform.zIndex,
                                rotateY: transform.rotateY,
                                filter: transform.filter,
                              }
                        }
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : SLIDE_SPRING
                        }
                        whileHover={
                          isActive && !prefersReduced
                            ? {
                                y: -6,
                                boxShadow: "0 24px 60px var(--color-accent-glow)",
                              }
                            : {}
                        }
                        aria-hidden={!isActive}
                        onClick={
                          isActive
                            ? () => setSelectedProject(project)
                            : circularOffset(i) === -1
                              ? prev
                              : circularOffset(i) === 1
                                ? next
                                : undefined
                        }
                        tabIndex={isActive ? 0 : -1}
                      >
                        <CardContent
                          project={project}
                          priority={i === 0}
                          isActive={isActive}
                          prefersReduced={prefersReduced}
                          onViewDetails={() => setSelectedProject(project)}
                        />
                      </motion.article>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ── Dot indicators + pause/play toggle ── */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-2" role="tablist" aria-label="Project navigation">
                {PROJECTS.map((project, i) => (
                  <motion.button
                    key={project.slug}
                    layout={!prefersReduced}
                    onClick={() => {
                      stopAuto();
                      setActiveIndex(i);
                    }}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to ${project.name}`}
                    transition={{ duration: 0.3, ease: EXPO_OUT }}
                    className={`rounded-full h-2 transition-colors duration-300 ${
                      i === activeIndex
                        ? "w-7 bg-accent-1"
                        : "w-2 bg-border-hover hover:bg-text-muted"
                    }`}
                  />
                ))}
              </div>
              {/* Toggle hidden under reduced motion — auto-advance never runs there */}
              {!prefersReduced && (
                <button
                  type="button"
                  onClick={() => setAutoEnabled((v) => !v)}
                  aria-pressed={!autoEnabled}
                  aria-label={autoEnabled ? "Pause auto-advance" : "Resume auto-advance"}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted hover:text-text-primary hover:border-border-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1/40"
                >
                  {autoEnabled ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M9 5v14M15 5v14" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5l13 7.5-13 7.5z" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* ── View all projects ── */}
            <div className="flex justify-center mt-10">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200"
              >
                View all 15 projects
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── Project detail modal ── */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
