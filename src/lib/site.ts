export const SITE = {
  name: "Tech Cogniverse",
  // Set NEXT_PUBLIC_SITE_URL to the production domain; canonical URLs, sitemap and OG use it.
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  title: "Tech Cogniverse · Business friction in, working systems out",
  description:
    "Tech Cogniverse builds AI agents, voice systems, RAG platforms and custom business software. Live in 45 days, fixed price, demo every Friday. Chennai, India.",
};

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }) {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path } };
}
