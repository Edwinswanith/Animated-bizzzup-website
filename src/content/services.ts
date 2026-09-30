import type { Service } from "./types";

/** The six service pages, in the order they appear on /services. */
export const SERVICES: Service[] = [
  {
    slug: "ai-agent-development",
    name: "AI Agent Development",
    shortName: "AI Agents",
    region: "knowledge",
    headline: "Agents that execute workflows, not just answer questions.",
    intro:
      "We build custom AI agents that carry out multi-step work inside a business: extracting information, routing tasks, coordinating with other systems, and producing structured output a person can act on or approve. Our agent systems use multi-agent orchestration frameworks (CrewAI) to split complex work across specialized agents rather than relying on a single general-purpose prompt. Agents are built to execute defined workflows, not to freely improvise: each agent has a scoped task, a data boundary, and, where the output affects a real decision, a human review checkpoint before anything is finalized.",
    fit: [
      "Teams with a repeatable, multi-step process currently done manually across documents, calls, or records",
      "Operations that need information extracted, classified, or routed from unstructured input (documents, transcripts, conversations)",
      "Businesses that already have a workflow defined and want it executed faster and more consistently, not redesigned from scratch",
    ],
    problems: [
      "Staff time spent manually reading, comparing, or summarizing documents and conversations",
      "Inconsistent handling of repetitive multi-step tasks (intake, triage, follow-up, record-keeping)",
      "Delays caused by information sitting in one system that needs to reach another",
    ],
    deliverables: [
      "A defined agent workflow with scoped tasks per agent (not one open-ended prompt)",
      "Integration with your existing data sources and destination systems",
      "Structured, reviewable output rather than free-form text where the use case requires it",
      "Human review checkpoints on any output that affects a real decision",
    ],
    outOfScope: [
      "Fully autonomous agents that take irreversible actions (payments, deletions, external communications) without a review step, unless explicitly scoped and agreed",
      "General-purpose chatbots with no defined task or workflow",
      "Training or fine-tuning custom foundation models: we orchestrate and ground existing LLMs, we do not train new ones",
    ],
    capabilities: [
      "Multi-agent orchestration with CrewAI: specialized agents for distinct sub-tasks (e.g. comparison, extraction, suggestion, document analysis) coordinated as a crew",
      "LLM orchestration and chaining via LangChain where agents need multi-step reasoning across tools or data sources",
      "Structured output extraction from unstructured input (documents, transcripts, conversations)",
      "Role-based access control so agent actions and data access are scoped server-side, not just hidden in the UI",
    ],
    stack: [
      "Google Gemini",
      "CrewAI",
      "LangChain",
      "Perplexity",
      "Mistral",
      "MongoDB",
      "Docker",
      "Google Cloud Run",
    ],
    timelineFactors: [
      "Number of distinct agent roles/tasks in the workflow",
      "Complexity of the data sources agents need to read from and write to",
      "Whether human review checkpoints require a new review interface or fit into an existing one",
      "Integration surface: how many external systems the agent workflow touches",
    ],
    pricingFactors: [
      "Scope, integrations, AI complexity, and deployment requirements set the final quote, consistent with how every engagement is priced",
      "A Launch Sprint (starting from ₹60k / ~$900, 10 days) can validate a single agent workflow before a larger build",
      "A Core MVP engagement (starting from ₹2.5L / ~$3k, 45 days) fits a full agent-driven feature inside a broader product",
      "Fixed price after a 20-minute scoping call; 50% advance to begin",
    ],
    safeguards: [
      "Role-Based Access Control: scoped permissions enforced server-side, not just in the UI",
      "Human Review Checkpoints: AI output that affects real decisions stays a draft until a person reviews it",
      "Fallback Flows: when an agent step fails or is uncertain, the system degrades to a manual path instead of breaking silently",
      "Data Privacy: client data is scoped and access-controlled, never used to train systems for other clients without agreement",
    ],
    evidence: ["doctor-ai", "lawyer-ai"],
    source: "/services/ai-agent-development",
  },
  {
    slug: "voice-ai-development",
    name: "Voice AI Development",
    shortName: "Voice AI",
    region: "voice",
    headline: "Voice consultations and call routing that transcribe, understand, and act.",
    intro:
      "We build voice AI systems for real-time conversations, not IVR menus, but voice interfaces that route calls, transcribe live, and turn spoken interaction into structured, actionable data. Our flagship implementation is MediConsult's AI-powered voice consultation layer: VAPI handles call routing and voice orchestration, Deepgram provides real-time speech-to-text during live calls, and natural-language commands drive scheduling actions directly from conversation. We also build voice synthesis (text-to-speech and AI dubbing) for content workflows, as in Caption CC's dubbing pipeline. This is a newer part of our practice, currently proven on one flagship healthcare deployment and one media/dubbing pipeline. Evaluate scope with us directly for your use case.",
    fit: [
      "Businesses that handle real-time voice interactions (consultations, bookings, support calls) that currently require manual routing or note-taking",
      "Teams that need spoken content transcribed and turned into structured, searchable records",
      "Content or media workflows that need natural-sounding voice synthesis or dubbing, not just robotic TTS",
    ],
    problems: [
      "Calls that require manual routing to the right person, with no automated triage",
      "No transcript or structured record of what was actually said in a consultation or call",
      "Scheduling and follow-up actions that require someone to listen back and manually enter data",
    ],
    deliverables: [
      "Voice call routing and orchestration configured for your workflow",
      "Real-time speech-to-text transcription during live calls",
      "Natural-language command handling for actions like scheduling directly from conversation",
      "Where relevant: text-to-speech / AI dubbing output for content workflows",
    ],
    outOfScope: [
      "Full IVR phone-tree replacement with no AI component: that's traditional telephony, not what we build",
      "Voice biometrics or speaker-identification security systems",
      "Multi-language real-time interpretation beyond what the underlying STT/TTS providers (Deepgram, ElevenLabs) support",
    ],
    capabilities: [
      "Voice call routing and orchestration via VAPI",
      "Real-time speech-to-text via Deepgram, with live transcription during active calls",
      "Natural-language-to-action handling: converting spoken commands into scheduling and workflow actions",
      "Text-to-speech / AI dubbing via ElevenLabs, including multi-segment audio assembly with FFmpeg",
    ],
    stack: ["VAPI", "Deepgram", "ElevenLabs", "Twilio", "Microsoft Graph", "Socket.IO", "FFmpeg"],
    timelineFactors: [
      "Whether call routing logic needs to integrate with an existing phone/telephony provider",
      "Number of scheduling or downstream actions the voice layer needs to trigger",
      "Whether live transcription needs to feed a real-time UI (as in MediConsult) or can process asynchronously",
    ],
    pricingFactors: [
      "Scope, integrations, AI complexity, and deployment requirements set the final quote",
      "Voice AI typically carries higher integration complexity (telephony, real-time streaming) than the Launch Sprint tier covers, so most voice work fits a Core MVP engagement (45 days) or larger",
      "Fixed price after a 20-minute scoping call; 50% advance to begin",
    ],
    safeguards: [
      "Human Review Checkpoints: automated scheduling actions triggered by voice commands should have a confirmation step for anything consequential",
      "Data Privacy: call transcripts and voice data are scoped and access-controlled",
      "Fallback Flows: if real-time transcription or routing fails, the system should degrade to a manual path rather than dropping the call silently",
    ],
    evidence: ["doctor-ai", "caption-cc", "mediscribe"],
    source: "/services/voice-ai-development",
  },
  {
    slug: "rag-development",
    name: "RAG Development",
    shortName: "RAG & Search",
    region: "knowledge",
    headline: "Retrieval systems that ground AI answers in your own documents and data.",
    intro:
      "We build retrieval-grounded AI systems: platforms where an LLM's answers are backed by search over your actual documents, case records, or captured knowledge, instead of relying on the model's general training alone. Our Legal Assistant platform retrieves relevant case law from the Indian Kanoon database and grounds document analysis in the uploaded files themselves, orchestrated through LangChain across multiple LLM providers. Our Neura platform extracts and indexes founder conversations, voice notes, and meetings into structured, searchable memory. Both patterns (document/case retrieval and conversational-memory retrieval) are the foundation for RAG systems we build for other businesses: knowledge bots, document search, and retrieval systems grounded in client data.",
    fit: [
      "Teams with a large, growing body of internal documents, case files, or records that are hard to search",
      "Businesses that want AI answers grounded in their own data, not generic model knowledge",
      "Anyone accumulating conversations, meetings, or notes that should become searchable, structured knowledge instead of disappearing",
    ],
    problems: [
      "Relevant information exists somewhere in documents or past conversations, but finding it takes manual searching",
      "AI tools give generic answers because they aren't grounded in the business's own data",
      "Institutional knowledge lives in people's heads or scattered notes instead of a searchable system",
    ],
    deliverables: [
      "A retrieval layer over your documents, records, or captured knowledge",
      "LLM-generated answers or summaries grounded in retrieved source material, not just model memory",
      "Structured extraction (tasks, decisions, entities, follow-ups) where the source is conversational rather than document-based",
      "Search and chat interfaces over the resulting knowledge base",
    ],
    outOfScope: [
      "Training or fine-tuning a custom embedding or foundation model: we use established retrieval and LLM providers",
      "Real-time web-scale search: our retrieval systems are grounded in your own data, not general web indexing",
      "Guaranteeing zero hallucination: grounding reduces but does not eliminate the need for human review on high-stakes answers",
    ],
    capabilities: [
      "Document and case-law retrieval integrated directly into an analysis workflow (Legal Assistant + Indian Kanoon API)",
      "Multi-LLM orchestration via LangChain, using different providers for different strengths (Gemini as backbone, Perplexity for research depth)",
      "Conversational and voice-note ingestion, transcription, and structured extraction into searchable memory (Neura)",
      "Vector and structured database setup for retrieval, scoped, indexed, and access-controlled",
    ],
    stack: ["LangChain", "Google Gemini", "Perplexity", "Mistral", "MongoDB"],
    timelineFactors: [
      "Volume and format of the source material to be indexed (documents, transcripts, structured records)",
      "Whether retrieval needs to span multiple LLM providers or a single one",
      "Whether the system needs ongoing ingestion (new documents arriving continuously) or a fixed corpus",
    ],
    pricingFactors: [
      "Scope, integrations, AI complexity, and deployment requirements set the final quote",
      "A Core MVP engagement (45 days) typically fits a first working retrieval system over an initial document set",
      "Fixed price after a 20-minute scoping call; 50% advance to begin",
    ],
    safeguards: [
      "Database & Vector DB Setup: structured databases alongside vector stores for retrieval, scoped, indexed, and access-controlled",
      "Data Privacy: client documents and data are never used to train systems for other clients without agreement",
      "Human Review Checkpoints: retrieval-grounded answers on high-stakes topics (legal, medical, financial) should be reviewed, not auto-published",
    ],
    evidence: ["lawyer-ai", "neura"],
    source: "/services/rag-development",
  },
  {
    slug: "ai-mvp-development",
    name: "AI MVP Development",
    shortName: "AI MVPs",
    region: "products",
    headline: "A working, deployed AI product in a fixed 45-day scope.",
    intro:
      "We build full-stack AI-native MVPs: web and mobile products built around one or two genuinely valuable AI features, taken from idea to a deployed, tested, and documented product. Our flagship engagement model is a fixed-scope, fixed-price 45-day build: a 20-minute scoping call and a 2-page proposal define the scope, weekly Friday demos show real progress instead of a black box, and launch means the product is deployed, tested, documented, and properly handed over. We've shipped MVPs across e-commerce (DesignT), legal tech (Legal Assistant), aviation training (FlightDeck), ML tooling (OptimaFlow), fintech (Kanaka Gold Loan), and health tech (Health Activity Dashboard), each built around a small number of AI features that justify the product, not AI bolted onto everything.",
    fit: [
      "Founders or teams that need to validate a product idea with a real, working build, not a slide deck",
      "Businesses that know the AI feature they want but need the surrounding product (auth, data, UI, deployment) built around it",
      "Teams that want weekly visibility into progress instead of a black-box delivery",
    ],
    problems: [
      "An idea that needs to become a real, testable product before committing to a larger build",
      "AI feature ideas with no surrounding product to put them in front of users",
      "Previous development engagements with unclear scope, silent progress, or missed handover",
    ],
    deliverables: [
      "A deployed, working web and/or mobile product",
      "One or two AI features that are the actual reason the product is valuable, not decoration",
      "Auth, payments (where relevant), and core data flows built around the AI feature",
      "Weekly Friday demos throughout the build",
      "Full handover: deployed, tested, documented",
    ],
    outOfScope: [
      "Open-ended feature scope: the fixed-price model requires a defined scope after the initial scoping call",
      "Ongoing maintenance after launch (covered separately by the Growth Retainer engagement)",
      "Products with no clear AI feature: that's standard custom software (see Custom Business Software)",
    ],
    capabilities: [
      "Full-stack web (Next.js, React) and mobile (React Native, Expo) product builds",
      "One or two focused AI features per MVP: conversational design (DesignT/Gemini Vision), document intelligence (Legal Assistant), visual workflow builders (OptimaFlow)",
      "Cloud deployment on managed infrastructure (Google Cloud Run) with Dockerized, multi-stage builds from day one",
      "CI/CD pipelines so releases are repeatable, not manual",
    ],
    stack: [
      "Next.js",
      "React Native",
      "Google Gemini",
      "Supabase",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Google Cloud Run",
      "Razorpay",
    ],
    timelineFactors: [
      "Number and complexity of the AI features being built around",
      "Whether the product needs web only, mobile only, or both",
      "Payment, auth, or third-party integration requirements",
      "45 days is the standard Core MVP timeline; smaller validations fit the 10-day Launch Sprint",
    ],
    pricingFactors: [
      "Launch Sprint, starting from ₹60k (~$900), 10 days: landing page, waitlist, analytics, one AI feature demo. Validate before you build",
      "Core MVP, starting from ₹2.5L (~$3k), 45 days: full web + mobile app, auth, payments, deploy, 1-2 AI features, weekly demos",
      "Growth Retainer, starting from ₹30k/month (~$450/month): iterations, fixes, monitoring after launch",
      "Fixed price after a 20-minute scoping call; 50% advance to begin; final quote depends on scope, integrations, AI complexity, and deployment requirements",
    ],
    safeguards: [
      "Cloud Deployment: deployed on managed cloud infrastructure, not a laptop demo or local script",
      "CI/CD Pipelines: automated build, test, and deploy so releases are repeatable",
      "Monitoring & Logging: request tracing, error logging, and audit trails from launch",
      "Data Privacy: client data scoped and access-controlled from day one",
    ],
    evidence: ["designt", "lawyer-ai", "optimaflow", "health-dashboard", "apex", "nutrition"],
    source: "/services/ai-mvp-development",
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    shortName: "Automation",
    region: "operations",
    headline: "Server-side rules and automated flows for the repetitive parts of running a business.",
    intro:
      "We automate the repeatable operational workflows inside a business: scheduling, approvals, stock and inventory tracking, document lifecycles, and multi-step processes that currently rely on someone manually pushing each step forward. Our Saloon Management System automates point-of-sale, inventory (with automatic stock reduction and low-stock alerts), staff attendance and commission tracking, and reporting across multiple branches. Kanaka Gold Loan automates the borrower application lifecycle: eligibility estimation, KYC, appointment scheduling, and server-side rate/fee/repayment calculations. MediConsult automates appointment scheduling with calendar sync and a multi-step prescription lifecycle. We build automation as explicit server-side rules and state machines, not fragile scripts, so the logic is auditable and doesn't silently break.",
    fit: [
      "Multi-location or multi-branch operations that need consistent process execution across locations",
      "Businesses with multi-step approval, application, or lifecycle processes currently tracked manually or in spreadsheets",
      "Teams losing time to manual data entry, stock tracking, or status updates that could be rule-driven",
    ],
    problems: [
      "Manual tracking of stock, staff attendance, or multi-step approvals across locations",
      "Application or request lifecycles (loans, prescriptions, bookings) that require manual status updates at each stage",
      "Inconsistent process execution when the same workflow is run by different people or at different branches",
    ],
    deliverables: [
      "Defined workflow states and transitions (a state machine, not ad-hoc status fields)",
      "Server-side business rules: calculations, validations, and triggers that don't depend on a person remembering the correct sequence",
      "Automated notifications and status updates as a workflow progresses",
      "Reporting and dashboards showing the operational data the automation produces",
    ],
    outOfScope: [
      "Fully unattended financial transactions with no approval step: server-side rules calculate and validate, but consequential actions get a review point where warranted",
      "Replacing a business's operational judgment entirely: automation executes defined rules, it doesn't make novel business decisions",
      "Integration with legacy on-premise systems with no API surface, unless specifically scoped",
    ],
    capabilities: [
      "Explicit state machines for multi-step processes: Saloon Management runs statuses across services, appointments, and commission calculations",
      "Server-side rule engines for calculations like rate snapshots, LTV, fees, and repayment schedules (Kanaka Gold Loan)",
      "Real-time stock/inventory validation with automatic reduction and threshold alerts",
      "Calendar and scheduling sync (Microsoft Graph / Outlook, as used in MediConsult)",
    ],
    stack: ["MongoDB", "Redis", "Microsoft Graph", "Twilio", "Google Cloud Run", "Docker"],
    timelineFactors: [
      "Number of distinct workflow stages and the rules governing transitions between them",
      "Whether automation needs to sync with external calendars, payment systems, or communication channels",
      "Multi-location/branch scoping requirements if the business operates across sites",
    ],
    pricingFactors: [
      "Scope, integrations, AI complexity, and deployment requirements set the final quote",
      "A Core MVP engagement (45 days) typically fits a first automated workflow covering the highest-impact process",
      "Fixed price after a 20-minute scoping call; 50% advance to begin",
    ],
    safeguards: [
      "Role-Based Access Control: scoped permissions per role (owner, manager, staff), enforced server-side",
      "Monitoring & Logging: audit trails so workflow state changes are traced, not just visible in the current UI state",
      "Fallback Flows: when an automated step fails, the workflow degrades to a manual path instead of breaking silently",
    ],
    evidence: ["saloon", "kanaka-gold-loan", "doctor-ai"],
    source: "/services/workflow-automation",
  },
  {
    slug: "custom-business-software",
    name: "Custom Business Software",
    shortName: "Business Software",
    region: "operations",
    headline: "CRM, POS, billing, and internal tools built around how your business actually runs.",
    intro:
      "We build custom software (CRM, POS, billing, inventory, dashboards, and admin panels) designed around your business's actual operations rather than adapted from a generic off-the-shelf tool. Our Saloon Management System is a live, production multi-branch salon and spa platform combining POS billing, inventory, CRM, staff management, and analytics. MERIDIAN is a global e-commerce and affiliate marketplace platform built as a monorepo with separate storefront, vendor portal, and admin applications. FlightDeck is a role-based aviation training platform for students, mentors, and admins. Each system is built with role-based access control, deployed on managed cloud infrastructure, and shipped with the reporting and admin tooling operators actually need to run the business day to day.",
    fit: [
      "Businesses whose operations don't fit generic off-the-shelf software: multi-branch, multi-role, or with specific compliance/process needs",
      "Operators who need POS, CRM, inventory, or booking systems tailored to their actual workflow",
      "Marketplaces or platforms with multiple distinct user types (customers, vendors, admins) needing separate, purpose-built interfaces",
    ],
    problems: [
      "Generic SaaS tools that don't match how the business actually operates, requiring workarounds",
      "No single system connecting point-of-sale, inventory, staff, and customer data",
      "Multi-role platforms (vendors, customers, admins) that need distinct, properly scoped interfaces rather than one compromise UI",
    ],
    deliverables: [
      "A production system built around your specific operational workflow",
      "Role-based interfaces for each type of user (owner, manager, staff, vendor, customer, admin)",
      "Reporting and analytics dashboards using your actual operational data",
      "Deployment on managed cloud infrastructure with monitoring and logging from day one",
    ],
    outOfScope: [
      "Off-the-shelf SaaS configuration: this is custom-built software, not customizing an existing third-party product",
      "Hardware procurement (though we do integrate with hardware where a project requires it, as in MediScribe's recorder device)",
      "Ongoing operations/business-process consulting beyond the software itself",
    ],
    capabilities: [
      "Multi-application architecture: separate storefront, vendor, and admin apps sharing a common backend and UI kit (MERIDIAN)",
      "Role-based access control with server-side enforcement across owner/manager/staff or vendor/customer/admin roles",
      "POS and billing logic including multi-item checkout, GST invoice generation, and discount approval workflows",
      "Modular backend architecture with domain events and idempotency handling for reliability at scale",
    ],
    stack: [
      "NestJS",
      "PostgreSQL",
      "MongoDB Atlas",
      "Redis",
      "OpenSearch",
      "Razorpay",
      "Docker",
      "Google Cloud Run",
    ],
    timelineFactors: [
      "Number of distinct user roles/interfaces the system needs (e.g. 3 apps in MERIDIAN vs. 1 in Saloon Management)",
      "Complexity of business rules: pricing, discounts, commissions, GST/tax handling",
      "Whether the system needs multi-branch or multi-region scoping from the start",
    ],
    pricingFactors: [
      "Scope, integrations, AI complexity, and deployment requirements set the final quote",
      "A Core MVP engagement (45 days) fits a first production version of a focused system; larger multi-app platforms scope beyond a single engagement",
      "Fixed price after a 20-minute scoping call; 50% advance to begin",
    ],
    safeguards: [
      "Secure API Architecture: authenticated, rate-limited layers separating client, business logic, and data tiers",
      "Role-Based Access Control: scoped permissions per role enforced server-side",
      "Dockerized Services and Cloud Deployment: containerized, multi-stage builds on managed infrastructure",
      "Monitoring & Logging: request tracing and audit trails from launch",
    ],
    evidence: ["saloon", "meridian", "flightdeck"],
    source: "/services/custom-business-software",
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** "Which service fits your problem" on /services */
export const SERVICE_FIT: { problem: string; slug: string }[] = [
  {
    problem: "I have a repeatable multi-step task done manually across documents or calls",
    slug: "ai-agent-development",
  },
  {
    problem: "I handle real-time voice interactions: consultations, bookings, support calls",
    slug: "voice-ai-development",
  },
  {
    problem:
      "I have documents, case files, or records that are hard to search, or want AI answers grounded in our own data",
    slug: "rag-development",
  },
  {
    problem: "I have a product idea and need a real, working build to validate it",
    slug: "ai-mvp-development",
  },
  {
    problem: "I run multi-branch or multi-step operations tracked manually or in spreadsheets",
    slug: "workflow-automation",
  },
  {
    problem: "I need POS, CRM, inventory, or a multi-role platform built around how we actually operate",
    slug: "custom-business-software",
  },
];

export const SERVICES_INTRO =
  "Tech Cogniverse builds AI agents, voice systems, retrieval-grounded search, full AI-native products, workflow automation, and custom business software. Each is a distinct engineering discipline with its own architecture, and this page explains how they differ and which one fits the problem you actually have.";

/** "How these categories actually differ" on /services */
export const HOW_THEY_DIFFER: string[] = [
  "AI agent development and RAG development are often confused because both involve LLMs doing work with data. An agent executes a multi-step task: extracting, comparing, routing. RAG retrieves, grounding an answer in your own documents or records before generating a response. Our Legal Assistant platform uses both together: CrewAI agents handle document comparison and analysis tasks, while case-law retrieval from Indian Kanoon grounds the research output in real precedent.",
  "Voice AI development is a narrower, real-time discipline (call routing, live transcription, and voice synthesis), distinct from text-based agents or retrieval because it has to work within a live conversation, not a batch process.",
  "AI MVP development is a delivery model, not a technology category: it's how we ship a full product (web, mobile, auth, payments) built around one or two of the AI capabilities above, in a fixed 45-day scope.",
  "Workflow automation and custom business software often don't need AI at all: they're explicit, auditable server-side rules and role-based systems (POS, CRM, loan processing, scheduling). Many of our production systems, like Saloon Management System and Kanaka Gold Loan, are built this way, sometimes combined with an AI feature and sometimes not.",
];
