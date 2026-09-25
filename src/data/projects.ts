/**
 * Single source of truth for all project/portfolio content.
 * Consumed by: homepage Projects.tsx (featured carousel), /work (full grid + filters),
 * /work/[slug] (detail pages), and ProjectDetailModal.tsx.
 *
 * Scope note: V-Solv ("Custom Model") and Evvo ("AI Fitness Model") are deliberately
 * omitted — they appear in only one homepage-list variant of the source brief and
 * contradict its own "portfolio page includes all 14 projects" rule. Add them back
 * only if that's a deliberate content decision.
 */

export interface ProjectDetails {
  name: string;
  slug: string;
  tagline: string;
  category: string;
  image: string;
  imageLabel: string;
  image2: string;
  image2Label: string;
  tags: string[];
  liveUrl?: string;
  fullDetails: {
    overview: string;
    highlights: { label: string; value: string }[];
    techStack: { layer: string; tech: string }[];
    sections: { heading: string; body: string }[];
  };

  /** Portfolio-grid / card-level fields (additive, used by /work and homepage). */
  number: string;
  filterCategory:
    | "AI Media" | "E-commerce" | "Healthcare" | "Clinical AI" | "AI Memory"
    | "EdTech" | "Game" | "ML Tooling" | "Marketplace" | "Legal AI" | "Fintech"
    | "Operations" | "SportsTech" | "HealthTech";
  context: string;
  howItWorks: string;
  businessImpact: string;
  status: "Production" | "Production-ready MVP" | "MVP" | "Prototype" | "In Progress" | "Delivered MVP" | "Launched";
  /** Prior/alternate name, shown for clarity on renamed projects (e.g. MediConsult / Doctor AI). */
  akaName?: string;
  client?: string;
  /** True for exactly the 6 projects curated on the homepage. */
  featuredOnHome: boolean;
  /** Shown on the placeholder card when `image` is empty — specific to what the (not-yet-captured) interface actually shows. */
  previewLabel?: string;
  /** Full Case Study = deep highlights/tech-stack/narrative depth. Build Snapshot = lighter treatment, honestly labeled as such. */
  caseStudyTier: "Full Case Study" | "Build Snapshot";

  /**
   * Optional, owner/client-verified evidence fields. All optional by design —
   * render a field on a page ONLY when it's actually populated. Never infer
   * these from marketing copy (`context`/`howItWorks`/`businessImpact` above
   * are architecture description and intended value, not proof of a measured
   * result). See docs/case-study-evidence-needed.md for what's missing per
   * project and the exact questions to ask before filling any of these in.
   */
  evidence?: {
    clientName?: string;
    clientWebsite?: string;
    projectPeriod?: string;
    productionStatus?: string;
    businessProblem?: string;
    baselineProcess?: string;
    baselineMetric?: string;
    /** A specific, sourced, measured result — not a projected/intended benefit. */
    measuredOutcome?: string;
    measurementPeriod?: string;
    sampleSize?: string;
    measurementMethod?: string;
    usageVolume?: string;
    adoptionData?: string;
    limitations?: string;
    humanReviewRequirements?: string;
    /** Only populate with an existing verified source or explicit owner-provided approval. */
    clientQuote?: string;
    clientQuoteSource?: string;
    /** ISO date this evidence block was last reviewed/verified by the owner. */
    evidenceReviewedAt?: string;
  };
}

