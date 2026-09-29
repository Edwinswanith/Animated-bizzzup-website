import Link from "next/link";
import { projectBySlug } from "@/content/projects";
import type { ProjectStatus } from "@/content/types";
import styles from "./Evidence.module.css";

export const statusState = (s: ProjectStatus) =>
  s === "In Progress" ? "progress" : s === "Production" || s === "Launched" || s === "Production-ready MVP" ? "live" : undefined;

/** A real project, stated plainly: name, category, status, one line, and its page. */
export function Evidence({ slug, compact }: { slug: string; compact?: boolean }) {
  const p = projectBySlug(slug);
  if (!p) return null;
  return (
    <article className={styles.ev} data-compact={compact || undefined}>
      <div className={styles.meta}>
        <span className="mono">{p.category}</span>
        <span className="status" data-state={statusState(p.status)}>{p.status}</span>
      </div>
      <h3 className={styles.name}>
        <Link href={`/work/${p.slug}`}>{p.name}</Link>
      </h3>
      {!compact && <p className={styles.line}>{p.summary}</p>}
      {p.client && !compact && <p className={`mono ${styles.client}`}>Client · {p.client}</p>}
      <Link href={`/work/${p.slug}`} className="link-arrow" aria-label={`${p.depth === "full" ? "Read the case study" : "View the build"}: ${p.name}`}>
        {p.depth === "full" ? "Read the case study" : "View the build"}
      </Link>
    </article>
  );
}
