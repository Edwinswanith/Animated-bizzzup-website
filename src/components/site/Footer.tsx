import Link from "next/link";
import { COMPANY } from "@/content/company";
import { SERVICES } from "@/content/services";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <p className={styles.statement}>
          Business friction in.<br />
          <em>Working systems out.</em>
        </p>
        <div className={styles.grid}>
          <div>
            <h2 className="mono">Services</h2>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.shortName}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mono">Studio</h2>
            <ul>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/process">Process</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/#friction">Describe your friction</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mono">Contact</h2>
            <ul>
              <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li><a href={`tel:${COMPANY.phone.tel}`}>{COMPANY.phone.display}</a></li>
              {COMPANY.calendly && <li><a href={COMPANY.calendly} rel="noopener" target="_blank">Book a 20-minute call</a></li>}
            </ul>
          </div>
          <div>
            <h2 className="mono">Studio address</h2>
            <address>{COMPANY.address}</address>
          </div>
        </div>
        <div className={styles.base}>
          <span className="mono">© 2024–{new Date().getFullYear()} {COMPANY.name}</span>
          <span className={styles.legal}>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/content-rights">Content rights</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
