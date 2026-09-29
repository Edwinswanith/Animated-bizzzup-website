import styles from "./Stage.module.css";

/** The shared "field sheet" every transformation is drawn on: a hairline frame that completes,
 *  a head naming the real system, and a caption stating what is illustrated. */
export function Stage({ system, note = "Illustration", caption, children, id, bare }: {
  system: string; note?: string; caption: string; children: React.ReactNode; id: string; bare?: boolean;
}) {
  return (
    <figure className={styles.stage} aria-labelledby={`${id}-cap`} data-stage data-bare={bare || undefined}>
      <span aria-hidden="true" className={styles.frame}>
        <span data-edge="x" className={styles.t} />
        <span data-edge="y" className={styles.r} />
        <span data-edge="x" className={styles.b} />
        <span data-edge="y" className={styles.l} />
      </span>
      <div className={styles.head}>
        <span className="mono">{system}</span>
        <span className={`mono ${styles.note}`}>{note}</span>
      </div>
      <div className={styles.body}>{children}</div>
      <figcaption id={`${id}-cap`} className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
