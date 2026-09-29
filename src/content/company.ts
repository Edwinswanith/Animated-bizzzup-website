/** Company facts carried over from the previously published website (home, /about, /process, footer). */

export const COMPANY = {
  name: "Tech Cogniverse",
  description:
    "We build AI agents, voice systems, and custom software that run real operations. Chennai, India.",
  founders: ["Suhail", "Edwin Swanith"],
  address: "105, ECR Road, Panaiyur, Chennai 600119, Tamil Nadu, India",
  city: "Chennai, India",
  email: "edwinswanith006@gmail.com",
  phone: { display: "+91 9003 020 030", tel: "+919003020030" },
  calendly: "", // booking link: pending a Tech Cogniverse account
  x: "", // social profile: pending a Tech Cogniverse account
  responseTime: "Typically respond within 24 hours",
  foundedBy:
    "Founded by Suhail and Edwin Swanith, the studio is based at 105, ECR Road, Panaiyur, Chennai 600119, Tamil Nadu, India.",
  officialSite:
    "Tech Cogniverse designs, builds, and runs AI products end to end, including agents, voice systems, RAG platforms, custom software, and full-stack web and mobile products.",
  directAccess:
    "When clients work with Tech Cogniverse, they talk directly to the people designing, building, and deploying the system.",
  source: "/about",
} as const;

export type TeamMember = {
  name: string;
  role?: string;
  bio: string;
  links?: { label: string; href: string }[];
};

export const TEAM: TeamMember[] = [
  {
    name: "Suhail",
    role: "Founder · Principal Design",
    bio: "Orchestrates vision, design systems, and the creative direction behind every Tech Cogniverse product.",
  },
  {
    name: "Edwin Swanith",
    role: "Co-Founder · AI/ML",
    bio: "Architects multi-agent systems and ML pipelines, from research prototypes to production scale.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/edwinswanith/" },
      { label: "GitHub", href: "https://github.com/Edwinswanith?tab=repositories" },
    ],
  },
  {
    name: "Kishore",
    role: "AI Engineer",
    bio: "Builds RAG platforms, fine-tuning workflows, and the inference infrastructure that powers our stack.",
  },
  {
    name: "Vikram",
    bio: "Develops voice interfaces, automation pipelines, and real-time AI integrations across the product suite.",
  },
];

export const PROMISE = {
  eyebrow: "AI Systems & Product Engineering",
  headline: "Your AI system, live in 45 days.",
  subline: "Fixed price. Demo every Friday.",
  rest: "AI agents, voice, RAG, and custom software built for production, not demos.",
} as const;

export const STATS: { value: string; label: string }[] = [
  { value: "15", label: "selected builds" },
  { value: "12", label: "delivered or live" },
  { value: "45 days", label: "fixed delivery window" },
  { value: "10+", label: "industries covered" },
];

export const INDUSTRIES_LINE =
  "Built with teams across healthcare, SaaS, retail operations, fitness technology, and custom ML.";

export const CLIENT_PROOF: string[] = [
  "Priya Natural Care: 7 branches on one operations system",
  "Intuitive Neurons: AI note editor from concept to product",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
  projectSlug?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "[They] took our AI note editor from concept to a working product, with visible progress every single week. They build fast, and they build properly.",
    name: "Conroy Brown",
    role: "Intuitive Neurons",
    project: "AI Note Editor, SaaS MVP",
  },
];

export const PROCESS: { step: string; title: string; description: string }[] = [
  {
    step: "01",
    title: "Scope",
    description:
      "20-minute call, then a 2-page proposal. Fixed scope, fixed price, and 50% advance to begin.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "Demo every Friday. The client watches the product take shape week by week. No black box.",
  },
  {
    step: "03",
    title: "Launch",
    description: "Live in 45 days: deployed, tested, documented, and handed over properly.",
  },
  {
    step: "04",
    title: "Grow",
    description: "Monthly retainer for iterations, fixes, monitoring, and new features after launch.",
  },
];

export const PROCESS_PROMISE = "No hourly billing. No open-ended scope. No disappearing for a month.";

