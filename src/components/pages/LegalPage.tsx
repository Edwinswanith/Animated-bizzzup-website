import type { LegalDoc } from "@/content/legal";
import { PageShell } from "./PageShell";
import styles from "./page.module.css";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <PageShell>
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}>Legal{doc.updated ? ` · Last updated ${doc.updated}` : ""}</p>
          <h1 className={styles.h1}>{doc.title}</h1>
          {doc.intro && <p className={styles.intro}>{doc.intro}</p>}
        </header>
        <div className={styles.band} style={{ display: "grid", gap: 8, maxWidth: 820 }}>
          {doc.sections.map((s) => (
            <section key={s.heading} className={styles.block}>
              <h2>{s.heading}</h2>
              <div className={styles.prose}>{s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
