"use client";

import { useRef } from "react";
import { useScene, gsap } from "@/lib/motion";
import styles from "./Transformation.module.css";

export type TStep = { label: string; kind: "friction" | "structure" | "system" | "action" | "gate" };

/** One page, one transformation: a sequence taken from that page's published facts. */
export function Transformation({ title, steps, note }: { title: string; steps: TStep[]; note?: string }) {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, ({ root, desktop }) => {
    const q = gsap.utils.selector(root);
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root, start: desktop ? "top 80%" : "top 88%", end: desktop ? "bottom 55%" : "bottom 65%", scrub: 0.5 },
    })
      .from(q("[data-link]"), { scaleX: desktop ? 0 : 1, scaleY: desktop ? 1 : 0, duration: 1 }, 0)
      .from(q("[data-t]"), { opacity: 0.2, y: 10, duration: 0.25, stagger: 0.18 }, 0);
  });
  return (
    <figure ref={ref} className={styles.t} aria-label={title}>
      <figcaption className={`mono ${styles.title}`}>{title}</figcaption>
      <div className={styles.track}>
        <span data-link className={styles.link} aria-hidden="true" />
        <ol className={styles.steps} style={{ ["--n" as string]: steps.length }}>
          {steps.map((s, i) => (
            <li key={i} data-t data-kind={s.kind} className={styles.step}>
              <span className={styles.mark} aria-hidden="true" />
              <span className={styles.label}>{s.label}</span>
            </li>
          ))}
        </ol>
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </figure>
  );
}
