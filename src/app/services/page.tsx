import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { SERVICES } from "@/data/services";
import { pageMetadata, absoluteUrl, ORGANIZATION_ID } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "AI agent development, voice AI, RAG, AI MVPs, workflow automation, and custom business software: what Bizzzup AI Labs builds, and how to choose a starting point.",
  path: "/services",
});

const SELECTION_GUIDE = [
  {
    situation: "I have a repeatable multi-step task done manually across documents or calls",
    service: "ai-agent-development",
  },
  {
    situation: "I handle real-time voice interactions: consultations, bookings, support calls",
    service: "voice-ai-development",
  },
  {
    situation: "I have documents, case files, or records that are hard to search, or want AI answers grounded in our own data",
    service: "rag-development",
  },
  {
    situation: "I have a product idea and need a real, working build to validate it",
    service: "ai-mvp-development",
  },
  {
    situation: "I run multi-branch or multi-step operations tracked manually or in spreadsheets",
    service: "workflow-automation",
  },
  {
    situation: "I need POS, CRM, inventory, or a multi-role platform built around how we actually operate",
    service: "custom-business-software",
  },
];

export default function ServicesPage() {
  const pageUrl = absoluteUrl("/services");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
        ],
      },
      ...SERVICES.map((s) => ({
        "@type": "Service",
        "@id": `${absoluteUrl(`/services/${s.slug}`)}#service`,
        name: s.name,
        description: s.metaDescription,
        url: absoluteUrl(`/services/${s.slug}`),
        serviceType: s.name,
        provider: { "@id": ORGANIZATION_ID },
      })),
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
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1 block mb-4">
              Services
            </span>
            <h1
              className="font-display font-[800] leading-[1.1] text-text-primary mb-5"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
            >
              Six ways we build AI-native systems.
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-text-secondary max-w-2xl mb-6">
              Bizzzup AI Labs builds AI agents, voice systems, retrieval-grounded
              search, full AI-native products, workflow automation, and custom
              business software. Each is a distinct engineering discipline with
              its own architecture, and this page explains how they differ and
              which one fits the problem you actually have.
            </p>
          </div>
        </section>

        {/* Category grid */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="clip-corner-card group flex flex-col bg-bg-card border border-border hover:border-border-hover transition-colors duration-200 p-6"
                >
                  <h2 className="font-display font-[800] text-text-primary text-[1.2rem] leading-tight mb-2">
                    {service.name}
                  </h2>
                  <p className="text-accent-2 text-[0.85rem] font-medium mb-3">{service.tagline}</p>
                  <p className="text-[0.85rem] leading-relaxed text-text-secondary line-clamp-3 mb-4">
                    {service.metaDescription}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[0.85rem] font-semibold text-text-primary group-hover:text-accent-2 transition-colors duration-200">
                    Read more
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How the categories differ */}
        <section className="pb-16">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <h2 className="font-display font-[800] text-text-primary mb-5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              How these categories actually differ
            </h2>
            <div className="space-y-5 text-[1rem] leading-relaxed text-text-secondary">
              <p>
                <strong className="text-text-primary">AI agent development</strong> and{" "}
                <strong className="text-text-primary">RAG development</strong> are often
                confused because both involve LLMs doing work with data. An agent
                <em> executes</em> a multi-step task: extracting, comparing, routing.
                RAG <em>retrieves</em>, grounding an answer in your own documents or
                records before generating a response. Our Legal Assistant platform uses
                both together: CrewAI agents handle document comparison and analysis
                tasks, while case-law retrieval from Indian Kanoon grounds the research
                output in real precedent.
              </p>
              <p>
                <strong className="text-text-primary">Voice AI development</strong> is a
                narrower, real-time discipline (call routing, live transcription, and
                voice synthesis), distinct from text-based agents or retrieval because it
                has to work within a live conversation, not a batch process.
              </p>
              <p>
                <strong className="text-text-primary">AI MVP development</strong> is a
                delivery model, not a technology category: it&apos;s how we ship a full
                product (web, mobile, auth, payments) built around one or two of the AI
                capabilities above, in a fixed 45-day scope.
              </p>
              <p>
                <strong className="text-text-primary">Workflow automation</strong> and{" "}
                <strong className="text-text-primary">custom business software</strong>{" "}
                often don&apos;t need AI at all: they&apos;re explicit, auditable server-side
                rules and role-based systems (POS, CRM, loan processing, scheduling).
                Many of our production systems, like Saloon Management System and Kanaka
                Gold Loan, are built this way, sometimes combined with an AI feature and
                sometimes not.
              </p>
            </div>
          </div>
        </section>

        {/* Selection guide */}
        <section className="pb-16">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <h2 className="font-display font-[800] text-text-primary mb-5" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              Which service fits your problem
            </h2>
            <div className="divide-y divide-border border-t border-b border-border">
              {SELECTION_GUIDE.map((row) => (
                <div key={row.service} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4">
                  <p className="text-[0.95rem] text-text-secondary flex-1">{row.situation}</p>
                  <Link
                    href={`/services/${row.service}`}
                    className="shrink-0 inline-flex items-center gap-1.5 font-display text-[0.88rem] font-semibold text-text-primary hover:text-accent-2 transition-colors duration-200"
                  >
                    {SERVICES.find((s) => s.slug === row.service)?.navLabel}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Starting point + next action */}
        <section className="pb-20">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <div className="clip-corner-card bg-bg-card border border-border p-6 sm:p-8">
              <h2 className="font-display font-[800] text-text-primary text-[1.4rem] mb-3">
                Not sure where to start?
              </h2>
              <p className="text-text-secondary mb-5 max-w-xl">
                If you&apos;re validating an idea, start with a 10-day Launch Sprint. If you
                already know the feature or workflow you need built, book a 20-minute
                scoping call and we&apos;ll map it to the right service and a fixed price.
                See the full{" "}
                <Link href="/process" className="text-accent-1 hover:text-accent-2 transition-colors font-medium">
                  process and engagement models
                </Link>{" "}
                or browse{" "}
                <Link href="/work" className="text-accent-1 hover:text-accent-2 transition-colors font-medium">
                  what we&apos;ve shipped
                </Link>{" "}
                for evidence.
              </p>
              <Link
                href="/#contact"
                className="clip-corner-md inline-flex items-center justify-center bg-accent-1 px-6 py-2.5 font-display text-[0.85rem] font-semibold !text-white transition-colors duration-200 hover:bg-accent-1-hover"
              >
                Book an AI audit
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
