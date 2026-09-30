import Link from "next/link";
import { PageShell } from "@/components/pages/PageShell";
import styles from "@/components/pages/page.module.css";

export default function NotFound() {
  return (
    <PageShell>
      <div className="wrap">
        <header className={styles.head} style={{ minHeight: "50vh" }}>
          <p className={`mono ${styles.kicker}`}>404 · not in the system</p>
          <h1 className={styles.h1}>This page isn’t part of the map.</h1>
          <p style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <Link href="/" className="link-arrow">Back to the start</Link>
            <Link href="/work" className="link-arrow">See the work</Link>
          </p>
        </header>
      </div>
    </PageShell>
  );
}
