import { Suspense } from "react";
import { pageMeta } from "@/lib/site";
import { STATS } from "@/content/company";
import { PageShell } from "@/components/pages/PageShell";
import { MapStrip } from "@/components/pages/MapStrip";
import { WorkIndex } from "@/components/pages/WorkIndex";
import { NextStep } from "@/components/pages/NextStep";
import styles from "@/components/pages/page.module.css";

export const metadata = pageMeta({
  title: "Work",
  description: "Fifteen AI and software builds by Tech Cogniverse across healthcare, legal, commerce, operations, fintech, media and more, with their real status.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <PageShell>
      <MapStrip />
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}>Work · {STATS[0].value} {STATS[0].label} · {STATS[1].value} {STATS[1].label}</p>
          <h1 className={styles.h1}>Every build, with its real status.</h1>
          <p className={styles.intro}>Some projects have full case studies; others are build snapshots. Both are shown, so you see the breadth of what we’ve actually shipped, including what’s still in progress.</p>
        </header>
        <Suspense fallback={null}>
          <WorkIndex />
        </Suspense>
      </div>
      <div style={{ height: 64 }} />
      <NextStep />
    </PageShell>
  );
}
