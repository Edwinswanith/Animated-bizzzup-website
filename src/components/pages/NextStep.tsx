import Link from "next/link";
import { COMPANY } from "@/content/company";
import styles from "./page.module.css";

export function NextStep({ title = "Have a friction like this?" }: { title?: string }) {
  return (
    <section className={styles.next} aria-label="Next step">
      <div className={`wrap ${styles.nextGrid}`}>
        <h2 className={styles.nextTitle}>{title} <em>Describe it in plain words.</em></h2>
        <div className={styles.nextActions}>
          <Link href="/#friction" className="btn btn--primary">Describe your friction</Link>
          {COMPANY.calendly ? (
            <a href={COMPANY.calendly} target="_blank" rel="noopener" className="link-arrow">Book a 20-minute call</a>
          ) : (
            <a href={`mailto:${COMPANY.email}`} className="link-arrow">Email us</a>
          )}
        </div>
      </div>
    </section>
  );
}
