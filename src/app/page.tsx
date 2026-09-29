import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { Chapters } from "@/components/home/Chapters";
import { SystemMap } from "@/components/home/SystemMap";
import { Process } from "@/components/home/Process";
import { Trust } from "@/components/home/Trust";
import { Closing } from "@/components/home/Closing";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Chapters />
        <SystemMap />
        <Process />
        <Trust />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
