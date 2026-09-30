import { pageMeta } from "@/lib/site";
import { PRACTICES, PRACTICES_INTRO, CERTIFICATION_NOTE } from "@/content/company";
import { PageShell } from "@/components/pages/PageShell";
import { MapStrip } from "@/components/pages/MapStrip";
import { Process } from "@/components/home/Process";
import { Transformation } from "@/components/pages/Transformation";
import { NextStep } from "@/components/pages/NextStep";
import styles from "@/components/pages/page.module.css";

export const metadata = pageMeta({
  title: "Process",
  description: "Fixed scope, fixed price, a demo every Friday and a production handover in 45 days. How Tech Cogniverse scopes, builds, launches and grows systems.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <PageShell>
      <MapStrip />
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}>Process</p>
          <h1 className={styles.h1}>Fixed scope. Weekly demos. No surprises.</h1>
          <p className={styles.intro}>How we scope, price and ship, and the engineering practices every system we build actually runs on.</p>
        </header>
        <Transformation
          title="From friction to a system you own"
          steps={[
            { label: "A business problem, described plainly", kind: "friction" },
            { label: "Scope: 20-minute call, 2-page proposal, fixed price", kind: "structure" },
            { label: "Build: a demo every Friday", kind: "system" },
            { label: "Launch: deployed, tested, documented, handed over", kind: "action" },
            { label: "Grow: iterations, fixes, monitoring", kind: "system" },
          ]}
        />
      </div>
      <Process />
      <div className="wrap">
        <section className={styles.band} aria-labelledby="practices-title">
          <h2 id="practices-title" className={styles.sectionTitle}>Engineering practices, not a pitch deck</h2>
          <p className={styles.intro}>{PRACTICES_INTRO}</p>
          <div className={styles.cols} style={{ marginTop: 28 }}>
            {PRACTICES.map((p) => (
              <section key={p.title} className={styles.block} data-tone={p.title.startsWith("Human") || p.title.startsWith("Fallback") ? "guard" : undefined}>
                <h2>{p.title}</h2>
                <p style={{ fontSize: 18, color: "var(--graphite)" }}>{p.description}</p>
              </section>
            ))}
          </div>
          <p style={{ marginTop: 24, padding: "18px 20px", borderLeft: "3px solid var(--amber)", background: "var(--ivory)", color: "var(--graphite)", maxWidth: "80ch" }}>{CERTIFICATION_NOTE}</p>
        </section>
      </div>
      <NextStep />
    </PageShell>
  );
}
