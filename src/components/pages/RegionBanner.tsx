"use client";

import Link from "next/link";
import { useRef } from "react";
import type { RegionId } from "@/content/types";
import { REGIONS, regionById } from "@/content/regions";
import { useScene, gsap } from "@/lib/motion";
import styles from "./RegionBanner.module.css";

const QUAD: Record<RegionId, [number, number]> = { voice: [0, 0], knowledge: [1, 0], operations: [0, 1], products: [1, 1] };

/** Entering one region of the system map: the region's crop of K2 settles from a wider view,
 *  and a small code-drawn map marks where this page sits. Direct loads land on the settled state. */
export function RegionBanner({ region, trail }: { region: RegionId; trail: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const r = regionById(region)!;
  useScene(ref, ({ root, desktop }) => {
    if (!desktop) return;
    const q = gsap.utils.selector(root);
    const [qx, qy] = QUAD[region];
    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(q("[data-crop]"), { scale: 1.35, transformOrigin: `${qx ? 100 : 0}% ${qy ? 100 : 0}%`, duration: 0.9 }, 0)
      .from(q("[data-here]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.4 }, 0.35);
  });

  const set = (ext: string) => `/media/regions/${region}-1200.${ext} 1200w, /media/regions/${region}-2000.${ext} 2000w`;
  return (
    <div ref={ref} className={styles.banner}>
      <picture data-crop className={styles.crop}>
        <source type="image/avif" srcSet={set("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={set("webp")} sizes="100vw" />
        <img src={`/media/regions/${region}-1200.jpg`} srcSet={set("jpg")} sizes="100vw" alt="" width={1200} height={400} fetchPriority="high" />
      </picture>
      <div className={`wrap ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.trail}>
          <ol>
            <li><Link href="/#system">System</Link></li>
            {trail.map((t) => <li key={t.href}><Link href={t.href}>{t.label}</Link></li>)}
          </ol>
        </nav>
        <div className={styles.tag}>
          <svg viewBox="0 0 44 26" className={styles.mini} aria-hidden="true">
            {REGIONS.map((rg) => {
              const [x, y] = QUAD[rg.id];
              return <rect key={rg.id} x={x * 23} y={y * 13} width="21" height="11" className={rg.id === region ? styles.on : styles.off} data-here={rg.id === region || undefined} />;
            })}
          </svg>
          <span className="mono">{r.name} region</span>
          <span className={`mono ${styles.grammar}`}>{r.grammar.join(" → ")}</span>
        </div>
      </div>
    </div>
  );
}
