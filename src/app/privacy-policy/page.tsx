import { PRIVACY } from "@/content/legal";
import { pageMeta } from "@/lib/site";
import { LegalPage } from "@/components/pages/LegalPage";

export const metadata = pageMeta({ title: "Privacy policy", description: "How Tech Cogniverse collects, uses and retains information submitted through this website.", path: "/privacy-policy" });
export default function Page() { return <LegalPage doc={PRIVACY} />; }
