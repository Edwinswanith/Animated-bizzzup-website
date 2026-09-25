import type { Metadata } from "next";
import Navigation from "@/components/sections/Navigation";
import ConnectedJourney from "@/components/sections/ConnectedJourney";
import Footer from "@/components/sections/Footer";
import { pageMetadata, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main" tabIndex={-1}>
        {/* The Connected Build: one studio, six chapters, from inputs to the next build */}
        <ConnectedJourney />
      </main>
      <Footer />
    </>
  );
}
