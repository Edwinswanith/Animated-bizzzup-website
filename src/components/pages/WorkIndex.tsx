"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PROJECTS } from "@/content/projects";
import { REGIONS } from "@/content/regions";
import type { RegionId } from "@/content/types";
import { statusState } from "@/components/site/Evidence";
import styles from "./WorkIndex.module.css";

const STATUS = [
  { id: "live", label: "Live or production-ready", test: (s: string) => ["Production", "Launched", "Production-ready MVP"].includes(s) },
  { id: "mvp", label: "Delivered MVP", test: (s: string) => ["Delivered MVP", "MVP"].includes(s) },
  { id: "progress", label: "In progress", test: (s: string) => s === "In Progress" },
];

export function WorkIndex() {
  const params = useSearchParams();
  const router = useRouter();
  const region = params.get("region") as RegionId | null;
  const status = params.get("status");
  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    router.replace(`/work${next.size ? `?${next}` : ""}`, { scroll: false });
  };
  const list = PROJECTS.filter((p) => (!region || p.region === region) && (!status || STATUS.find((s) => s.id === status)?.test(p.status)));

  return (
    <div>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        <div className={styles.row}>
          <span className="mono">Region</span>
          <button aria-pressed={!region} onClick={() => set("region", null)}>All</button>
          {REGIONS.map((r) => (
            <button key={r.id} aria-pressed={region === r.id} onClick={() => set("region", region === r.id ? null : r.id)}>{r.name}</button>
          ))}
        </div>
        <div className={styles.row}>
          <span className="mono">Status</span>
          <button aria-pressed={!status} onClick={() => set("status", null)}>Any</button>
          {STATUS.map((s) => (
            <button key={s.id} aria-pressed={status === s.id} onClick={() => set("status", status === s.id ? null : s.id)}>{s.label}</button>
          ))}
        </div>
      </div>
      <p className={`mono ${styles.count}`} aria-live="polite">{list.length} of {PROJECTS.length} builds</p>
      <ol className={styles.list}>
        {list.map((p) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className={styles.item}>
              <span className={`mono ${styles.num}`}>{String(PROJECTS.indexOf(p) + 1).padStart(2, "0")}</span>
              <span className={styles.main}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.summary}>{p.summary}</span>
              </span>
              <span className={styles.meta}>
                <span className="mono">{p.category}</span>
                <span className="status" data-state={statusState(p.status)}>{p.status}</span>
                <span className={`mono ${styles.depth}`}>{p.depth === "full" ? "Case study" : "Build snapshot"}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      {!list.length && <p className={styles.empty}>No builds match both filters. <button onClick={() => router.replace("/work")}>Clear filters</button></p>}
    </div>
  );
}
