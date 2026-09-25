import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import EngagementModels from "@/components/sections/EngagementModels";
import BuiltForProduction from "@/components/sections/BuiltForProduction";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Process",
  description:
    "How Bizzzup scopes, builds, and ships AI products: fixed scope, weekly demos, and the engineering practices behind every delivery.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="bg-bg-deep">
        <section className="relative pt-28 pb-8 sm:pt-32 sm:pb-10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1 block mb-4">
              How We Work
            </span>
            <h1
              className="font-display font-[800] leading-[1.1] text-text-primary mb-5"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
            >
              Fixed scope. Weekly demos.{" "}
              <span className="whitespace-nowrap">No surprises.</span>
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-text-secondary max-w-2xl">
              How we scope, price, and ship, plus the engineering practices
              every system we build actually runs on.
            </p>
          </div>
        </section>

        <EngagementModels />
        <div className="section-divider" />
        <BuiltForProduction />
      </main>
      <Footer />
    </>
  );
}
