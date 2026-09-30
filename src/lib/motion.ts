"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Motion only runs when the visitor allows it. Reduced motion gets the static final state,
 *  which is what the markup renders by default: timelines are built with .from(), so the
 *  DOM at rest is always the resolved system. */
export const MQ = {
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899.98px) and (prefers-reduced-motion: no-preference)",
} as const;

export type SceneContext = { root: HTMLElement; desktop: boolean };

let configured = false;
function configure() {
  if (configured) return;
  configured = true;
  gsap.registerPlugin(ScrollTrigger);
  // Phones: the collapsing address bar must not trigger recalculation (it causes judder in pins).
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Trigger positions depend on final layout: recompute once fonts and images have settled.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

export function useScene(ref: RefObject<HTMLElement | null>, build: (ctx: SceneContext) => void | (() => void)) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    configure();
    const mm = gsap.matchMedia(root);
    mm.add(MQ, (c) => build({ root, desktop: Boolean(c.conditions?.desktop) }));
    return () => mm.revert();
    // build is defined inline per component and intentionally captured once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { gsap, ScrollTrigger };