export const PROJECTS: ProjectDetails[] = [
  {
    name: "Caption CC",
    slug: "caption-cc",
    tagline: "Code-Switching Subtitle Generator",
    image: "/projects/caption-cc.png",
    imageLabel: "Speech-to-Text",
    image2: "/projects/caption-cc-2.png",
    image2Label: "Subtitle Editor",
    tags: ["React 18", "TypeScript", "Vite", "Node.js", "Express", "MongoDB", "Groq Whisper", "Google Gemini", "ElevenLabs", "FFmpeg", "yt-dlp"],
    category: "AI Media",
    fullDetails: {
      overview:
        "Caption CC generates accurate English subtitles from Tamil-English code-switched video, with optional AI dubbing. A 5-stage caption pipeline and 7-stage dubbing pipeline handle everything from download to export, supporting YouTube URLs and direct file uploads up to 500 MB.",
      highlights: [
        { label: "Caption Stages", value: "5" },
        { label: "Dubbing Stages", value: "7" },
        { label: "Max Duration", value: "10 min" },
        { label: "Export Formats", value: "SRT, VTT, MP4" },
      ],
      techStack: [
        { layer: "Frontend", tech: "React 18, TypeScript, Vite, Tailwind CSS" },
        { layer: "Backend", tech: "Node.js 18+, Express, TypeScript" },
        { layer: "Database", tech: "MongoDB: jobs, segments, usage, user_access" },
        { layer: "STT", tech: "Groq Whisper (whisper-large-v3-turbo), ElevenLabs Scribe" },
        { layer: "LLM", tech: "Google Gemini 2.5 Flash: correction + translation" },
        { layer: "TTS / Dub", tech: "ElevenLabs eleven_multilingual_v2" },
        { layer: "Media", tech: "FFmpeg (audio extraction, video merge), yt-dlp (YouTube)" },
        { layer: "Auth", tech: "Google OAuth 2.0 via Passport.js" },
      ],
      sections: [
        {
          heading: "Caption Pipeline",
          body: "Five-stage pipeline: download or upload → FFmpeg extracts WAV (16kHz mono) → Groq Whisper transcribes → Gemini corrects code-switching and translates to English → subtitle generation as SRT, VTT, or burned-in MP4. Subtitle segments are editable in-app before export. Real-time progress via Server-Sent Events.",
        },
        {
          heading: "AI Dubbing Pipeline",
          body: "Seven-stage dubbing flow adds TTS and audio assembly on top of captioning: after translation, ElevenLabs synthesizes each segment, FFmpeg assembles the full audio track, and the dubbed audio is merged back into the video. The final dubbed MP4 is available for one-click download. Timing is best-effort matched to original segment boundaries.",
        },
        {
          heading: "Architecture & Limits",
          body: "Full-stack TypeScript monorepo with npm workspaces (client + server). MongoDB tracks job state, subtitle segments, and usage per user. LLM temperature set to 0.3 with 3 retries and backoff. Supports MP4, MP3, WAV, M4A, MOV, WEBM. Max file size 500 MB, max duration 10 minutes.",
        },
      ],
    },
    number: "01",
    filterCategory: "AI Media",
    context:
      "AI media workflow that converts Tamil-English code-switched videos into English subtitles and optional dubbed video output.",
    howItWorks:
      "Ingests uploaded or YouTube video, extracts clean audio, uses STT, LLM correction, translation, subtitle timing, and media export as one production pipeline. Users can edit generated segments and export SRT, VTT, or burned-in MP4 captions.",
    businessImpact:
      "Cuts manual captioning and translation effort. Expands regional content into English-speaking audiences. Creates reusable subtitle and dubbed media assets for publishing.",
    status: "Production-ready MVP",
    featuredOnHome: true,
    caseStudyTier: "Full Case Study",
  },
  {
    name: "DesignT",
    slug: "designt",
    tagline: "AI T-Shirt Design Studio",
    image: "/projects/designt.png",
    imageLabel: "Design Studio",
    image2: "/projects/designt-2.png",
    image2Label: "Product Landing",
    tags: ["Next.js 15", "App Router", "Tailwind CSS", "Zustand", "TypeScript", "Gemini Vision", "Supabase", "Cloudinary", "Razorpay", "Vercel"],
    category: "E-commerce",
    liveUrl: "https://www.designt.in",
    fullDetails: {
      overview:
        "DesignT is a conversational AI t-shirt design studio powered by Google Gemini Pro Vision. Users describe their idea in natural language, optionally upload reference images, and get instant t-shirt mockups rendered in real time. Designs flow into a complete 4-step e-commerce checkout with Razorpay payment.",
      highlights: [
        { label: "AI Engine", value: "Gemini" },
        { label: "T-Shirt Colors", value: "5" },
        { label: "Size Range", value: "XS–3XL" },
        { label: "Checkout Steps", value: "4" },
      ],
      techStack: [
        { layer: "Frontend", tech: "Next.js 15 App Router, Tailwind CSS, TypeScript" },
        { layer: "State", tech: "Zustand with localStorage persistence" },
        { layer: "AI", tech: "Google Gemini Pro Vision: natural language + image input" },
        { layer: "Database", tech: "Supabase (PostgreSQL): orders, users, design history" },
        { layer: "Media", tech: "Cloudinary: design image storage with optimization" },
        { layer: "Payments", tech: "Razorpay: prepaid (discounted) or Cash on Delivery" },
        { layer: "Hosting", tech: "Vercel with edge functions" },
        { layer: "Tooling", tech: "ESLint + Prettier, conventional commits, CI/CD via Vercel" },
      ],
      sections: [
        {
          heading: "Conversational Design Engine",
          body: "Users describe their design in plain English and Gemini Pro Vision generates it instantly. Up to 3 reference images can be uploaded per conversation for style transfer and visual grounding. Full design history persists across sessions via Zustand + localStorage, and designs can be refined iteratively through natural dialogue, no design tools required.",
        },
        {
          heading: "Product Customization & Preview",
          body: "Five curated t-shirt colors with live preview that updates instantly across all variants. Complete size range from XS to 3XL with detailed fit guides. Precision positioning controls let users adjust design placement and scale on the mockup before committing. Changes render live without page reloads.",
        },
        {
          heading: "E-Commerce Checkout",
          body: "Streamlined 4-step flow: Design → Customize → Details → Payment. Razorpay handles secure payment processing with multiple payment methods. Prepaid orders receive an automatic discount; COD is available for convenience. Orders are tracked in Supabase with status updates. Cloudinary stores and optimizes all design assets.",
        },
      ],
    },
    number: "02",
    filterCategory: "E-commerce",
    context:
      "AI-assisted custom t-shirt studio that turns prompts and reference images into product-ready artwork and mockups.",
    howItWorks:
      "Users describe design intent in plain language, add visual references, generate artwork, preview mockups, refine through conversation, and continue to checkout, payment, and order tracking.",
    businessImpact:
      "Shortens design-to-product cycle. Enables personalized e-commerce without manual designer dependency. Improves conversion through realistic previews.",
    status: "MVP",
    featuredOnHome: false,
    caseStudyTier: "Full Case Study",
  },
  {
    name: "MediConsult",
    akaName: "Doctor AI",
    slug: "doctor-ai",
    tagline: "AI Healthcare Platform",
    image: "/projects/doctor-ai.jpeg",
    imageLabel: "Mobile App",
    image2: "/projects/doctor-ai-2.jpeg",
    image2Label: "Call Automation",
    tags: ["VAPI", "Deepgram", "CrewAI", "Google Gemini", "MongoDB", "Socket.IO", "Microsoft Graph", "Twilio", "React", "Flask"],
    category: "Healthcare",
    fullDetails: {
      overview:
        "MediConsult is a comprehensive healthcare platform that bridges patients and providers through AI-powered voice consultations, intelligent appointment scheduling, automated prescription management, and real-time messaging. It serves as an end-to-end digital healthcare ecosystem combining traditional practice management with AI.",
      highlights: [
        { label: "Feature Modules", value: "10" },
        { label: "AI Voice", value: "VAPI" },
        { label: "Auth Roles", value: "2" },
        { label: "Deployment", value: "Docker" },
      ],
      techStack: [
        { layer: "Voice AI", tech: "VAPI (voice calling + routing), Deepgram (real-time STT)" },
        { layer: "AI / LLM", tech: "Google Generative AI, CrewAI multi-agent workflows" },
        { layer: "Frontend", tech: "React + Material UI, responsive, role-based UI" },
        { layer: "Backend", tech: "Microservices with API Gateway, Socket.IO for real-time" },
        { layer: "Database", tech: "MongoDB (primary) + optional Firestore, GridFS for docs" },
        { layer: "Auth", tech: "Microsoft OAuth 2.0 (patient + doctor roles), JWT sessions" },
        { layer: "Comms", tech: "Twilio (SMS/voice), Microsoft Graph (Outlook calendar sync)" },
        { layer: "Infra", tech: "Docker containerization, horizontally scalable" },
      ],
      sections: [
        {
          heading: "AI Voice Consultations",
          body: "VAPI-integrated voice calling routes patients to available doctors using AI-driven logic. Deepgram provides live transcription during calls. Automated follow-up scheduling and natural language commands for booking make the experience feel conversational rather than clinical.",
        },
        {
          heading: "Scheduling & Prescriptions",
          body: "Real-time availability engine checks doctor schedules across time zones, syncing with Microsoft Outlook via Graph API. Appointment booking, rescheduling, and cancellation trigger background calendar sync. Digital prescriptions flow through a multi-step lifecycle: request, doctor review, approval, PDF generation, and SMS/email delivery.",
        },
        {
          heading: "Multi-Agent & Document Workflows",
          body: "CrewAI orchestrates multi-agent workflows for complex medical tasks: data extraction from conversations, patient record organization, and intelligent task routing. GridFS handles secure document storage with version control. Real-time messaging via Socket.IO connects doctors and patients directly in-app.",
        },
      ],
    },
    number: "03",
    filterCategory: "Healthcare",
    context:
      "Healthcare operations platform for patients and doctors, combining consultation, scheduling, documents, prescriptions, and communication workflows.",
    howItWorks:
      "Supports role-based patient and doctor experiences, voice consultation, appointment scheduling, Microsoft calendar sync, prescriptions, referrals, and messaging. Uses AI agents and automation to reduce administrative load.",
    businessImpact:
      "Reduces repetitive clinic administration. Improves patient-doctor coordination. Creates foundation for virtual healthcare workflows.",
    status: "Production-ready MVP",
    client: "Cogniverse (Rahul, CEO)",
    featuredOnHome: true,
    caseStudyTier: "Full Case Study",
  },
  {
    name: "MediScribe",
    slug: "mediscribe",
    tagline: "Clinical Scribe & Draft Notes",
    image: "/projects/mediscribe.png",
    imageLabel: "Doctor Dashboard",
    image2: "/projects/mediscribe-2.png",
    image2Label: "Consultation Recording",
    tags: ["Clinical AI", "Speech-to-Note", "Hardware"],
    category: "Clinical AI",
    fullDetails: {
      overview:
        "Clinical scribe system that captures patient consultations and converts them into structured draft clinical notes for doctor review.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Combines FastAPI backend, React Native app, and ESP32-S3 recorder hardware. Manages patients, visits, consent, recordings, transcripts, draft notes, meetings, search, and audit logs. AI output remains a draft until doctor review.",
        },
      ],
    },
    number: "04",
    filterCategory: "Clinical AI",
    context:
      "Clinical scribe system that captures patient consultations and converts them into structured draft clinical notes for doctor review.",
    howItWorks:
      "Combines FastAPI backend, React Native app, and ESP32-S3 recorder hardware. Manages patients, visits, consent, recordings, transcripts, draft notes, meetings, search, and audit logs. AI output remains a draft until doctor review.",
    businessImpact:
      "Reduces documentation time. Keeps clinical safety under doctor control. Supports hardware-assisted capture for real consultation environments.",
    status: "In Progress",
    featuredOnHome: true,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "Neura",
    slug: "neura",
    tagline: "Founder Memory Layer",
    image: "/projects/neura.png",
    imageLabel: "Capture & Record",
    image2: "/projects/neura-2.png",
    image2Label: "Memory & Projects",
    tags: ["AI Memory", "Knowledge Graph", "Productivity"],
    category: "AI Memory",
    fullDetails: {
      overview:
        "Founder memory layer that transforms conversations, voice notes, meetings, and WhatsApp inputs into structured searchable intelligence.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Captures audio and external inputs, transcribes and segments source content, extracts tasks, decisions, risks, people, organizations, projects, relationships, and follow-ups. Stores founder-scoped memory for review, search, reminders, and chat.",
        },
      ],
    },
    number: "05",
    filterCategory: "AI Memory",
    context:
      "Founder memory layer that transforms conversations, voice notes, meetings, and WhatsApp inputs into structured searchable intelligence.",
    howItWorks:
      "Captures audio and external inputs, transcribes and segments source content, extracts tasks, decisions, risks, people, organizations, projects, relationships, and follow-ups. Stores founder-scoped memory for review, search, reminders, and chat.",
    businessImpact:
      "Turns scattered conversations into operating memory. Improves recall, follow-up, and task continuity. Creates reusable context for assistants.",
    status: "Delivered MVP",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "FlightDeck",
    slug: "flightdeck",
    tagline: "Aviation Training Platform",
    image: "/projects/flightdeck.png",
    imageLabel: "Student Dashboard",
    image2: "/projects/flightdeck-2.png",
    image2Label: "Study Materials",
    tags: ["EdTech", "Assessments", "Mentorship"],
    category: "EdTech",
    fullDetails: {
      overview:
        "Aviation training platform that brings study content, quizzes, performance tracking, and mentor sessions into one role-based system.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Students access subjects, topics, PDFs, and MCQ quizzes. Mentors manage availability and run video sessions while identity is protected with codenames. Admins manage users, materials, question banks, and content.",
        },
      ],
    },
    number: "06",
    filterCategory: "EdTech",
    context:
      "Aviation training platform that brings study content, quizzes, performance tracking, and mentor sessions into one role-based system.",
    howItWorks:
      "Students access subjects, topics, PDFs, and MCQ quizzes. Mentors manage availability and run video sessions while identity is protected with codenames. Admins manage users, materials, question banks, and content.",
    businessImpact:
      "Centralizes aviation learning. Gives students measurable practice and feedback. Creates a mentor marketplace model without exposing private mentor identity.",
    status: "Delivered MVP",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "Void Runner",
    slug: "void-runner",
    tagline: "Three.js Space Shooter",
    image: "/projects/void-runner.jpeg",
    imageLabel: "Title Screen",
    image2: "/projects/void-runner-2.jpeg",
    image2Label: "Title Screen",
    tags: ["WebGL Game", "Three.js", "Retention"],
    category: "Game",
    fullDetails: {
      overview:
        "Three.js space shooter built around a pressure mechanic where players stay aggressive to escape a rising void boundary.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Mouse movement controls the ship while shooting, dashing, shields, and grazing shape combat. Kills, crystals, upgrades, and mutations reward active play. Campaign, Void Rush, and Endless modes create replay loops.",
        },
      ],
    },
    number: "07",
    filterCategory: "Game",
    context:
      "Three.js space shooter built around a pressure mechanic where players stay aggressive to escape a rising void boundary.",
    howItWorks:
      "Mouse movement controls the ship while shooting, dashing, shields, and grazing shape combat. Kills, crystals, upgrades, and mutations reward active play. Campaign, Void Rush, and Endless modes create replay loops.",
    businessImpact:
      "Creates a browser-based game mechanic with retention potential. Can expand into leaderboards, cosmetics, ads, or premium modes.",
    status: "Delivered MVP",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "OptimaFlow",
    slug: "optimaflow",
    tagline: "Visual ML Workflow Builder",
    image: "/projects/optimaflow.png",
    imageLabel: "ML Workflow Canvas",
    image2: "/projects/optimaflow-2.png",
    image2Label: "Pipeline Templates",
    tags: ["ML Tooling", "Visual Workflows", "Quantization"],
    category: "ML Tooling",
    fullDetails: {
      overview:
        "Visual machine-learning workflow builder focused on training, inference, and quantization experiment design.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Users design workflows on a ReactFlow canvas using data, model, training, validation, utility, and quantization nodes. Backend validates DAGs, expands groups, executes nodes topologically, and tracks status. Supports Tilde quantization variants such as Rect, Spoke, and Fovea.",
        },
      ],
    },
    number: "08",
    filterCategory: "ML Tooling",
    context:
      "Visual machine-learning workflow builder focused on training, inference, and quantization experiment design.",
    howItWorks:
      "Users design workflows on a ReactFlow canvas using data, model, training, validation, utility, and quantization nodes. Backend validates DAGs, expands groups, executes nodes topologically, and tracks status. Supports Tilde quantization variants such as Rect, Spoke, and Fovea.",
    businessImpact:
      "Makes ML workflow construction accessible. Improves reproducibility. Accelerates comparison of quantization approaches.",
    status: "Delivered MVP",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "MERIDIAN",
    slug: "meridian",
    tagline: "Global E-Commerce Platform",
    image: "/projects/meridian.jpeg",
    imageLabel: "Storefront",
    image2: "/projects/meridian-2.jpeg",
    image2Label: "Admin Console",
    tags: ["NestJS", "Next.js", "PostgreSQL", "OpenSearch", "BullMQ", "Redis", "TypeScript", "Docker", "Turborepo", "Nginx"],
    category: "Marketplace",
    liveUrl: "https://ecommerce-api-895210689446.europe-west2.run.app",
    fullDetails: {
      overview:
        "MERIDIAN is a global e-commerce affiliate and marketplace platform built for vendors to sell physical products or redirect buyers to external merchants. Launched in Saudi Arabia with a multi-country schema from day one, built as a monorepo with 8 workspace packages, 4 applications, 12 domain modules, and ~111 API endpoints.",
      highlights: [
        { label: "API Endpoints", value: "~111" },
        { label: "DB Entities", value: "30" },
        { label: "State Machines", value: "9" },
        { label: "Unit Tests", value: "~400" },
      ],
      techStack: [
        { layer: "Backend", tech: "NestJS 10, TypeORM, SQLite (dev) / PostgreSQL (prod)" },
        { layer: "Frontend", tech: "Next.js 14: Storefront, Vendor Portal, Admin Panel" },
        { layer: "Search", tech: "OpenSearch 2.13 (derived read model, per-country index)" },
        { layer: "Queue", tech: "BullMQ + Redis 7: 9 queues (search-index, email, order, etc.)" },
        { layer: "Storage", tech: "S3-compatible (MinIO for dev)" },
        { layer: "Auth", tech: "JWT + Refresh Tokens (Passport.js), bcrypt, 7 RBAC roles" },
        { layer: "Monorepo", tech: "pnpm workspaces + Turborepo" },
        { layer: "Infra", tech: "Docker, Nginx reverse proxy (4 upstreams)" },
      ],
      sections: [
        {
          heading: "Modular Backend Architecture",
          body: "Single NestJS application with 12 bounded-context modules communicating via domain events (EventEmitter2). Port/Adapter pattern isolates payment and shipping integrations, designed for Stripe/HyperPay and Aramex/DHL without coupling business logic to vendor APIs. Idempotency keys prevent duplicate orders, payments, and refunds.",
        },
        {
          heading: "Three-App Frontend + Shared UI Kit",
          body: "Customer storefront (15 routes), vendor portal (17 routes), and admin panel (16 routes), all sharing a 25+ component UI kit with SWR data fetching, 5 hooks, and 3 providers. Each app has its own design system: the storefront uses Cormorant Garamond and gold accents; the vendor portal uses dark sidebar with indigo accents.",
        },
        {
          heading: "Commerce & Inventory Logic",
          body: "9 explicit state machines control every status transition: products, offers, orders, payments, shipments, reviews, and eligibility. Stock is reserved on order creation and released on cancellation. Cart items are re-validated at checkout. Prices are snapshotted at order time. Reviews are gated to verified purchases within a 90-day window.",
        },
      ],
    },
    number: "09",
    filterCategory: "Marketplace",
    context:
      "Marketplace and affiliate commerce platform for vendors, customers, and administrators across multiple countries.",
    howItWorks:
      "Combines API, storefront, vendor portal, admin panel, shared UI packages, search, queues, storage, and deployment infrastructure. Supports physical product marketplace flows and external merchant affiliate redirects. Uses multi-country data model with Saudi Arabia market focus.",
    businessImpact:
      "Supports multiple revenue models from one platform. Scales vendor operations with admin and portal tooling. Provides foundation for regional marketplace expansion.",
    status: "Launched",
    featuredOnHome: true,
    caseStudyTier: "Full Case Study",
  },
  {
    name: "Legal Assistant",
    akaName: "Lawyer AI",
    slug: "lawyer-ai",
    tagline: "Legal Document Intelligence",
    image: "/projects/lawyer-ai.png",
    imageLabel: "OCR & Translation",
    image2: "/projects/lawyer-ai-2.png",
    image2Label: "Welcome Portal",
    tags: ["React 19", "Vite", "Flask", "CrewAI", "LangChain", "Google Gemini", "Perplexity", "Mistral", "SQLite", "Google OAuth"],
    category: "Legal AI",
    liveUrl: "https://legal-assistant-frontend-895210689446.us-central1.run.app",
    fullDetails: {
      overview:
        "Legal Assistant is an AI-powered legal platform for document analysis, research, and case discovery. Multi-agent CrewAI workflows handle specialized tasks (document comparison, content extraction, OCR/translation, and case law search), backed by Gemini, Perplexity, and Mistral as LLM providers.",
      highlights: [
        { label: "AI Crews", value: "4+" },
        { label: "LLM Providers", value: "3" },
        { label: "Input Types", value: "PDF + Image" },
        { label: "Case Database", value: "Indian Kanoon" },
      ],
      techStack: [
        { layer: "Frontend", tech: "React 19, Vite, MUI + React Bootstrap, Axios" },
        { layer: "Backend", tech: "Python 3.10+, Flask, Flask-Session, Flask-Limiter" },
        { layer: "AI Agents", tech: "CrewAI (4 crews: compare, list, suggestion, PDF)" },
        { layer: "LLMs", tech: "Google Gemini (primary), Perplexity (research), Mistral (OCR)" },
        { layer: "Orchestration", tech: "LangChain: agent coordination and chain management" },
        { layer: "Database", tech: "SQLAlchemy: SQLite (dev) / PostgreSQL (prod)" },
        { layer: "Auth", tech: "Google OAuth, JWT, Flask sessions" },
        { layer: "Case Law", tech: "Indian Kanoon API integration" },
      ],
      sections: [
        {
          heading: "Document Analysis & Chat",
          body: "Users upload legal documents and interact via chat to extract clauses, summaries, risks, and obligations. OCR handles scanned PDFs and images via Mistral. The comparison module diffs two documents side-by-side, highlighting additions, deletions, and structural changes. Translation supports multilingual legal text.",
        },
        {
          heading: "Multi-Agent CrewAI Workflows",
          body: "Four specialized CrewAI crews handle distinct tasks: document comparison, content listing, suggestion generation, and PDF analysis. Each crew runs as an autonomous multi-agent system with Gemini as the backbone LLM and Perplexity providing real-time research depth for case law and legal precedent.",
        },
        {
          heading: "Case Law Discovery",
          body: "Indian Kanoon API integration lets lawyers search relevant case law by topic or citation directly within the platform. Perplexity deepens research by surfacing additional context and analysis. Results are presented alongside the active document for side-by-side legal research without switching tools.",
        },
      ],
    },
    number: "10",
    filterCategory: "Legal AI",
    context:
      "Platform for legal professionals with document analysis, legal research, case discovery, OCR, translation, comparison, and AI chat.",
    howItWorks:
      "Users upload legal documents, ask questions, compare files, and search case context. AI agents combine document understanding with external legal research sources. Supports OCR, translation, chatbot workflows, and structured document analysis.",
    businessImpact:
      "Speeds legal research and first-pass review. Extracts insight from long documents. Improves preparation for case strategy and document comparison.",
    status: "Delivered MVP",
    featuredOnHome: true,
    caseStudyTier: "Full Case Study",
  },
  {
    name: "Kanaka Gold Loan",
    slug: "kanaka-gold-loan",
    tagline: "Digital Gold & Silver Loan Platform",
    image: "/projects/kanaka-gold-loan.png",
    imageLabel: "Loan Application Tracking",
    image2: "/projects/kanaka-gold-loan-2.png",
    image2Label: "Gold Loan Calculator",
    tags: ["Fintech", "Secured Lending", "Compliance"],
    category: "Fintech",
    fullDetails: {
      overview:
        "Digitizes borrower and admin journey for pledge-backed gold and silver loans.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Borrowers estimate eligibility, apply, complete KYC, upload documents, select appointments, track status, and repay loans. Admins review users, applications, documents, rates, payments, loan records, exports, and operational metrics. Server-side rules handle rate snapshots, LTV calculations, fees, GST, and repayment schedules.",
        },
      ],
    },
    number: "11",
    filterCategory: "Fintech",
    context:
      "Digitizes borrower and admin journey for pledge-backed gold and silver loans.",
    howItWorks:
      "Borrowers estimate eligibility, apply, complete KYC, upload documents, select appointments, track status, and repay loans. Admins review users, applications, documents, rates, payments, loan records, exports, and operational metrics. Server-side rules handle rate snapshots, LTV calculations, fees, GST, and repayment schedules.",
    businessImpact:
      "Reduces friction in secured-loan acquisition. Improves borrower transparency. Enables centralized review and operations at scale.",
    status: "Delivered MVP",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "Saloon Management System",
    slug: "saloon",
    tagline: "Salon Management System",
    image: "/projects/saloon.jpeg",
    imageLabel: "Staff Dashboard",
    image2: "/projects/saloon-2.jpeg",
    image2Label: "Growth Analytics",
    tags: ["React 18", "Vite", "Ant Design", "Zustand", "Flask", "MongoDB Atlas", "Redis", "Google Cloud Run", "Docker"],
    category: "Operations",
    liveUrl: "https://saloon-management-system-895210689446.europe-west2.run.app",
    fullDetails: {
      overview:
        "Saloon Management System is a production multi-branch salon and spa management system: POS billing, inventory, CRM, staff management, appointment scheduling, and business analytics in one app. Live on Google Cloud Run with 7 branches, 600+ customers, and 1,000+ transaction records.",
      highlights: [
        { label: "Branches", value: "7" },
        { label: "Customers", value: "600+" },
        { label: "DB Collections", value: "30+" },
        { label: "Version", value: "v20" },
      ],
      techStack: [
        { layer: "Frontend", tech: "React 18 + Vite, Ant Design 6, Zustand, TanStack Query" },
        { layer: "Charts", tech: "Recharts, React Hook Form, Framer Motion, Day.js" },
        { layer: "Backend", tech: "Flask 3, MongoEngine ODM, PyJWT + bcrypt auth" },
        { layer: "Database", tech: "MongoDB Atlas (cloud), 30+ collections" },
        { layer: "Cache", tech: "Redis 5 (optional, in-memory fallback)" },
        { layer: "PDF", tech: "ReportLab: GST invoice generation" },
        { layer: "Deploy", tech: "Google Cloud Run (europe-west2), Docker multi-stage build" },
        { layer: "Auth", tech: "JWT: Owner, Manager, Staff roles with branch isolation" },
      ],
      sections: [
        {
          heading: "Point of Sale & Inventory",
          body: "Multi-item billing supports services, packages, products, memberships, and prepaid balances in a single checkout. Stock validates in real time: products disable when out of stock, low-stock alerts fire at ≤5 units, and quantities reduce automatically on sale. Discount requests require manager approval via a coded approval workflow. PDF invoices include GST breakdown.",
        },
        {
          heading: "Staff & Customer Management",
          body: "Staff profiles track attendance (check-in/out), leave requests, temporary cross-branch assignments, and commission earnings per sale. Customer records accumulate visit history, total spend, and loyalty data. Leads and missed enquiries feed into a follow-up pipeline. Service recovery tracks complaints through resolution.",
        },
        {
          heading: "Analytics & Reporting",
          body: "Dashboard surfacing KPI cards, revenue trends, service sales analysis, staff performance leaderboards, customer lifecycle segmentation, and client value metrics. All reports support custom date ranges and can be filtered per branch. Expense tracking categorizes operational costs alongside revenue for profit analysis.",
        },
      ],
    },
    number: "12",
    filterCategory: "Operations",
    context:
      "Operations platform for multi-branch salon and spa businesses.",
    howItWorks:
      "Covers POS, appointments, CRM, inventory, staff, attendance, commissions, finance, expenses, and analytics. Role-based access supports owners, managers, and staff across branch-scoped workflows. Dashboards and reports show performance, customers, stock, and revenue.",
    businessImpact:
      "Unifies day-to-day salon operations. Improves inventory and staff control. Makes branch performance measurable.",
    status: "Production",
    client: "Priya Natural Care",
    featuredOnHome: true,
    caseStudyTier: "Full Case Study",
  },
  {
    name: "Apex",
    slug: "apex",
    tagline: "Sports Coaching & Readiness Platform",
    image: "/projects/apex.png",
    imageLabel: "Role Selection",
    image2: "/projects/apex-2.png",
    image2Label: "Daily Check-In & Readiness",
    tags: ["SportsTech", "Readiness", "Mobile-first"],
    category: "SportsTech",
    fullDetails: {
      overview:
        "Mobile-first sports coaching and readiness platform for athletics academies.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Coaches, athletes, and guardians work around daily check-ins, attendance, session plans, RPE, recovery, and feedback. The system converts training and wellness data into readiness indicators and risk flags. Access control scopes coach, athlete, and guardian data correctly.",
        },
      ],
    },
    number: "13",
    filterCategory: "SportsTech",
    context:
      "Mobile-first sports coaching and readiness platform for athletics academies.",
    howItWorks:
      "Coaches, athletes, and guardians work around daily check-ins, attendance, session plans, RPE, recovery, and feedback. The system converts training and wellness data into readiness indicators and risk flags. Access control scopes coach, athlete, and guardian data correctly.",
    businessImpact:
      "Gives coaches squad-level triage and faster intervention signals. Improves athlete accountability. Turns academy operations into measurable performance workflows.",
    status: "In Progress",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "Nutrition",
    slug: "nutrition",
    tagline: "AI-Assisted Weight Management",
    image: "/projects/nutrition.png",
    imageLabel: "Progress Dashboard",
    image2: "/projects/nutrition-2.png",
    image2Label: "Meal Logging",
    previewLabel: "Progress dashboard preview",
    tags: ["HealthTech", "Behavior Change", "AI Coach"],
    category: "HealthTech",
    fullDetails: {
      overview:
        "AI-assisted weight management application designed around adherence, recovery, and sustainable behavior change.",
      highlights: [],
      techStack: [],
      sections: [
        {
          heading: "How It Works",
          body: "Backend rules own calorie targets, macro splits, recovery mode, scoring, safety floors, and daily recomputation. AI supports meal classification, coach conversation, and phrasing, while health-critical targets remain deterministic. Recovery Mode reduces intensity after low-engagement days and pauses streaks instead of resetting them.",
        },
      ],
    },
    number: "14",
    filterCategory: "HealthTech",
    context:
      "AI-assisted weight management application designed around adherence, recovery, and sustainable behavior change.",
    howItWorks:
      "Backend rules own calorie targets, macro splits, recovery mode, scoring, safety floors, and daily recomputation. AI supports meal classification, coach conversation, and phrasing, while health-critical targets remain deterministic. Recovery Mode reduces intensity after low-engagement days and pauses streaks instead of resetting them.",
    businessImpact:
      "Supports sustainable adherence instead of guilt-based engagement. Speeds meal logging through AI-assisted recognition. Keeps health logic explainable, auditable, and server-controlled.",
    status: "In Progress",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
  {
    name: "Health Activity Dashboard",
    slug: "health-dashboard",
    tagline: "Cross-Platform Health & Wellness Tracker",
    image: "/projects/health-dashboard.jpeg",
    imageLabel: "Daily Dashboard",
    image2: "/projects/health-dashboard-2.jpeg",
    image2Label: "Heart Rate History",
    tags: ["React Native", "Expo", "Next.js", "MongoDB", "HealthKit", "Health Connect", "Zustand", "Tamagui"],
    category: "HealthTech",
    fullDetails: {
      overview:
        "A cross-platform health activity dashboard built with React Native (Expo) and a Next.js API backend. Users register, complete onboarding, connect a platform health data source, and view heart rate, steps, calories, distance, and wellness scoring on Android, iOS, and Web from a single shared UI codebase.",
      highlights: [
        { label: "Platforms", value: "iOS, Android, Web" },
        { label: "Health Providers", value: "HealthKit + Health Connect" },
        { label: "API Endpoints", value: "9" },
        { label: "Metrics Tracked", value: "8+" },
      ],
      techStack: [
        { layer: "Frontend", tech: "React Native 0.74, Expo 51, React Native Web via Metro" },
        { layer: "Navigation & State", tech: "React Navigation 6, Zustand" },
        { layer: "UI", tech: "Tamagui, Lucide icons, Reanimated, Gifted Charts" },
        { layer: "Backend", tech: "Next.js 14 API routes, MongoDB" },
        { layer: "Auth", tech: "HMAC-signed JWT-style tokens, SHA-256 password hashing" },
        { layer: "Native health APIs", tech: "@kingstinct/react-native-healthkit (iOS), react-native-health-connect (Android)" },
      ],
      sections: [
        {
          heading: "One Health Provider Interface, Three Platforms",
          body: "Screen components never call HealthKit or Health Connect directly. They consume a shared HealthProvider interface (requestPermissions, getTodaySummary, getHeartRateHistory, syncToBackend, and more). Metro resolves the correct platform-specific implementation automatically, so the same dashboard UI renders live Apple Health data on iOS, Health Connect data on Android, and backend-synced data on Web.",
        },
        {
          heading: "Demo Mode Is a First-Class Feature",
          body: "Native health modules are optional dependencies, lazy-loaded inside try/catch. If a module is unavailable or permission is denied, the app falls back to generated demo data automatically, with a clear \"Demo Mode\" label so no one is misled about what they're looking at. This keeps the app fully demoable on any device, including web browsers with no health API access at all.",
        },
        {
          heading: "Sync, Scoring, and History",
          body: "Daily summaries and full day reports (heart rate samples, activity entries) sync to a MongoDB-backed Next.js API over HTTP. A client-side wellness scoring module computes BMI, BMR, and activity/sleep/heart/recovery scores with plain-language insights from profile and metric data. Informational only, not a medical claim.",
        },
      ],
    },
    number: "15",
    filterCategory: "HealthTech",
    context:
      "Cross-platform health dashboard reading Apple Health and Google Health Connect data, with graceful demo-mode fallback and backend sync.",
    howItWorks:
      "Users register, onboard, and connect a platform health data source. A shared HealthProvider interface abstracts HealthKit, Health Connect, and web/demo data behind one API, so the same React Native + Expo UI runs on iOS, Android, and Web. Reports sync to a Next.js + MongoDB backend for history and cross-device viewing.",
    businessImpact:
      "Validates a full cross-platform health data flow (register, connect, view, sync, and browse history) without requiring native hardware pairing. Graceful demo-mode fallback means the product can always be shown, tested, or sold even where native health APIs aren't available.",
    status: "MVP",
    featuredOnHome: false,
    caseStudyTier: "Build Snapshot",
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featuredOnHome);

export const FILTER_CATEGORIES = [
  "All",
  "AI Media",
  "E-commerce",
  "Healthcare",
  "Clinical AI",
  "AI Memory",
  "EdTech",
  "Game",
  "ML Tooling",
  "Marketplace",
  "Legal AI",
  "Fintech",
  "Operations",
  "SportsTech",
  "HealthTech",
] as const;

export function getProjectBySlug(slug: string): ProjectDetails | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
