/** Text of the previously published /privacy-policy and /content-rights, with the company name updated. */

export type LegalDoc = {
  title: string;
  updated: string;
  intro?: string;
  sections: { heading: string; paragraphs: string[] }[];
  source: string;
};

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  updated: "July 10, 2026",
  intro:
    "A simple summary of how Tech Cogniverse handles information submitted through this website.",
  sections: [
    {
      heading: "Information we collect",
      paragraphs: [
        "We collect information you choose to share with us, such as your name, email address, company, project details, and messages submitted through contact forms or other direct communication.",
        "If you use interactive features such as the site chatbot, we may process the messages you send so the assistant can respond. We may also receive basic technical information such as IP address, browser type, device information, and request timestamps for security, rate limiting, and service reliability.",
      ],
    },
    {
      heading: "How we use information",
      paragraphs: [
        "We use submitted information to respond to inquiries, scope projects, operate the website, improve reliability, prevent abuse, and maintain business records related to requested services.",
        "We do not sell personal information. We only share information when needed to operate the website, provide requested services, comply with law, or protect our rights and systems.",
      ],
    },
    {
      heading: "Service providers",
      paragraphs: [
        "The website may rely on third-party infrastructure and communication providers, including cloud hosting, email delivery, and AI model providers. These providers process information only as needed to support the website and requested services.",
      ],
    },
    {
      heading: "Cookies and local storage",
      paragraphs: [
        "The site may use essential cookies, browser storage, or similar technologies for basic functionality, security, performance, and user experience. We do not use these tools to sell visitor data.",
      ],
    },
    {
      heading: "Retention and deletion",
      paragraphs: [
        "We keep information only as long as reasonably needed for business, security, legal, or operational purposes. You can ask us to review, correct, or delete information you previously provided, subject to legal and operational limits.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "For privacy questions or deletion requests, contact Tech Cogniverse at edwinswanith006@gmail.com.",
      ],
    },
  ],
  source: "/privacy-policy",
};

export const CONTENT_RIGHTS: LegalDoc = {
  title: "Content Rights",
  updated: "July 10, 2026",
  intro:
    "Usage rules for the website content, case studies, screenshots, brand assets, and project material shown by Tech Cogniverse.",
  sections: [
    {
      heading: "Ownership of website content",
      paragraphs: [
        "Unless otherwise stated, the text, layout, visual design, case-study presentation, graphics, and original website content on this site belong to Tech Cogniverse.",
        "You may view and share links to our pages, but you may not copy, reproduce, scrape, republish, or commercially reuse our website content without written permission.",
        "Public search engines and AI answer engines may crawl and index publicly available pages on this website for discovery, search results, short snippets, summarization, and attributed citation, subject to our robots.txt directives and applicable law.",
        "This permission does not authorize bulk extraction, creation of commercial datasets, full-text reproduction, republishing, model training, removal of attribution, or commercial reuse of our content without prior written permission.",
      ],
    },
    {
      heading: "Project screenshots and case studies",
      paragraphs: [
        "Project names, screenshots, product descriptions, and case-study materials are shown to explain the type of work we build. Some projects may include client-owned marks, interfaces, or business materials.",
        "Client-owned content remains the property of the respective client or rights holder. Displaying a project on this website does not transfer ownership or grant reuse rights to visitors.",
      ],
    },
    {
      heading: "Third-party marks",
      paragraphs: [
        "Third-party names, logos, frameworks, platforms, and services mentioned on this website belong to their respective owners. References are used for identification, portfolio explanation, or technology context.",
      ],
    },
    {
      heading: "AI-generated and assisted content",
      paragraphs: [
        "Some website copy, visuals, examples, or supporting material may be drafted or refined with AI-assisted tools and then reviewed before publication. Rights in final published site content are reserved by Tech Cogniverse unless otherwise stated.",
      ],
    },
    {
      heading: "Corrections and takedown requests",
      paragraphs: [
        "If you believe content on this website uses material incorrectly, misrepresents ownership, or should be updated or removed, contact us with the page URL and a short explanation.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "For content rights, usage permission, or takedown requests, contact Tech Cogniverse at edwinswanith006@gmail.com.",
      ],
    },
  ],
  source: "/content-rights",
};
