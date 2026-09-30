"use client";

import { gsap, type SceneContext } from "@/lib/motion";

/** Scroll-linked (not pinned) timeline for a chapter stage. Desktop: follows the chapter while the
 *  stage is sticky. Mobile: a short window while the stage passes through the viewport. */
export function stageTimeline({ root, desktop }: SceneContext) {
  const section = root.closest("section") as HTMLElement;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: desktop
      ? { trigger: section, start: "top 55%", end: "bottom 85%", scrub: 0.5 }
      : { trigger: root, start: "top 85%", end: "bottom 60%", scrub: 0.5 },
  });
  const frame = gsap.utils.selector(root);
  tl.from(frame('[data-edge="x"]'), { scaleX: 0.2, duration: 1 }, 0).from(frame('[data-edge="y"]'), { scaleY: 0.25, duration: 1 }, 0);
  const drawing = root.querySelector(desktop ? "[data-wide]" : "[data-tall]") ?? root;
  const q = gsap.utils.selector(drawing);
  return { tl, q };
}
