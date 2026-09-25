/**
 * Single source of truth for standalone service pages (/services, /services/[slug]).
 *
 * Every claim on these pages must trace back to real content elsewhere in this
 * repository: a project in src/data/projects.ts, or existing homepage/process
 * copy (FeatureCards.tsx, chatContext.ts, EngagementModels.tsx, FlagshipProcess.tsx,
 * BuiltForProduction.tsx). Nothing here should assert a stat, client count, or
 * result that isn't already published elsewhere in the codebase.
 */

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetails {
  slug: string;
  name: string;
  /** Short label for nav/footer use. */
  navLabel: string;
  tagline: string;
  /** 70-120 word direct definition, shown near the top of the page. */
  definition: string;
  suitableFor: string[];
  businessProblems: string[];
  deliverables: string[];
  outOfScope: string[];
  technicalCapabilities: string[];
  /** Verified technologies only — must appear in at least one project in projects.ts. */
  integrations: string[];
  timelineFactors: string[];
  pricingFactors: string[];
  /** Subset of BuiltForProduction.tsx practices relevant to this service. */
  securityConsiderations: string[];
  /** Slugs into src/data/projects.ts — must be real, evidence-bearing matches. */
  relatedCaseStudySlugs: string[];
  faqs: ServiceFaq[];
  metaDescription: string;
}

