import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import WorkExplorer from "@/components/work/WorkExplorer";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Business Portfolio",
  description:
    "Selected AI and software builds across applied AI, healthcare, fintech, commerce, education, media, operations, and productivity, from concept to deployment.",
  path: "/work",
});

const PROOF = [
  { value: "15", label: "selected builds" },
  { value: "10+", label: "industries covered" },
  { value: "Full-stack", label: "design to deployment" },
];

export default function WorkPage() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="bg-bg-deep">
        <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-12">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1 block mb-4">
              Portfolio
            </span>
            <h1
              className="font-display font-[800] leading-[1.1] text-text-primary mb-5"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
            >
              AI Business Portfolio
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-text-secondary max-w-2xl mb-8">
              Selected AI and software builds across applied AI, healthcare,
              fintech, commerce, education, media, operations, and
              productivity, from concept to deployment.
            </p>

            <div className="mb-2 flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12">
              {PROOF.map((p) => (
                <div key={p.label} className="min-w-[92px]">
                  <p className="font-display font-[800] text-text-primary leading-none mb-1" style={{ fontSize: "1.7rem" }}>
                    {p.value}
                  </p>
                  <p className="text-[0.8rem] text-text-secondary">{p.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative pb-16 lg:pb-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <WorkExplorer />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
