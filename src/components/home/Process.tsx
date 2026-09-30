"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScene, gsap } from "@/lib/motion";
import { PROCESS, PROCESS_PROMISE, ENGAGEMENT_MODELS, ENGAGEMENT_NOTES } from "@/content/company";
import styles from "./Process.module.css";

const FRIDAYS = 6; // 45 days holds six Fridays

export function Process() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, ({ root, desktop }) => {
    const q = gsap.utils.selector(root);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q("[data-route]")[0], start: desktop ? "top 75%" : "top 85%", end: desktop ? "bottom 45%" : "bottom 55%", scrub: 0.5 },
    });
    tl.from(q("[data-channel]"), { scaleX: desktop ? 0 : 1, scaleY: desktop ? 1 : 0, duration: 1.6 }, 0)
      .from(q("[data-node]"), { scale: 0, duration: 0.2, stagger: 0.45 }, 0.05)
      .from(q("[data-friday]"), { opacity: 0, scaleY: 0, duration: 0.1, stagger: 0.07 }, 0.5)
      .from(q("[data-stepcopy]"), { opacity: 0.25, duration: 0.3, stagger: 0.45 }, 0.05);
  });

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <div className="wrap">
        <div className={styles.head}>
          <p className="mono">How a build moves</p>
          <h2 id="process-title" className={styles.title}>Forty-five days, in the open.</h2>
          <p className={styles.promise}>{PROCESS_PROMISE}</p>
        </div>

        <div data-route className={styles.route}>
          <span data-channel className={styles.channel} aria-hidden="true" />
          <ol className={styles.steps}>
            {PROCESS.map((p) => (
              <li key={p.step} className={styles.step} data-step={p.title.toLowerCase()}>
                <span data-node className={styles.node} aria-hidden="true" />
                <div data-stepcopy>
                  <p className={`mono ${styles.stepNum}`}>{p.step}{p.title === "Launch" ? " · day 45" : ""}</p>
                  <h3 className={styles.stepTitle}>{p.title}</h3>
                  <p className={styles.stepBody}>{p.description}</p>
                  {p.title === "Build" && (
                    <p className={styles.fridays} aria-label="A demo every Friday">
                      {Array.from({ length: FRIDAYS }, (_, i) => (
                        <span key={i} data-friday className={styles.friday}><span className="mono">Fri</span></span>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.models}>
          <h3 className="mono">Three ways to start</h3>
          <ul>
            {ENGAGEMENT_MODELS.map((m) => (
              <li key={m.name} className={styles.model}>
                <p className={styles.mname}>{m.name}{m.mostPopular && <span className={`mono ${styles.popular}`}>Most chosen</span>}</p>
                <p className={`mono ${styles.mmeta}`}>{m.duration} · {m.priceINR} · {m.priceUSD}</p>
                <p className={styles.mincl}>{m.included.join(" · ")}</p>
              </li>
            ))}
          </ul>
          <p className={styles.notes}>{ENGAGEMENT_NOTES.join(" ")}</p>
          <Link href="/process" className="link-arrow">The full process and practices</Link>
        </div>
      </div>
    </section>
  );
}
