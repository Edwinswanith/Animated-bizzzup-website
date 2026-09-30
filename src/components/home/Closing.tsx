import { COMPANY } from "@/content/company";
import { ContactForm } from "./ContactForm";
import { Anchor } from "@/components/site/Anchor";
import styles from "./Closing.module.css";

export function Closing() {
  return (
    <section id="friction" className={styles.closing} aria-labelledby="friction-title">
      <div className={styles.world} aria-hidden="true">
        <Anchor name="k3" />
      </div>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.lead}>
          <p className="mono">The next input</p>
          <h2 id="friction-title" className={styles.title}>Every system we’ve built started as someone’s friction.</h2>
          <p className={styles.sub}>Tell us yours in plain words. A 20-minute call is enough to scope it and give you a fixed price.</p>
          <dl className={styles.direct}>
            <div><dt className="mono">Email</dt><dd><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd></div>
            <div><dt className="mono">Phone</dt><dd><a href={`tel:${COMPANY.phone.tel}`}>{COMPANY.phone.display}</a></dd></div>
            <div><dt className="mono">Studio</dt><dd>{COMPANY.address}</dd></div>
          </dl>
          <p className={`mono ${styles.resp}`}>{COMPANY.responseTime}</p>
        </div>
        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
