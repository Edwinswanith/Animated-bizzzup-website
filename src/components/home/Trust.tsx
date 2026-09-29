"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScene, gsap } from "@/lib/motion";
import { PRACTICES, CERTIFICATION_NOTE, TESTIMONIALS, STATS, CLIENT_PROOF } from "@/content/company";
import styles from "./Trust.module.css";

const GATE = (title: string) => title.startsWith("Human") || title.startsWith("Fallback");

/** The process route continues: every build passes the same ten checkpoints on the way to launch.
 *  Human review and fallback are gates (amber), the rest are structure (cobalt). */
export function Trust() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, ({ root, desktop }) => {
    const q = gsap.utils.selector(root);
    gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q("[data-route]")[0], start: desktop ? "top 70%" : "top 85%", end: desktop ? "bottom 70%" : "bottom 80%", scrub: 0.5 },
    })
      .from(q("[data-line]"), { scaleY: 0, duration: 1 }, 0)
      .from(q("[data-check]"), { opacity: 0.25, duration: 0.1, stagger: 0.09 }, 0)
      .from(q("[data-node]"), { scale: 0, duration: 0.08, stagger: 0.09 }, 0);
  });

  const quote = TESTIMONIALS[0];
  return (
    <section ref={ref} id="trust" className={styles.trust} aria-labelledby="trust-title">
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.side}>
          <p className="mono">Built for production</p>
          <h2 id="trust-title" className={styles.title}>Every system passes the same checkpoints.</h2>
          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label}><dt className="mono">{s.label}</dt><dd>{s.value}</dd></div>
            ))}
          </dl>
          <p className={styles.cert}>{CERTIFICATION_NOTE}</p>
        </div>

        <div data-route className={styles.route}>
          <span data-line className={styles.line} aria-hidden="true" />
          <ol className={styles.checks}>
            {PRACTICES.map((p, i) => (
              <li key={p.title} data-check data-gate={GATE(p.title) || undefined}>
                <span data-node className={styles.node} aria-hidden="true" />
                <p className={`mono ${styles.pnum}`}>{String(i + 1).padStart(2, "0")}{GATE(p.title) ? " · gate" : ""}</p>
                <h3>{p.title}</h3>
                <p className={styles.pdesc}>{p.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {quote && (
        <figure className={`wrap ${styles.quote}`}>
          <blockquote>“{quote.quote}”</blockquote>
          <figcaption>
            <span className={styles.qname}>{quote.name}</span>
            <span className="mono">{quote.role} · {quote.project}</span>
            {quote.projectSlug && <Link href={`/work/${quote.projectSlug}`} className="link-arrow">The project</Link>}
          </figcaption>
        </figure>
      )}
      <ul className={`wrap ${styles.clients}`}>
        {CLIENT_PROOF.map((c) => <li key={c} className="mono">{c}</li>)}
      </ul>
    </section>
  );
}
