import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Bizzzup AI Labs, including how contact, inquiry, and chatbot information may be handled.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information we collect",
    body: [
      "We collect information you choose to share with us, such as your name, email address, company, project details, and messages submitted through contact forms or other direct communication.",
      "If you use interactive features such as the site chatbot, we may process the messages you send so the assistant can respond. We may also receive basic technical information such as IP address, browser type, device information, and request timestamps for security, rate limiting, and service reliability.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "We use submitted information to respond to inquiries, scope projects, operate the website, improve reliability, prevent abuse, and maintain business records related to requested services.",
      "We do not sell personal information. We only share information when needed to operate the website, provide requested services, comply with law, or protect our rights and systems.",
    ],
  },
  {
    title: "Service providers",
    body: [
      "The website may rely on third-party infrastructure and communication providers, including cloud hosting, email delivery, and AI model providers. These providers process information only as needed to support the website and requested services.",
    ],
  },
  {
    title: "Cookies and local storage",
    body: [
      "The site may use essential cookies, browser storage, or similar technologies for basic functionality, security, performance, and user experience. We do not use these tools to sell visitor data.",
    ],
  },
  {
    title: "Retention and deletion",
    body: [
      "We keep information only as long as reasonably needed for business, security, legal, or operational purposes. You can ask us to review, correct, or delete information you previously provided, subject to legal and operational limits.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy questions or deletion requests, contact Bizzzup AI Labs at edwinswanith006@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="A simple summary of how Bizzzup AI Labs handles information submitted through this website."
      updated="July 10, 2026"
      sections={sections}
    />
  );
}
