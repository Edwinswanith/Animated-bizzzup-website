import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES, serviceBySlug } from "@/content/services";
import { regionById } from "@/content/regions";
import { SERVICE_FLOW } from "@/content/transformations";
import { pageMeta } from "@/lib/site";
import { PageShell } from "@/components/pages/PageShell";
import { RegionBanner } from "@/components/pages/RegionBanner";
import { Transformation } from "@/components/pages/Transformation";
import { NextStep } from "@/components/pages/NextStep";
import { Evidence } from "@/components/site/Evidence";
import styles from "@/components/pages/page.module.css";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.name, description: `${s.headline} ${s.intro}`.slice(0, 158), path: `/services/${s.slug}` });
}

function List({ title, items, tone }: { title: string; items: string[]; tone?: "limit" | "guard" }) {
  if (!items.length) return null;
  return (
    <section className={styles.block} data-tone={tone}>
      <h2>{title}</h2>
      <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </section>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const region = regionById(s.region)!;
  const flow = SERVICE_FLOW[s.slug];
  const siblings = SERVICES.filter((o) => o.region === s.region && o.slug !== s.slug);

  return (
    <PageShell>
      <RegionBanner region={s.region} trail={[{ href: "/services", label: "Services" }, { href: `/services/${s.slug}`, label: s.shortName }]} />
      <div className="wrap">
        <header className={styles.head}>
          <p className={`mono ${styles.kicker}`}><span>Service</span><span>·</span><span>{region.name}</span></p>
          <h1 className={styles.h1}>{s.name}</h1>
          <p className={styles.promise}>{s.headline}</p>
          <p className={styles.intro}>{s.intro}</p>
        </header>
        {flow && <Transformation title={flow.title} steps={flow.steps} />}

        <div className={`${styles.band} ${styles.cols}`}>
          <List title="Who this is for" items={s.fit} />
          <List title="Problems it addresses" items={s.problems} />
          <List title="What we deliver" items={s.deliverables} />
          <List title="Outside the standard scope" items={s.outOfScope} tone="limit" />
          <List title="Technical capabilities" items={s.capabilities} />
          <section className={styles.block}>
            <h2>Integrations and technologies</h2>
            <ul className={styles.chips}>{s.stack.map((t) => <li key={t}>{t}</li>)}</ul>
          </section>
          <List title="What moves the timeline" items={s.timelineFactors} />
          <List title="What moves the price" items={s.pricingFactors} />
          <List title="Security, privacy and human review" items={s.safeguards} tone="guard" />
        </div>

        {s.evidence.length > 0 && (
          <section className={styles.band} aria-labelledby="evidence-title">
            <h2 id="evidence-title" className={styles.sectionTitle}>Where we’ve built this</h2>
            <div className={styles.evGrid}>
              {s.evidence.map((slug) => <Evidence key={slug} slug={slug} />)}
            </div>
          </section>
        )}

        {siblings.length > 0 && (
          <p className={`${styles.band} ${styles.kicker}`}>
            <span className="mono">Also in {region.name}</span>
            {siblings.map((o) => <Link key={o.slug} href={`/services/${o.slug}`} className="link-arrow">{o.name}</Link>)}
          </p>
        )}
      </div>
      <NextStep />
    </PageShell>
  );
}