export type EngagementModel = {
  name: string;
  priceINR: string;
  priceUSD: string;
  duration: string;
  included: string[];
  mostPopular: boolean;
};

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    name: "Launch Sprint",
    priceINR: "Starting from ₹60k",
    priceUSD: "From ~$900",
    duration: "10 days",
    included: [
      "Landing page + waitlist",
      "Analytics wired in",
      "One AI feature demo",
      "Validate before you build",
    ],
    mostPopular: false,
  },
  {
    name: "Core MVP",
    priceINR: "Starting from ₹2.5L",
    priceUSD: "From ~$3k",
    duration: "45 days",
    included: ["Web + mobile apps", "Auth, payments, deploy", "1 to 2 AI features", "Weekly Friday demos"],
    mostPopular: true,
  },
  {
    name: "Growth Retainer",
    priceINR: "Starting from ₹30k/month",
    priceUSD: "From ~$450/month",
    duration: "Ongoing",
    included: [
      "Iterations and new features",
      "Fixes and monitoring",
      "Priority response",
      "Keep shipping after launch",
    ],
    mostPopular: false,
  },
];

export const ENGAGEMENT_NOTES: string[] = [
  "Fixed price. 50% advance to start. Final quote after a 20-minute scoping call.",
  "Final quote depends on scope, integrations, AI complexity, and deployment requirements.",
];

export const PRACTICES_INTRO =
  "Every system we ship carries the same production checklist, whether it's a 10-day sprint or a 45-day MVP.";

export const PRACTICES: { title: string; description: string }[] = [
  {
    title: "Secure API Architecture",
    description:
      "Authenticated, rate-limited API layers separating client, business logic, and data tiers.",
  },
  {
    title: "Role-Based Access Control",
    description:
      "Scoped permissions per role (owner, manager, staff, patient, doctor), enforced server-side, not just in the UI.",
  },
  {
    title: "Dockerized Services",
    description:
      "Every system ships as containerized, multi-stage builds for consistent local, staging, and production environments.",
  },
  {
    title: "Cloud Deployment",
    description:
      "Deployed on managed cloud infrastructure (Cloud Run, containerized hosts), not a laptop demo, not a local script.",
  },
  {
    title: "CI/CD Pipelines",
    description:
      "Build, test, and deploy steps automated so releases are repeatable, not manual and error-prone.",
  },
  {
    title: "Monitoring & Logging",
    description:
      "Request tracing, error logging, and audit trails so issues are caught and traced, not discovered by the client first.",
  },
  {
    title: "Database & Vector DB Setup",
    description:
      "Structured databases (PostgreSQL, MongoDB) alongside vector stores for retrieval, scoped, indexed, and access-controlled.",
  },
  {
    title: "Human Review Checkpoints",
    description:
      "AI output that affects real decisions (prescriptions, clinical notes, financial records) stays a draft until a person reviews it.",
  },
  {
    title: "Fallback Flows",
    description:
      "When an AI step fails or is uncertain, systems degrade to a manual path instead of silently breaking.",
  },
  {
    title: "Data Privacy",
    description:
      "Client data is scoped, access-controlled, and never used to train or improve systems for other clients without agreement.",
  },
];

export const CERTIFICATION_NOTE =
  "We don't claim certifications we don't hold. No SOC 2, ISO, HIPAA, or uptime guarantees are stated here unless a specific engagement has been independently audited for them. These are the engineering practices every system is actually built with.";

export const CONTACT_FORM = {
  needs: [
    "AI Agent",
    "RAG / Chatbot",
    "Workflow Automation",
    "Voice AI",
    "Computer Vision",
    "Custom AI App",
    "Business Software",
    "Not sure yet",
  ],
  stages: [
    "Idea",
    "Prototype",
    "Existing product",
    "Need automation",
    "Need AI integration",
    "Need technical audit",
  ],
  budgets: [
    "Under ₹1L (~$1.2k)",
    "₹1L–₹3L ($1.2k–$3.6k)",
    "₹3L–₹5L ($3.6k–$6k)",
    "₹5L+ ($6k+)",
    "Not sure yet",
  ],
} as const;
