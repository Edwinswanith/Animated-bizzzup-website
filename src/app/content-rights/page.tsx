import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Content Rights",
  description:
    "Content rights, ownership, and usage terms for Bizzzup AI Labs website content, case studies, screenshots, and brand assets.",
  path: "/content-rights",
});

const sections = [
  {
    title: "Ownership of website content",
    body: [
      "Unless otherwise stated, the text, layout, visual design, case-study presentation, graphics, and original website content on this site belong to Bizzzup AI Labs.",
      "You may view and share links to our pages, but you may not copy, reproduce, scrape, republish, or commercially reuse our website content without written permission.",
      // DRAFT — pending owner/legal approval before this page is deployed. See
      // the GEO content-authority report for why this paragraph was proposed
      // and what it's meant to permit vs. still prohibit.
      "Public search engines and AI answer engines may crawl and index publicly available pages on this website for discovery, search results, short snippets, summarization, and attributed citation, subject to our robots.txt directives and applicable law.",
      "This permission does not authorize bulk extraction, creation of commercial datasets, full-text reproduction, republishing, model training, removal of attribution, or commercial reuse of our content without prior written permission.",
    ],
  },
  {
    title: "Project screenshots and case studies",
    body: [
      "Project names, screenshots, product descriptions, and case-study materials are shown to explain the type of work we build. Some projects may include client-owned marks, interfaces, or business materials.",
      "Client-owned content remains the property of the respective client or rights holder. Displaying a project on this website does not transfer ownership or grant reuse rights to visitors.",
    ],
  },
  {
    title: "Third-party marks",
    body: [
      "Third-party names, logos, frameworks, platforms, and services mentioned on this website belong to their respective owners. References are used for identification, portfolio explanation, or technology context.",
    ],
  },
  {
    title: "AI-generated and assisted content",
    body: [
      "Some website copy, visuals, examples, or supporting material may be drafted or refined with AI-assisted tools and then reviewed before publication. Rights in final published site content are reserved by Bizzzup AI Labs unless otherwise stated.",
    ],
  },
  {
    title: "Corrections and takedown requests",
    body: [
      "If you believe content on this website uses material incorrectly, misrepresents ownership, or should be updated or removed, contact us with the page URL and a short explanation.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For content rights, usage permission, or takedown requests, contact Bizzzup AI Labs at edwinswanith006@gmail.com.",
    ],
  },
];

export default function ContentRightsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Content Rights"
      description="Usage rules for the website content, case studies, screenshots, brand assets, and project material shown by Bizzzup AI Labs."
      updated="July 10, 2026"
      sections={sections}
    />
  );
}
