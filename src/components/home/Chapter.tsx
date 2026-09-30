import Link from "next/link";
import type { RegionId } from "@/content/types";
import { regionById } from "@/content/regions";
import styles from "./Chapter.module.css";

type Props = {
  id: string;
  index: string;
  region: RegionId;
  friction: string; // the headline: the friction, in plain words
  body: React.ReactNode;
  evidence: React.ReactNode;
  stage: React.ReactNode;
  services: { href: string; label: string }[];
  layout?: "stage-right" | "stage-left" | "stage-wide";
  tone?: "limestone" | "cool";
};

export function Chapter({ id, index, region, friction, body, evidence, stage, services, layout = "stage-right", tone = "limestone" }: Props) {
  const r = regionById(region)!;
  return (
    <section id={id} className={styles.chapter} data-layout={layout} data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.text}>
          <p className={`mono ${styles.kicker}`}>
            <span>{index}</span> {r.name}
            <span className={styles.grammar} aria-label={`${r.grammar.join(", then ")}`}>
              {r.grammar.map((g, i) => (
                <span key={g} aria-hidden="true">{i > 0 && <b>→</b>}{g}</span>
              ))}
            </span>
          </p>
          <h2 id={`${id}-title`} className={styles.title}>{friction}</h2>
          <div className={styles.body}>{body}</div>
          <div className={styles.evidence}>{evidence}</div>
          <p className={styles.services}>
            <span className="mono">Service{services.length > 1 ? "s" : ""}</span>
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="link-arrow">{s.label}</Link>
            ))}
          </p>
        </div>
        <div className={styles.stage}>{stage}</div>
      </div>
    </section>
  );
}