export const SERVICES: ServiceDetails[] = [
  {
    slug: "ai-agent-development",
    name: "AI Agent Development",
    navLabel: "AI Agents",
    tagline: "Agents that execute workflows, not just answer questions.",
    definition:
      "We build custom AI agents that carry out multi-step work inside a business: extracting information, routing tasks, coordinating with other systems, and producing structured output a person can act on or approve. Our agent systems use multi-agent orchestration frameworks (CrewAI) to split complex work across specialized agents rather than relying on a single general-purpose prompt. Agents are built to execute defined workflows, not to freely improvise: each agent has a scoped task, a data boundary, and, where the output affects a real decision, a human review checkpoint before anything is finalized.",
    suitableFor: [
      "Teams with a repeatable, multi-step process currently done manually across documents, calls, or records",
      "Operations that need information extracted, classified, or routed from unstructured input (documents, transcripts, conversations)",
      "Businesses that already have a workflow defined and want it executed faster and more consistently, not redesigned from scratch",
    ],
    businessProblems: [
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
    technicalCapabilities: [
      "Multi-agent orchestration with CrewAI: specialized agents for distinct sub-tasks (e.g. comparison, extraction, suggestion, document analysis) coordinated as a crew",
      "LLM orchestration and chaining via LangChain where agents need multi-step reasoning across tools or data sources",
      "Structured output extraction from unstructured input (documents, transcripts, conversations)",
      "Role-based access control so agent actions and data access are scoped server-side, not just hidden in the UI",
    ],
    integrations: ["Google Gemini", "CrewAI", "LangChain", "Perplexity", "Mistral", "MongoDB", "Docker", "Google Cloud Run"],
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
    securityConsiderations: [
      "Role-Based Access Control: scoped permissions enforced server-side, not just in the UI",
      "Human Review Checkpoints: AI output that affects real decisions stays a draft until a person reviews it",
      "Fallback Flows: when an agent step fails or is uncertain, the system degrades to a manual path instead of breaking silently",
      "Data Privacy: client data is scoped and access-controlled, never used to train systems for other clients without agreement",
    ],
    relatedCaseStudySlugs: ["doctor-ai", "lawyer-ai"],
    faqs: [
      {
        question: "Do your agents act autonomously, or is there human oversight?",
        answer:
          "Depends on the workflow. Where agent output affects a real decision (a prescription, a legal document conclusion, a financial record), we build in a human review checkpoint so the AI output stays a draft until someone approves it. Lower-stakes internal routing and extraction can run with less oversight, scoped during the initial call.",
      },
      {
        question: "What's the difference between an 'agent' and a chatbot?",
        answer:
          "A chatbot answers questions. An agent is given a task, executes multi-step work toward it (reading, extracting, comparing, routing), and produces a structured result. Our MediConsult and Legal Assistant projects use CrewAI to split that work across multiple specialized agents rather than one general-purpose assistant.",
      },
      {
        question: "Can an agent workflow connect to our existing systems?",
        answer:
          "Yes. Agent workflows are built to read from and write to the systems you already use where feasible. The integration surface (how many systems, what access patterns) is one of the main factors in scoping and timeline.",
      },
      {
        question: "What happens if the agent gets something wrong?",
        answer:
          "Two layers: first, human review checkpoints on decision-affecting output. Second, fallback flows: if a step fails or the agent is uncertain, the workflow degrades to a manual path rather than producing a silent wrong answer.",
      },
      {
        question: "How long does an agent workflow take to build?",
        answer:
          "It depends on how many agent roles are involved and how many systems they touch. A single-workflow validation can fit a 10-day Launch Sprint; a full multi-agent feature inside a product typically fits the 45-day Core MVP timeline.",
      },
    ],
    metaDescription:
      "Custom AI agent development using multi-agent orchestration (CrewAI, LangChain) for document analysis, extraction, and workflow execution, with human review checkpoints on decisions that matter.",
  },
  {
    slug: "voice-ai-development",
    name: "Voice AI Development",
    navLabel: "Voice AI",
    tagline: "Voice consultations and call routing that transcribe, understand, and act.",
    definition:
      "We build voice AI systems for real-time conversations, not IVR menus, but voice interfaces that route calls, transcribe live, and turn spoken interaction into structured, actionable data. Our flagship implementation is MediConsult's AI-powered voice consultation layer: VAPI handles call routing and voice orchestration, Deepgram provides real-time speech-to-text during live calls, and natural-language commands drive scheduling actions directly from conversation. We also build voice synthesis (text-to-speech and AI dubbing) for content workflows, as in Caption CC's dubbing pipeline. This is a newer part of our practice, currently proven on one flagship healthcare deployment and one media/dubbing pipeline. Evaluate scope with us directly for your use case.",
    suitableFor: [
      "Businesses that handle real-time voice interactions (consultations, bookings, support calls) that currently require manual routing or note-taking",
      "Teams that need spoken content transcribed and turned into structured, searchable records",
      "Content or media workflows that need natural-sounding voice synthesis or dubbing, not just robotic TTS",
    ],
    businessProblems: [
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
    technicalCapabilities: [
      "Voice call routing and orchestration via VAPI",
      "Real-time speech-to-text via Deepgram, with live transcription during active calls",
      "Natural-language-to-action handling: converting spoken commands into scheduling and workflow actions",
      "Text-to-speech / AI dubbing via ElevenLabs, including multi-segment audio assembly with FFmpeg",
    ],
    integrations: ["VAPI", "Deepgram", "ElevenLabs", "Twilio", "Microsoft Graph", "Socket.IO", "FFmpeg"],
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
    securityConsiderations: [
      "Human Review Checkpoints: automated scheduling actions triggered by voice commands should have a confirmation step for anything consequential",
      "Data Privacy: call transcripts and voice data are scoped and access-controlled",
      "Fallback Flows: if real-time transcription or routing fails, the system should degrade to a manual path rather than dropping the call silently",
    ],
    relatedCaseStudySlugs: ["doctor-ai", "caption-cc", "mediscribe"],
    faqs: [
      {
        question: "Is this an IVR / phone-tree system?",
        answer:
          "No. We build AI-driven voice routing and transcription: the call is answered and understood by an AI layer that routes it and can act on spoken instructions, rather than a fixed press-1-for-sales menu.",
      },
      {
        question: "What's your experience with voice AI specifically?",
        answer:
          "Honestly: it's currently proven on one flagship deployment (MediConsult, a healthcare platform using VAPI for call routing and Deepgram for real-time transcription) plus a separate text-to-speech/dubbing pipeline in Caption CC. We're confident in the architecture; talk to us directly about how it maps to your specific use case.",
      },
      {
        question: "Can the voice layer trigger real actions, like booking an appointment?",
        answer:
          "Yes. MediConsult uses natural-language commands during a call to drive scheduling actions. Any action with real consequences should include a confirmation step, which we scope in during planning.",
      },
      {
        question: "Do you build voice synthesis / AI dubbing too?",
        answer:
          "Yes, separately from live call handling. Caption CC uses ElevenLabs for multi-language text-to-speech and dubbing, assembled with FFmpeg into final video output.",
      },
    ],
    metaDescription:
      "Voice AI development: real-time call routing (VAPI), live speech-to-text (Deepgram), and natural-language scheduling actions, plus text-to-speech and AI dubbing for content workflows.",
  },
  {
    slug: "rag-development",
    name: "RAG Development",
    navLabel: "RAG & Search",
    tagline: "Retrieval systems that ground AI answers in your own documents and data.",
    definition:
      "We build retrieval-grounded AI systems: platforms where an LLM's answers are backed by search over your actual documents, case records, or captured knowledge, instead of relying on the model's general training alone. Our Legal Assistant platform retrieves relevant case law from the Indian Kanoon database and grounds document analysis in the uploaded files themselves, orchestrated through LangChain across multiple LLM providers. Our Neura platform extracts and indexes founder conversations, voice notes, and meetings into structured, searchable memory. Both patterns (document/case retrieval and conversational-memory retrieval) are the foundation for RAG systems we build for other businesses: knowledge bots, document search, and retrieval systems grounded in client data.",
    suitableFor: [
      "Teams with a large, growing body of internal documents, case files, or records that are hard to search",
      "Businesses that want AI answers grounded in their own data, not generic model knowledge",
      "Anyone accumulating conversations, meetings, or notes that should become searchable, structured knowledge instead of disappearing",
    ],
    businessProblems: [
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
    technicalCapabilities: [
      "Document and case-law retrieval integrated directly into an analysis workflow (Legal Assistant + Indian Kanoon API)",
      "Multi-LLM orchestration via LangChain, using different providers for different strengths (Gemini as backbone, Perplexity for research depth)",
      "Conversational and voice-note ingestion, transcription, and structured extraction into searchable memory (Neura)",
      "Vector and structured database setup for retrieval, scoped, indexed, and access-controlled",
    ],
    integrations: ["LangChain", "Google Gemini", "Perplexity", "Mistral", "MongoDB"],
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
    securityConsiderations: [
      "Database & Vector DB Setup: structured databases alongside vector stores for retrieval, scoped, indexed, and access-controlled",
      "Data Privacy: client documents and data are never used to train systems for other clients without agreement",
      "Human Review Checkpoints: retrieval-grounded answers on high-stakes topics (legal, medical, financial) should be reviewed, not auto-published",
    ],
    relatedCaseStudySlugs: ["lawyer-ai", "neura"],
    faqs: [
      {
        question: "What is RAG, in plain terms?",
        answer:
          "Retrieval-Augmented Generation: instead of an AI model answering purely from what it learned during training, the system first retrieves relevant material from your own documents or data, then generates an answer grounded in that retrieved material. It's why Legal Assistant can cite actual case law instead of guessing.",
      },
      {
        question: "Does this eliminate AI hallucination?",
        answer:
          "It reduces it significantly by grounding answers in real source material, but it doesn't eliminate the need for review on high-stakes output. We build human review checkpoints in wherever the answer affects a real decision.",
      },
      {
        question: "Can it search across multiple document types?",
        answer:
          "Yes. Legal Assistant handles PDFs and scanned images (via OCR), and Neura ingests voice notes, meeting recordings, and conversational input. The retrieval architecture is designed around your actual source formats.",
      },
      {
        question: "Do you use one AI provider or several?",
        answer:
          "Depends on the use case. Legal Assistant orchestrates three, coordinated through LangChain because different providers are stronger at different sub-tasks: Gemini as the primary backbone, Perplexity for research-grade retrieval, and Mistral for OCR.",
      },
    ],
    metaDescription:
      "RAG development: retrieval-grounded AI systems for document search, case-law research, and conversational knowledge, built with LangChain and multi-LLM orchestration (Gemini, Perplexity, Mistral).",
  },
  {
    slug: "ai-mvp-development",
    name: "AI MVP Development",
    navLabel: "AI MVPs",
    tagline: "A working, deployed AI product in a fixed 45-day scope.",
    definition:
      "We build full-stack AI-native MVPs: web and mobile products built around one or two genuinely valuable AI features, taken from idea to a deployed, tested, and documented product. Our flagship engagement model is a fixed-scope, fixed-price 45-day build: a 20-minute scoping call and a 2-page proposal define the scope, weekly Friday demos show real progress instead of a black box, and launch means the product is deployed, tested, documented, and properly handed over. We've shipped MVPs across e-commerce (DesignT), legal tech (Legal Assistant), aviation training (FlightDeck), ML tooling (OptimaFlow), fintech (Kanaka Gold Loan), and health tech (Health Activity Dashboard), each built around a small number of AI features that justify the product, not AI bolted onto everything.",
    suitableFor: [
      "Founders or teams that need to validate a product idea with a real, working build, not a slide deck",
      "Businesses that know the AI feature they want but need the surrounding product (auth, data, UI, deployment) built around it",
      "Teams that want weekly visibility into progress instead of a black-box delivery",
    ],
    businessProblems: [
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
    technicalCapabilities: [
      "Full-stack web (Next.js, React) and mobile (React Native, Expo) product builds",
      "One or two focused AI features per MVP: conversational design (DesignT/Gemini Vision), document intelligence (Legal Assistant), visual workflow builders (OptimaFlow)",
      "Cloud deployment on managed infrastructure (Google Cloud Run) with Dockerized, multi-stage builds from day one",
      "CI/CD pipelines so releases are repeatable, not manual",
    ],
    integrations: ["Next.js", "React Native", "Google Gemini", "Supabase", "MongoDB", "PostgreSQL", "Docker", "Google Cloud Run", "Razorpay"],
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
    securityConsiderations: [
      "Cloud Deployment: deployed on managed cloud infrastructure, not a laptop demo or local script",
      "CI/CD Pipelines: automated build, test, and deploy so releases are repeatable",
      "Monitoring & Logging: request tracing, error logging, and audit trails from launch",
      "Data Privacy: client data scoped and access-controlled from day one",
    ],
    relatedCaseStudySlugs: ["designt", "lawyer-ai", "optimaflow", "health-dashboard", "apex", "nutrition"],
    faqs: [
      {
        question: "What exactly do I get after 45 days?",
        answer:
          "A deployed, tested, and documented product with the AI feature(s) working end to end, not a prototype or a demo environment. Handover includes the deployment, documentation, and a working system, following the same process we've used across projects like DesignT, Legal Assistant, and FlightDeck.",
      },
      {
        question: "What if I'm not sure the idea is worth a full MVP yet?",
        answer:
          "That's what the 10-day Launch Sprint is for: a landing page, waitlist, analytics, and one AI feature demo to validate interest before committing to the 45-day build.",
      },
      {
        question: "How is scope decided?",
        answer:
          "A 20-minute scoping call, followed by a 2-page proposal with fixed scope and fixed price. 50% advance to begin. The final quote depends on scope, integrations, AI complexity, and deployment requirements.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Launch includes deployment, testing, documentation, and handover. If you want ongoing iteration, fixes, and monitoring after that, the Growth Retainer (from ₹30k/month) covers it.",
      },
      {
        question: "Do you build the whole product or just the AI part?",
        answer:
          "The whole product: auth, payments where relevant, core data flows, and the AI feature(s) that make it valuable. The AI feature is the reason the product exists, not something added afterward.",
      },
    ],
    metaDescription:
      "AI MVP development: fixed-scope, fixed-price 45-day builds for full-stack web and mobile products with one or two focused AI features, from idea to deployed, tested handover.",
  },
  {
    slug: "workflow-automation",
    name: "Workflow Automation",
    navLabel: "Automation",
    tagline: "Server-side rules and automated flows for the repetitive parts of running a business.",
    definition:
      "We automate the repeatable operational workflows inside a business: scheduling, approvals, stock and inventory tracking, document lifecycles, and multi-step processes that currently rely on someone manually pushing each step forward. Our Saloon Management System automates point-of-sale, inventory (with automatic stock reduction and low-stock alerts), staff attendance and commission tracking, and reporting across multiple branches. Kanaka Gold Loan automates the borrower application lifecycle: eligibility estimation, KYC, appointment scheduling, and server-side rate/fee/repayment calculations. MediConsult automates appointment scheduling with calendar sync and a multi-step prescription lifecycle. We build automation as explicit server-side rules and state machines, not fragile scripts, so the logic is auditable and doesn't silently break.",
    suitableFor: [
      "Multi-location or multi-branch operations that need consistent process execution across locations",
      "Businesses with multi-step approval, application, or lifecycle processes currently tracked manually or in spreadsheets",
      "Teams losing time to manual data entry, stock tracking, or status updates that could be rule-driven",
    ],
    businessProblems: [
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
    technicalCapabilities: [
      "Explicit state machines for multi-step processes: Saloon Management runs statuses across services, appointments, and commission calculations",
      "Server-side rule engines for calculations like rate snapshots, LTV, fees, and repayment schedules (Kanaka Gold Loan)",
      "Real-time stock/inventory validation with automatic reduction and threshold alerts",
      "Calendar and scheduling sync (Microsoft Graph / Outlook, as used in MediConsult)",
    ],
    integrations: ["MongoDB", "Redis", "Microsoft Graph", "Twilio", "Google Cloud Run", "Docker"],
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
    securityConsiderations: [
      "Role-Based Access Control: scoped permissions per role (owner, manager, staff), enforced server-side",
      "Monitoring & Logging: audit trails so workflow state changes are traced, not just visible in the current UI state",
      "Fallback Flows: when an automated step fails, the workflow degrades to a manual path instead of breaking silently",
    ],
    relatedCaseStudySlugs: ["saloon", "kanaka-gold-loan", "doctor-ai"],
    faqs: [
      {
        question: "Is this the same as an AI agent?",
        answer:
          "Related but distinct. Workflow automation is explicit, deterministic server-side rules and state machines (e.g. loan rate calculations, stock thresholds). AI agents handle less structured, judgment-requiring tasks like document extraction. Many of our builds use both together.",
      },
      {
        question: "Can this scope to multiple branches or locations?",
        answer:
          "Yes. Saloon Management Systems runs across 7 branches with branch-scoped access control, commission tracking, and reporting that can filter per branch or roll up across all of them.",
      },
      {
        question: "What happens if an automated calculation is wrong?",
        answer:
          "Automated rules (rate snapshots, LTV, fees) are built as explicit, testable server-side logic specifically so they're auditable, not black-box scripts. Fallback flows mean a failed automated step degrades to manual handling rather than producing a silent error.",
      },
      {
        question: "Does workflow automation include reporting?",
        answer:
          "Typically yes. Saloon Management's automation feeds dashboards for revenue trends, staff performance, and branch comparisons, since the automated state data is what makes that reporting possible.",
      },
    ],
    metaDescription:
      "Workflow automation for multi-branch operations, loan/application lifecycles, and scheduling, built as auditable server-side state machines and rules, not fragile scripts.",
  },
  {
    slug: "custom-business-software",
    name: "Custom Business Software",
    navLabel: "Business Software",
    tagline: "CRM, POS, billing, and internal tools built around how your business actually runs.",
    definition:
      "We build custom software (CRM, POS, billing, inventory, dashboards, and admin panels) designed around your business's actual operations rather than adapted from a generic off-the-shelf tool. Our Saloon Management System is a live, production multi-branch salon and spa platform combining POS billing, inventory, CRM, staff management, and analytics. MERIDIAN is a global e-commerce and affiliate marketplace platform built as a monorepo with separate storefront, vendor portal, and admin applications. FlightDeck is a role-based aviation training platform for students, mentors, and admins. Each system is built with role-based access control, deployed on managed cloud infrastructure, and shipped with the reporting and admin tooling operators actually need to run the business day to day.",
    suitableFor: [
      "Businesses whose operations don't fit generic off-the-shelf software: multi-branch, multi-role, or with specific compliance/process needs",
      "Operators who need POS, CRM, inventory, or booking systems tailored to their actual workflow",
      "Marketplaces or platforms with multiple distinct user types (customers, vendors, admins) needing separate, purpose-built interfaces",
    ],
    businessProblems: [
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
    technicalCapabilities: [
      "Multi-application architecture: separate storefront, vendor, and admin apps sharing a common backend and UI kit (MERIDIAN)",
      "Role-based access control with server-side enforcement across owner/manager/staff or vendor/customer/admin roles",
      "POS and billing logic including multi-item checkout, GST invoice generation, and discount approval workflows",
      "Modular backend architecture with domain events and idempotency handling for reliability at scale",
    ],
    integrations: ["NestJS", "PostgreSQL", "MongoDB Atlas", "Redis", "OpenSearch", "Razorpay", "Docker", "Google Cloud Run"],
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
    securityConsiderations: [
      "Secure API Architecture: authenticated, rate-limited layers separating client, business logic, and data tiers",
      "Role-Based Access Control: scoped permissions per role enforced server-side",
      "Dockerized Services and Cloud Deployment: containerized, multi-stage builds on managed infrastructure",
      "Monitoring & Logging: request tracing and audit trails from launch",
    ],
    relatedCaseStudySlugs: ["saloon", "meridian", "flightdeck"],
    faqs: [
      {
        question: "How is this different from an AI MVP build?",
        answer:
          "Custom business software doesn't require an AI feature to justify it. It's built around operational needs like POS, inventory, CRM, or multi-role platforms. Some of our custom software does include AI features (Saloon Management's staff/customer tooling), but the value doesn't depend on AI the way an AI MVP does.",
      },
      {
        question: "Can it handle multiple branches or locations?",
        answer:
          "Yes. Saloon Management Systems is live across 7 branches with branch-scoped data and role-based access, plus cross-branch reporting for owners.",
      },
      {
        question: "Do you build separate interfaces for different user types?",
        answer:
          "Where the operation calls for it. MERIDIAN ships three separate applications (customer storefront, vendor portal, admin panel) sharing a backend and component library, each with access scoped to that role.",
      },
      {
        question: "Is this hosted, or do we run it ourselves?",
        answer:
          "We deploy on managed cloud infrastructure (Google Cloud Run) with Dockerized, multi-stage builds, not a laptop demo or local script. Hosting and deployment specifics are scoped during planning.",
      },
    ],
    metaDescription:
      "Custom business software: POS, CRM, inventory, and multi-role platforms built around your actual operations, with role-based access control and production cloud deployment.",
  },
];

export function getServiceBySlug(slug: string): ServiceDetails | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Reverse lookup: which service pages cite a given project as evidence. */
export function getServicesForProject(projectSlug: string): ServiceDetails[] {
  return SERVICES.filter((s) => s.relatedCaseStudySlugs.includes(projectSlug));
}
