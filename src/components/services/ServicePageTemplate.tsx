import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ProjectMedia from "@/components/ui/ProjectMedia";
import type { ServiceDetails } from "@/data/services";
import { getProjectBySlug } from "@/data/projects";

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-8 sm:py-10 border-t border-border">
      {eyebrow && (
        <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-accent-1 block mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-[800] text-text-primary leading-[1.2] mb-4" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed text-text-secondary">
          <span className="mt-2 w-1 h-1 rounded-full bg-accent-1 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border border-border bg-bg-surface px-3 py-1 font-mono text-[0.72rem] font-medium tracking-wide text-text-secondary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function ServicePageTemplate({ service }: { service: ServiceDetails }) {
  const relatedCaseStudies = service.relatedCaseStudySlugs
    .map(getProjectBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="bg-bg-deep">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-24 sm:pt-28">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.72rem] text-text-muted">
              <li>
                <Link href="/" className="hover:text-accent-1 transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-accent-1 transition-colors">Services</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary" aria-current="page">{service.name}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-6 pb-8 sm:pb-10">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <h1
              className="font-display font-[800] leading-[1.1] text-text-primary mb-4"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)" }}
            >
              {service.name}
            </h1>
            <p className="text-accent-2 text-[1.05rem] font-medium leading-snug mb-6">
              {service.tagline}
            </p>
            <p className="text-lg leading-relaxed text-text-secondary max-w-[720px]">
              {service.definition}
            </p>
          </div>
        </section>

        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <Section eyebrow="Fit" title="Who this is suitable for">
            <BulletList items={service.suitableFor} />
          </Section>

          <Section eyebrow="Problem" title="Business problems this addresses">
            <BulletList items={service.businessProblems} />
          </Section>

          <Section eyebrow="Delivery" title="What we actually deliver">
            <BulletList items={service.deliverables} />
          </Section>

          <Section eyebrow="Scope" title="What's outside the standard scope">
            <BulletList items={service.outOfScope} />
          </Section>

          <Section eyebrow="Engineering" title="Technical capabilities">
            <BulletList items={service.technicalCapabilities} />
          </Section>

          <Section eyebrow="Stack" title="Integrations and technologies">
            <TagList items={service.integrations} />
          </Section>

          <Section eyebrow="Process" title="Delivery process">
            <p className="text-[0.95rem] leading-relaxed text-text-secondary mb-4">
              Every engagement follows the same fixed-scope process:{" "}
              <Link href="/process" className="text-accent-1 hover:text-accent-2 transition-colors font-medium">
                Scope → Build → Launch → Grow
              </Link>
              . A 20-minute call and a 2-page proposal define fixed scope and price, weekly Friday demos show real progress, and launch means deployed, tested, documented, and handed over.
            </p>
          </Section>

          <Section eyebrow="Timeline" title="What affects the timeline">
            <BulletList items={service.timelineFactors} />
          </Section>

          <Section eyebrow="Investment" title="What affects pricing">
            <BulletList items={service.pricingFactors} />
          </Section>

          <Section eyebrow="Trust" title="Security, privacy, and human review">
            <BulletList items={service.securityConsiderations} />
            <p className="text-[0.85rem] text-text-muted mt-4">
              See the full list of engineering practices on{" "}
              <Link href="/process#built-for-production" className="text-accent-1 hover:text-accent-2 transition-colors">
                Built for Production
              </Link>.
            </p>
          </Section>

          {relatedCaseStudies.length > 0 && (
            <Section eyebrow="Evidence" title="Relevant case studies">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCaseStudies.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="clip-corner-card group flex flex-col overflow-hidden bg-bg-card border border-border hover:border-border-hover transition-colors duration-200"
                  >
                    <div className="relative h-[140px] bg-bg-surface">
                      <ProjectMedia
                        src={project.image}
                        alt={`${project.name}: ${project.imageLabel}`}
                        label={project.imageLabel}
                        category={project.filterCategory}
                        previewLabel={project.previewLabel}
                        sizes="(max-width: 768px) 90vw, 400px"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-[800] text-text-primary text-[1rem] leading-tight mb-1">
                        {project.name}
                      </h3>
                      <p className="text-[0.8rem] text-text-secondary line-clamp-2">{project.context}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </Section>
          )}

          <Section eyebrow="Questions" title="Common questions">
            <div className="space-y-6">
              {service.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-display font-[700] text-text-primary text-[1.02rem] mb-1.5">
                    {faq.question}
                  </h3>
                  <p className="text-[0.92rem] leading-relaxed text-text-secondary">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA + related links */}
          <section className="py-10 sm:py-12 border-t border-border">
            <div className="clip-corner-card bg-bg-card border border-border p-6 sm:p-8 mb-8">
              <h2 className="font-display font-[800] text-text-primary text-[1.4rem] mb-2">
                Talk through your {service.name.toLowerCase()} scope
              </h2>
              <p className="text-text-secondary mb-5">
                Book a 20-minute AI audit call, or explore the surrounding context first.
              </p>
              <Link
                href="/#contact"
                className="clip-corner-md inline-flex items-center justify-center bg-accent-1 px-6 py-2.5 font-display text-[0.85rem] font-semibold !text-white transition-colors duration-200 hover:bg-accent-1-hover"
              >
                Book an AI audit
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.8rem] text-text-muted">
              <Link href="/services" className="hover:text-accent-1 transition-colors">All services</Link>
              <Link href="/work" className="hover:text-accent-1 transition-colors">View work</Link>
              <Link href="/process" className="hover:text-accent-1 transition-colors">Our process</Link>
              <Link href="/about" className="hover:text-accent-1 transition-colors">About</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
