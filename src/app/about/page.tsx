import Link from "next/link";
import { pageMeta } from "@/lib/site";
import { COMPANY, TEAM, INDUSTRIES_LINE } from "@/content/company";
import { REGIONS } from "@/content/regions";
import { PageShell } from "@/components/pages/PageShell";
import { MapStrip } from "@/components/pages/MapStrip";
import { NextStep } from "@/components/pages/NextStep";
import styles from "@/components/pages/page.module.css";
import a from "./about.module.css";

export const metadata = pageMeta({
  title: "About",
  description: "Tech Cogniverse is an AI engineering studio founded by Suhail and Edwin Swanith in Chennai, India.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell>
      <MapStrip />
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}>About · {COMPANY.city}</p>
          <h1 className={styles.h1}>Built by builders.</h1>
          <p className={styles.intro}>{COMPANY.officialSite}</p>
          <p className={styles.intro}>{COMPANY.foundedBy}</p>
        </header>
        <section className={styles.band} aria-labelledby="team-title">
          <h2 id="team-title" className={styles.sectionTitle}>The people you’ll talk to</h2>
          <p className={styles.intro}>{COMPANY.directAccess}</p>
          <ul className={a.team}>
            {TEAM.map((t) => (
              <li key={t.name}>
                <p className={a.name}>{t.name}</p>
                {t.role && <p className={`mono ${a.role}`}>{t.role}</p>}
                <p className={a.bio}>{t.bio}</p>
                {t.links && <p className={a.links}>{t.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener" className="link-arrow">{l.label}</a>)}</p>}
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.band} aria-labelledby="practice-title">
          <h2 id="practice-title" className={styles.sectionTitle}>What we build</h2>
          <p className={styles.intro}>{INDUSTRIES_LINE}</p>
          <ul className={a.regions}>
            {REGIONS.map((r) => (
              <li key={r.id}><span className="mono">{r.name}</span> {r.grammar.join(" → ")}</li>
            ))}
          </ul>
          <p style={{ marginTop: 20 }}><Link href="/work" className="link-arrow">See all fifteen builds</Link></p>
        </section>
      </div>
      <NextStep />
    </PageShell>
  );
}
