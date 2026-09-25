import Footer from "@/components/sections/Footer";
import Navigation from "@/components/sections/Navigation";

interface LegalSection {
  title: string;
  body: string[];
  items?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export default function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="bg-bg-deep pt-[72px]">
        <section className="mx-auto max-w-[960px] px-6 pt-14 pb-10 lg:px-10 lg:pt-16">
          <span className="mb-4 block font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1">
            {eyebrow}
          </span>
          <h1
            className="mb-5 font-display font-[800] leading-[1.08] text-text-primary"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
          >
            {title}
          </h1>
          <p className="max-w-2xl text-[1.05rem] leading-relaxed text-text-secondary sm:text-lg">
            {description}
          </p>
          <p className="mt-5 font-mono text-[0.78rem] text-text-muted">
            Last updated: {updated}
          </p>
        </section>

        <article className="mx-auto max-w-[960px] px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="border-t border-border">
            {sections.map((section) => (
              <section
                key={section.title}
                className="border-b border-border py-7 sm:py-8"
              >
                <h2 className="mb-3 font-display text-[1.25rem] font-[700] leading-tight text-text-primary">
                  {section.title}
                </h2>
                <div className="space-y-3 text-[0.98rem] leading-[1.75] text-text-secondary">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.items && (
                    <ul className="space-y-2 pl-5">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
