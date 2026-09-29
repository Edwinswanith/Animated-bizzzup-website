import Link from "next/link";
import { SERVICES, SERVICE_FIT, SERVICES_INTRO, HOW_THEY_DIFFER, serviceBySlug } from "@/content/services";
import { REGIONS } from "@/content/regions";
import { pageMeta } from "@/lib/site";
import { PageShell } from "@/components/pages/PageShell";
import { MapStrip } from "@/components/pages/MapStrip";
import { NextStep } from "@/components/pages/NextStep";
import styles from "@/components/pages/page.module.css";
import s from "./services.module.css";

export const metadata = pageMeta({
  title: "Services",
  description: "Six ways Tech Cogniverse builds AI-native systems: agents, voice, RAG, AI MVPs, workflow automation and custom business software.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <PageShell>
      <MapStrip />
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}>Services · the whole system</p>
          <h1 className={styles.h1}>Four regions, six disciplines.</h1>
          <p className={styles.intro}>{SERVICES_INTRO}</p>
        </header>

        <section className={s.fit} aria-labelledby="fit-title">
          <h2 id="fit-title" className={styles.sectionTitle}>Start from the friction you have.</h2>
          <ul>
            {SERVICE_FIT.map((f) => (
              <li key={f.slug}>
                <Link href={`/services/${f.slug}`}>
                  <span className={s.problem}>{f.problem}</span>
                  <span className={`mono ${s.answer}`}>{serviceBySlug(f.slug)?.shortName} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.band} aria-labelledby="regions-title">
          <h2 id="regions-title" className="sr-only">Services by region</h2>
          <div className={s.regions}>
            {REGIONS.map((r, i) => (
              <div key={r.id} className={s.region}>
                <p className={`mono ${s.rnum}`}>0{i + 1} · {r.name}</p>
                <p className={`mono ${s.grammar}`}>{r.grammar.join(" → ")}</p>
                {SERVICES.filter((x) => x.region === r.id).map((x) => (
                  <Link key={x.slug} href={`/services/${x.slug}`} className={s.svc}>
                    <span className={s.svcName}>{x.name}</span>
                    <span className={s.svcLine}>{x.headline}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.band} aria-labelledby="differ-title">
          <h2 id="differ-title" className={styles.sectionTitle}>How these actually differ</h2>
          <div className={styles.prose}>{HOW_THEY_DIFFER.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
        </section>
      </div>
      <NextStep title="Not sure which one fits?" />
    </PageShell>
  );
}
