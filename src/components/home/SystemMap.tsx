"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScene, gsap } from "@/lib/motion";
import { REGIONS } from "@/content/regions";
import { PROJECTS } from "@/content/projects";
import { serviceBySlug } from "@/content/services";
import { Anchor } from "@/components/site/Anchor";
import styles from "./SystemMap.module.css";

/* Region positions on the K2 master (fractions). Products sits over the curled clay form so the
   label, not the shape, is what reads. */
const POS: Record<string, { x: number; y: number }> = {
  voice: { x: 9, y: 9 },
  knowledge: { x: 71, y: 9 },
  operations: { x: 9, y: 63 },
  products: { x: 71, y: 61 },
};

export function SystemMap() {
  const ref = useRef<HTMLElement>(null);

  useScene(ref, ({ root, desktop }) => {
    if (!desktop) return; // phones get the still map and a tappable list
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root, start: "top top+=64", end: "+=120%", pin: q("[data-pin]")[0], scrub: 0.6 },
    });
    // Camera: from the channel junction (a crack in the sand) out to the whole terrain.
    // The detail layer is the same junction cut from the 4K master: sharp at the start, shrinking
    // in lockstep with the world (scale 1 → 1/3 about the same point), then handing over.
    tl.from(q("[data-world]"), { scale: 3, transformOrigin: "47% 55%", duration: 1.4, ease: "power1.out" }, 0)
      .fromTo(q("[data-detail]"), { scale: 1, opacity: 1 }, { scale: 1 / 3, transformOrigin: "47% 55%", duration: 1.4, ease: "power1.out" }, 0)
      .to(q("[data-detail]"), { opacity: 0, duration: 0.5 }, 0.35)
      .from(q("[data-intro]"), { opacity: 0, y: 16, duration: 0.3 }, 1.0)
      .from(q("[data-region]"), { opacity: 0, y: 12, duration: 0.3, stagger: 0.12 }, 1.2);
  });

  return (
    <section ref={ref} id="system" className={styles.map} aria-labelledby="system-title">
      <div data-pin className={styles.pin}>
        <div data-world className={styles.world}>
          <Anchor name="k2" landscapeOnly alt="" />
        </div>
        <picture data-detail className={styles.detail}>
          <source type="image/avif" srcSet="/media/anchors/k2-detail-960.avif 960w, /media/anchors/k2-detail-1600.avif 1600w" sizes="100vw" />
          <source type="image/webp" srcSet="/media/anchors/k2-detail-960.webp 960w, /media/anchors/k2-detail-1600.webp 1600w" sizes="100vw" />
          <img src="/media/anchors/k2-detail-1600.jpg" alt="" width={1600} height={900} loading="lazy" decoding="async" />
        </picture>
        <div className={`wrap ${styles.overlay}`}>
          <div data-intro className={styles.intro}>
            <p className="mono">The whole system</p>
            <h2 id="system-title" className={styles.title}>Every build is a region of one practice.</h2>
            <p className={styles.lede}>Four kinds of work, six services, fifteen builds. Choose a region to go deeper.</p>
          </div>
          <ol className={styles.regions}>
            {REGIONS.map((r, i) => {
              const count = PROJECTS.filter((p) => p.region === r.id).length;
              return (
                <li key={r.id} data-region className={styles.region} data-side={POS[r.id].x > 50 ? "right" : "left"} style={{ ["--x" as string]: `${POS[r.id].x}%`, ["--y" as string]: `${POS[r.id].y}%` }}>
                  <span className={styles.marker} aria-hidden="true"><span className={styles.dot} /><span className={styles.leader} /></span>
                  <h3 className={styles.rname}><span className={`mono ${styles.num}`}>0{i + 1}</span> {r.name}</h3>
                  <p className={`mono ${styles.grammar}`}>{r.grammar.join(" → ")}</p>
                  <ul className={styles.svcs}>
                    {r.serviceSlugs.map((slug) => (
                      <li key={slug}><Link href={`/services/${slug}`}>{serviceBySlug(slug)?.name}</Link></li>
                    ))}
                  </ul>
                  <Link href={`/work?region=${r.id}`} className={`mono ${styles.count}`}>{count} builds →</Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
