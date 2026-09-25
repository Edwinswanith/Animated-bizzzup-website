"use client";

import { useSyncExternalStore } from "react";

/* SSR-safe: server snapshot is always false, so first client render matches
   the server markup and the real value applies after hydration. */
export function useIsMobile(breakpoint = 768) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
    () => false
  );
}
