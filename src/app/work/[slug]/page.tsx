import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import ProjectMedia from "@/components/ui/ProjectMedia";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { getServicesForProject } from "@/data/services";
import { pageMetadata, absoluteUrl, ORGANIZATION_ID } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.context,
    // built from the resolved project's own slug, not the raw route param
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const relatedServices = getServicesForProject(project.slug);
  const pageUrl = absoluteUrl(`/work/${project.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Work", item: absoluteUrl("/work") },
          { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
        ],
      },
      // SoftwareApplication only for projects with a real, publicly reachable
      // deployment — a liveUrl is verifiable evidence the software actually
      // runs, not a claim we're asserting without support.
      ...(project.liveUrl
        ? [
            {
              "@type": "SoftwareApplication",
              "@id": `${pageUrl}#software`,
              name: project.name,
              description: project.context,
              url: project.liveUrl,
              applicationCategory: project.filterCategory,
              creator: { "@id": ORGANIZATION_ID },
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main" tabIndex={-1} className="bg-bg-deep">
        <article className="mx-auto max-w-[960px] px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:px-10 lg:pb-20">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.72rem] text-text-muted">
              <li><Link href="/" className="hover:text-accent-1 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/work" className="hover:text-accent-1 transition-colors">Work</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-text-secondary" aria-current="page">{project.name}</li>
            </ol>
          </nav>
          <Link
            href="/work"
            className="group mb-6 inline-flex items-center gap-2 font-mono text-[0.85rem] text-text-muted transition-colors duration-200 hover:text-accent-1"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
              &larr;
            </span>
            Back to portfolio
          </Link>

          <div className="clip-corner-case overflow-hidden border border-border bg-bg-card">
            {/* Header */}
            <div className="relative border-b border-border px-5 pt-7 pb-7 sm:px-10 sm:pt-10 sm:pb-9">
              <div className="mb-3 flex items-center flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-accent-1 font-semibold">
                  <span className="block w-4 h-px bg-accent-1/50" />
                  {project.filterCategory}
                </span>
                <span className="rounded-md border border-border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-text-muted">
                  {project.status}
                </span>
                <span
                  className={`rounded-md border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] ${
                    project.caseStudyTier === "Full Case Study"
                      ? "text-accent-1 border-accent-1/40 bg-accent-glow"
                      : "text-text-muted border-border"
                  }`}
                >
                  {project.caseStudyTier}
                </span>
              </div>

              <h1 className="font-display font-[800] text-[clamp(2rem,4vw,2.8rem)] leading-[1.1] text-text-primary tracking-tight mb-1">
                {project.name}
              </h1>
              {project.akaName && (
                <p className="text-text-muted text-[0.85rem] mb-2">formerly {project.akaName}</p>
              )}
              <p className="text-accent-2 text-[1.05rem] font-medium leading-snug">
                {project.tagline}
              </p>
              {project.client && (
                <p className="mt-3 font-mono text-[0.78rem] text-text-muted">
                  Client: {project.client}
                </p>
              )}
            </div>

            {/* Screenshots */}
            <div className="grid grid-cols-1 gap-px border-b border-border bg-border sm:grid-cols-2">
              {[
                { src: project.image, label: project.imageLabel },
                { src: project.image2, label: project.image2Label },
              ].map(({ src, label }) => (
                <div key={label} className="relative h-56 overflow-hidden bg-bg-surface sm:h-80">
                  <ProjectMedia
                    src={src}
                    alt={`${project.name}: ${label}`}
                    label={label}
                    category={project.filterCategory}
                    previewLabel={project.previewLabel}
                    sizes="(max-width: 640px) 90vw, 420px"
                    mode="detail"
                  />
                  <div className="absolute bottom-2 left-2.5">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-bg-card/85 backdrop-blur-sm border border-border text-[0.63rem] font-mono font-medium uppercase tracking-[0.1em] text-text-muted">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="space-y-8 px-5 py-8 sm:space-y-10 sm:px-10 sm:py-10">
              <p className="text-[1.06rem] leading-[1.8] text-text-secondary">
                {project.fullDetails.overview}
              </p>

              {project.fullDetails.highlights.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.fullDetails.highlights.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-md border border-border bg-bg-surface px-4 py-4 text-center"
                    >
                      <p className="font-display font-[800] text-[1.85rem] text-text-primary leading-none mb-2">
                        {value}
                      </p>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-text-muted">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {project.fullDetails.sections.map((section, i) => (
                <div key={section.heading}>
                  {i > 0 && (
                    <div
                      className="h-px mb-8"
                      style={{
                        background:
                          "linear-gradient(to right, var(--color-border), var(--color-border-hover), transparent)",
                      }}
                    />
                  )}
                  <div className="flex items-start gap-4 mb-3.5">
                    <span className="font-mono text-[0.7rem] font-semibold text-accent-1/50 mt-[0.35rem] shrink-0 tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display font-[700] text-text-primary text-[1.28rem] leading-[1.32]">
                      {section.heading}
                    </h2>
                  </div>
                  <p className="pl-0 text-[1rem] leading-[1.8] text-text-secondary sm:pl-8">
                    {section.body}
                  </p>
                </div>
              ))}

              <div className="rounded-md border border-border bg-bg-surface px-5 py-5 sm:px-6 sm:py-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.13em] text-accent-1 font-semibold mb-2.5">
                  {project.evidence?.measuredOutcome ? "Verified Results" : "Operational Value"}
                </p>
                <p className="text-[0.98rem] leading-[1.75] text-text-secondary">
                  {project.evidence?.measuredOutcome ?? project.businessImpact}
                </p>
                {project.evidence?.measuredOutcome && project.evidence.measurementPeriod && (
                  <p className="text-[0.78rem] text-text-muted mt-2">
                    Measured over {project.evidence.measurementPeriod}
                  </p>
                )}
              </div>

              {project.fullDetails.techStack.length > 0 && (
                <div>
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.15em] text-text-muted mb-4">
                    Tech Stack
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.fullDetails.techStack.map(({ layer, tech }) => (
                      <div
                        key={layer}
                        className="flex items-start gap-3 rounded-md border border-border bg-bg-surface px-4 py-3"
                      >
                        <span className="w-24 shrink-0 pt-px font-mono text-[0.7rem] uppercase tracking-wider text-accent-1 leading-snug sm:w-28">
                          {layer}
                        </span>
                        <span className="text-[0.9rem] text-text-secondary leading-snug">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text-muted mb-3.5">
                  Full Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-bg-surface px-3 py-1 font-mono text-[0.72rem] font-medium tracking-wide text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {relatedServices.length > 0 && (
                <div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-text-muted mb-3.5">
                    Related Service{relatedServices.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {relatedServices.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-accent-1/30 bg-accent-glow px-3 py-1.5 font-mono text-[0.72rem] font-medium text-accent-1 hover:border-accent-1/60 transition-colors duration-200"
                      >
                        {service.navLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-border flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4 flex-wrap">
                  <Link
                    href="/work"
                    className="group font-mono text-[0.85rem] text-text-muted inline-flex items-center gap-2 transition-colors duration-200 hover:text-accent-1"
                  >
                    <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
                      &larr;
                    </span>
                    Back to portfolio
                  </Link>
                  <Link
                    href="/process"
                    className="font-mono text-[0.85rem] text-text-muted transition-colors duration-200 hover:text-accent-1"
                  >
                    See our process
                  </Link>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-2.5 font-display text-[0.85rem] font-semibold text-text-primary transition-colors duration-200 hover:border-border-accent hover:bg-bg-card"
                    >
                      View live
                    </a>
                  )}
                  <Link
                    href="/#contact"
                    className="clip-corner-md inline-flex items-center gap-2 bg-accent-1 px-6 py-2.5 font-display text-[0.85rem] font-semibold !text-white transition-colors duration-200 hover:bg-accent-1-hover"
                  >
                    Discuss a similar project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
