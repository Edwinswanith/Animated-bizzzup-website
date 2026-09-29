import Link from "next/link";
import { PROMISE } from "@/content/company";
import { Anchor } from "@/components/site/Anchor";
import { VoiceFlow } from "./VoiceFlow";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-hero>
      <div className={styles.pin} data-pin>
        <Anchor name="k1" priority className={styles.world} />
        <div className={styles.veil} aria-hidden="true" />
        <div className={`wrap ${styles.grid}`}>
          <div className={styles.copy}>
            <p className="mono">{PROMISE.eyebrow} · Chennai</p>
            <h1 id="hero-title" className={styles.title}>
              Business friction in. <em>Working systems out.</em>
            </h1>
            <p className={styles.sub}>
              {PROMISE.rest} {PROMISE.headline.replace(/\.$/, "")}, fixed price, with a demo every Friday.
            </p>
            <div className={styles.actions}>
              <Link href="#friction" className="btn btn--primary">Describe your friction</Link>
              <Link href="/work" className="link-arrow">See the work</Link>
            </div>
          </div>
          <VoiceFlow />
        </div>
        <p className={`mono ${styles.cue}`} aria-hidden="true">Scroll to resolve</p>
      </div>
    </section>
  );
}
