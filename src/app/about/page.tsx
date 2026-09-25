import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Team from "@/components/sections/Team";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Bizzzup AI Labs is a Chennai-based AI engineering studio. Meet the team behind every system we ship.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1} className="bg-bg-deep pt-[72px]">
        <section className="relative pt-14 pb-6 sm:pt-16 sm:pb-8">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <span className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent-1 block mb-4">
              About
            </span>
            <h1
              className="font-display font-[800] leading-[1.1] text-text-primary"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
            >
              About Bizzzup AI Labs
            </h1>
          </div>
        </section>
        <Team />
      </main>
      <Footer />
    </>
  );
}
