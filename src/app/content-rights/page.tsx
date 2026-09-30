import { CONTENT_RIGHTS } from "@/content/legal";
import { pageMeta } from "@/lib/site";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata = pageMeta({ title: "Content rights", description: "Ownership of website content, project screenshots and case studies, and how to request corrections.", path: "/content-rights" });
export default function Page() { return <LegalPage doc={CONTENT_RIGHTS} />; }
