import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, projectBySlug } from "@/content/projects";
import { serviceBySlug } from "@/content/services";
import { PROJECT_FLOW, SCREENSHOTS } from "@/content/transformations";
import { pageMeta } from "@/lib/site";
import { PageShell } from "@/components/pages/PageShell";
import { RegionBanner } from "@/components/pages/RegionBanner";
import { Transformation } from "@/components/pages/Transformation";
import { NextStep } from "@/components/pages/NextStep";
import { statusState } from "@/components/site/Evidence";
import styles from "@/components/pages/page.module.css";
import w from "./work.module.css";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name}: ${p.tagline}`, description: p.summary, path: `/work/${p.slug}` });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const i = PROJECTS.indexOf(p);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const shot = p.depth === "full" ? SCREENSHOTS[p.slug] : undefined;
  const flow = PROJECT_FLOW[p.slug];

  return (
    <PageShell>
      <RegionBanner region={p.region} trail={[{ href: "/work", label: "Work" }, { href: `/work/${p.slug}`, label: p.name }]} />
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}>
            <span>{p.category}</span>
            <span className="status" data-state={statusState(p.status)}>{p.status}</span>
            <span>{p.depth === "full" ? "Case study" : "Build snapshot"}</span>
          </p>
          <h1 className={styles.h1}>{p.name}</h1>
          <p className={styles.promise}>{p.tagline}{p.formerly ? <span className={w.formerly}> (formerly {p.formerly})</span> : null}</p>
          {p.client && <p className={`mono ${w.client}`}>Client · {p.client}</p>}
          <p className={styles.intro}>{p.description}</p>
        </header>

        {p.metrics.length > 0 && (
          <dl className={w.metrics}>
            {p.metrics.map((m) => <div key={m.label}><dt className="mono">{m.label}</dt><dd>{m.value}</dd></div>)}
          </dl>
        )}

        {flow && <Transformation title="What the system does" steps={flow} note="Illustrated from the published build facts." />}

        {shot && (
          <figure className={w.shot}>
            <picture>
              <source type="image/avif" srcSet={shot.sizes.map((s) => `/media/work/${shot.file}-${s}.avif ${s}w`).join(", ")} sizes="(min-width: 900px) 760px, 100vw" />
              <source type="image/webp" srcSet={shot.sizes.map((s) => `/media/work/${shot.file}-${s}.webp ${s}w`).join(", ")} sizes="(min-width: 900px) 760px, 100vw" />
              <img src={`/media/work/${shot.file}-1200.jpg`} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" decoding="async" />
            </picture>
            <figcaption className="mono">The real product · screenshot</figcaption>
          </figure>
        )}

        <div className={`${styles.band} ${w.sections}`}>
          {p.sections.map((s, n) => (
            <section key={s.title} className={w.section}>
              <p className={`mono ${w.snum}`}>{String(n + 1).padStart(2, "0")}</p>
              <h2 className={w.stitle}>{s.title}</h2>
              <p className={w.sbody}>{s.body}</p>
            </section>
          ))}
          {p.operationalValue && (
            <section className={`${w.section} ${w.value}`}>
              <p className={`mono ${w.snum}`}>Value</p>
              <h2 className={w.stitle}>Operational value</h2>
              <p className={w.sbody}>{p.operationalValue}</p>
            </section>
          )}
        </div>

        <div className={`${styles.cols} ${w.foot}`}>
          {(p.stack.length > 0 || p.tags.length > 0) && (
            <section className={styles.block}>
              <h2>{p.stack.length ? "Stack" : "Focus"}</h2>
              <ul className={styles.chips}>{(p.stack.length ? p.stack : p.tags).map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          )}
          {p.relatedServices.length > 0 && (
            <section className={styles.block}>
              <h2>Related service</h2>
              <p className={w.related}>
                {p.relatedServices.map((slug) => (
                  <Link key={slug} href={`/services/${slug}`} className="link-arrow">{serviceBySlug(slug)?.name}</Link>
                ))}
              </p>
            </section>
          )}
        </div>
        <p className={w.nextProject}>
          <span className="mono">Next build</span>
          <Link href={`/work/${next.slug}`} className={w.nextName}>{next.name} →</Link>
        </p>
      </div>
      <NextStep title="Building something similar?" />
    </PageShell>
  );
}
