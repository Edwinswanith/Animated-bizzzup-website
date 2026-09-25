/** Shared animation easings, variants, and hooks */

import type { Variants } from "framer-motion";
import { useInView } from "framer-motion";
import type React from "react";

export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Parent stagger orchestrator */
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * Child fade + slide up. `hidden` stays fully opaque (only offset) so content
 * is never truly invisible if the scroll-trigger never fires before capture —
 * e.g. full-page screenshot tools that don't scroll the real viewport.
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 1, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EXPO_OUT },
  },
};

/** Card-level slide up (no blur — GPU-safe). See fadeUpVariants note above. */
export const fadeUpBlurVariants: Variants = {
  hidden: { opacity: 1, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EXPO_OUT },
  },
};

/** Decorative horizontal line scale-in from left */
export const scaleLineVariants: Variants = {
  hidden: { scaleX: 0, originX: "0%" },
  visible: {
    scaleX: 1,
    transition: { duration: 0.45, ease: EXPO_OUT },
  },
};

/**
 * Returns [isInView, replayKey].
 * Sections animate ONCE — the first time they enter the viewport — and never
 * replay on scroll-up. replayKey flips 0→1 on that first reveal (consumers
 * pass it as a `key` prop; the signature is kept for their sake).
 */
export function useReplay(
  ref: React.RefObject<Element | null>,
  options?: { margin?: string }
): [boolean, number] {
  const isInView = useInView(ref, { once: true, margin: options?.margin as never });
  return [isInView, isInView ? 1 : 0];
}
