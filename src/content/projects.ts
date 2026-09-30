import type { Project } from "./types";

/** All 15 projects, in the order they appear on /work (01–15). */
export const PROJECTS: Project[] = [
  {
    slug: "caption-cc",
    name: "Caption CC",
    tagline: "Code-Switching Subtitle Generator",
    category: "AI Media",
    status: "Production-ready MVP",
    depth: "full",
    region: "voice",
    summary:
      "AI media workflow that converts Tamil-English code-switched videos into English subtitles and optional dubbed video output.",
    description:
      "Caption CC generates accurate English subtitles from Tamil-English code-switched video, with optional AI dubbing. A 5-stage caption pipeline and 7-stage dubbing pipeline handle everything from download to export, supporting YouTube URLs and direct file uploads up to 500 MB.",
    metrics: [
      { value: "5", label: "Caption Stages" },
      { value: "7", label: "Dubbing Stages" },
      { value: "10 min", label: "Max Duration" },
      { value: "SRT, VTT, MP4", label: "Export Formats" },
    ],
    sections: [
      {
        title: "Caption Pipeline",
        body: "Five-stage pipeline: download or upload → FFmpeg extracts WAV (16kHz mono) → Groq Whisper transcribes → Gemini corrects code-switching and translates to English → subtitle generation as SRT, VTT, or burned-in MP4. Subtitle segments are editable in-app before export. Real-time progress via Server-Sent Events.",
      },
      {
        title: "AI Dubbing Pipeline",
        body: "Seven-stage dubbing flow adds TTS and audio assembly on top of captioning: after translation, ElevenLabs synthesizes each segment, FFmpeg assembles the full audio track, and the dubbed audio is merged back into the video. The final dubbed MP4 is available for one-click download. Timing is best-effort matched to original segment boundaries.",
      },
      {
        title: "Architecture & Limits",
        body: "Full-stack TypeScript monorepo with npm workspaces (client + server). MongoDB tracks job state, subtitle segments, and usage per user. LLM temperature set to 0.3 with 3 retries and backoff. Supports MP4, MP3, WAV, M4A, MOV, WEBM. Max file size 500 MB, max duration 10 minutes.",
      },
    ],
    operationalValue:
      "Cuts manual captioning and translation effort. Expands regional content into English-speaking audiences. Creates reusable subtitle and dubbed media assets for publishing.",
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Groq Whisper",
      "Google Gemini",
      "ElevenLabs",
      "FFmpeg",
      "yt-dlp",
    ],
    tags: ["Speech-to-Text", "Subtitle Editor"],
    relatedServices: ["voice-ai-development"],
    source: "/work/caption-cc",
  },
  {
    slug: "designt",
    name: "DesignT",
    tagline: "AI T-Shirt Design Studio",
    category: "E-commerce",
    status: "MVP",
    depth: "full",
    region: "products",
    summary:
      "AI-assisted custom t-shirt studio that turns prompts and reference images into product-ready artwork and mockups.",
    description:
      "DesignT is a conversational AI t-shirt design studio powered by Google Gemini Pro Vision. Users describe their idea in natural language, optionally upload reference images, and get instant t-shirt mockups rendered in real time. Designs flow into a complete 4-step e-commerce checkout with Razorpay payment.",
    metrics: [
      { value: "Gemini", label: "AI Engine" },
      { value: "5", label: "T-Shirt Colors" },
      { value: "XS–3XL", label: "Size Range" },
      { value: "4", label: "Checkout Steps" },
    ],
    sections: [
      {
        title: "Conversational Design Engine",
        body: "Users describe their design in plain English and Gemini Pro Vision generates it instantly. Up to 3 reference images can be uploaded per conversation for style transfer and visual grounding. Full design history persists across sessions via Zustand + localStorage, and designs can be refined iteratively through natural dialogue, no design tools required.",
      },
      {
        title: "Product Customization & Preview",
        body: "Five curated t-shirt colors with live preview that updates instantly across all variants. Complete size range from XS to 3XL with detailed fit guides. Precision positioning controls let users adjust design placement and scale on the mockup before committing. Changes render live without page reloads.",
      },
      {
        title: "E-Commerce Checkout",
        body: "Streamlined 4-step flow: Design → Customize → Details → Payment. Razorpay handles secure payment processing with multiple payment methods. Prepaid orders receive an automatic discount; COD is available for convenience. Orders are tracked in Supabase with status updates. Cloudinary stores and optimizes all design assets.",
      },
    ],
    operationalValue:
      "Shortens design-to-product cycle. Enables personalized e-commerce without manual designer dependency. Improves conversion through realistic previews.",
    stack: [
      "Next.js 15",
      "App Router",
      "Tailwind CSS",
      "Zustand",
      "TypeScript",
      "Gemini Vision",
      "Supabase",
      "Cloudinary",
      "Razorpay",
      "Vercel",
    ],
    tags: ["Design Studio", "Product Landing"],
    relatedServices: ["ai-mvp-development"],
    source: "/work/designt",
  },
  {
    slug: "doctor-ai",
    name: "MediConsult",
    formerly: "Doctor AI",
    tagline: "AI Healthcare Platform",
    category: "Healthcare",
    status: "Production-ready MVP",
    depth: "full",
    region: "voice",
    summary:
      "Healthcare operations platform for patients and doctors, combining consultation, scheduling, documents, prescriptions, and communication workflows.",
    description:
      "MediConsult is a comprehensive healthcare platform that bridges patients and providers through AI-powered voice consultations, intelligent appointment scheduling, automated prescription management, and real-time messaging. It serves as an end-to-end digital healthcare ecosystem combining traditional practice management with AI.",
    metrics: [
      { value: "10", label: "Feature Modules" },
      { value: "VAPI", label: "AI Voice" },
      { value: "2", label: "Auth Roles" },
      { value: "Docker", label: "Deployment" },
    ],
    sections: [
      {
        title: "AI Voice Consultations",
        body: "VAPI-integrated voice calling routes patients to available doctors using AI-driven logic. Deepgram provides live transcription during calls. Automated follow-up scheduling and natural language commands for booking make the experience feel conversational rather than clinical.",
      },
      {
        title: "Scheduling & Prescriptions",
        body: "Real-time availability engine checks doctor schedules across time zones, syncing with Microsoft Outlook via Graph API. Appointment booking, rescheduling, and cancellation trigger background calendar sync. Digital prescriptions flow through a multi-step lifecycle: request, doctor review, approval, PDF generation, and SMS/email delivery.",
      },
      {
        title: "Multi-Agent & Document Workflows",
        body: "CrewAI orchestrates multi-agent workflows for complex medical tasks: data extraction from conversations, patient record organization, and intelligent task routing. GridFS handles secure document storage with version control. Real-time messaging via Socket.IO connects doctors and patients directly in-app.",
      },
    ],
    operationalValue:
      "Reduces repetitive clinic administration. Improves patient-doctor coordination. Creates foundation for virtual healthcare workflows.",
    stack: [
      "Deepgram",
      "CrewAI",
      "Google Gemini",
      "MongoDB",
      "Socket.IO",
      "Microsoft Graph",
      "Twilio",
      "React",
      "Flask",
    ],
    tags: ["Mobile App", "Call Automation"],
    relatedServices: ["ai-agent-development", "workflow-automation"],
    source: "/work/doctor-ai",
  },
  {
    slug: "mediscribe",
    name: "MediScribe",
    tagline: "Clinical Scribe & Draft Notes",
    category: "Clinical AI",
    status: "In Progress",
    depth: "snapshot",
    region: "voice",
    summary:
      "Clinical scribe system that captures patient consultations and converts them into structured draft clinical notes for doctor review.",
    description:
      "Clinical scribe system that captures patient consultations and converts them into structured draft clinical notes for doctor review.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Combines FastAPI backend, React Native app, and ESP32-S3 recorder hardware. Manages patients, visits, consent, recordings, transcripts, draft notes, meetings, search, and audit logs. AI output remains a draft until doctor review.",
      },
    ],
    operationalValue:
      "Reduces documentation time. Keeps clinical safety under doctor control. Supports hardware-assisted capture for real consultation environments.",
    stack: [],
    tags: ["Doctor Dashboard", "Consultation Recording", "Speech-to-Note", "Hardware"],
    relatedServices: ["voice-ai-development"],
    source: "/work/mediscribe",
  },
  {
    slug: "neura",
    name: "Neura",
    tagline: "Founder Memory Layer",
    category: "AI Memory",
    status: "Delivered MVP",
    depth: "snapshot",
    region: "knowledge",
    summary:
      "Founder memory layer that transforms conversations, voice notes, meetings, and WhatsApp inputs into structured searchable intelligence.",
    description:
      "Founder memory layer that transforms conversations, voice notes, meetings, and WhatsApp inputs into structured searchable intelligence.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Captures audio and external inputs, transcribes and segments source content, extracts tasks, decisions, risks, people, organizations, projects, relationships, and follow-ups. Stores founder-scoped memory for review, search, reminders, and chat.",
      },
    ],
    operationalValue:
      "Turns scattered conversations into operating memory. Improves recall, follow-up, and task continuity. Creates reusable context for assistants.",
    stack: [],
    tags: ["Capture & Record", "Memory & Projects", "Knowledge Graph", "Productivity"],
    relatedServices: ["rag-development"],
    source: "/work/neura",
  },
  {
    slug: "flightdeck",
    name: "FlightDeck",
    tagline: "Aviation Training Platform",
    category: "EdTech",
    status: "Delivered MVP",
    depth: "snapshot",
    region: "operations",
    summary:
      "Aviation training platform that brings study content, quizzes, performance tracking, and mentor sessions into one role-based system.",
    description:
      "Aviation training platform that brings study content, quizzes, performance tracking, and mentor sessions into one role-based system.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Students access subjects, topics, PDFs, and MCQ quizzes. Mentors manage availability and run video sessions while identity is protected with codenames. Admins manage users, materials, question banks, and content.",
      },
    ],
    operationalValue:
      "Centralizes aviation learning. Gives students measurable practice and feedback. Creates a mentor marketplace model without exposing private mentor identity.",
    stack: [],
    tags: ["Student Dashboard", "Study Materials", "Assessments", "Mentorship"],
    relatedServices: ["custom-business-software"],
    source: "/work/flightdeck",
  },
  {
    slug: "void-runner",
    name: "Void Runner",
    tagline: "Three.js Space Shooter",
    category: "Game",
    status: "Delivered MVP",
    depth: "snapshot",
    region: "products",
    summary:
      "Three.js space shooter built around a pressure mechanic where players stay aggressive to escape a rising void boundary.",
    description:
      "Three.js space shooter built around a pressure mechanic where players stay aggressive to escape a rising void boundary.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Mouse movement controls the ship while shooting, dashing, shields, and grazing shape combat. Kills, crystals, upgrades, and mutations reward active play. Campaign, Void Rush, and Endless modes create replay loops.",
      },
    ],
    operationalValue:
      "Creates a browser-based game mechanic with retention potential. Can expand into leaderboards, cosmetics, ads, or premium modes.",
    stack: [],
    tags: ["Title Screen", "WebGL Game", "Three.js", "Retention"],
    relatedServices: [],
    source: "/work/void-runner",
  },
  {
    slug: "optimaflow",
    name: "OptimaFlow",
    tagline: "Visual ML Workflow Builder",
    category: "ML Tooling",
    status: "Delivered MVP",
    depth: "snapshot",
    region: "products",
    summary:
      "Visual machine-learning workflow builder focused on training, inference, and quantization experiment design.",
    description:
      "Visual machine-learning workflow builder focused on training, inference, and quantization experiment design.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Users design workflows on a ReactFlow canvas using data, model, training, validation, utility, and quantization nodes. Backend validates DAGs, expands groups, executes nodes topologically, and tracks status. Supports Tilde quantization variants such as Rect, Spoke, and Fovea.",
      },
    ],
    operationalValue:
      "Makes ML workflow construction accessible. Improves reproducibility. Accelerates comparison of quantization approaches.",
    stack: [],
    tags: ["ML Workflow Canvas", "Pipeline Templates", "Visual Workflows", "Quantization"],
    relatedServices: ["ai-mvp-development"],
    source: "/work/optimaflow",
  },
  {
    slug: "meridian",
    name: "MERIDIAN",
    tagline: "Global E-Commerce Platform",
    category: "Marketplace",
    status: "Launched",
    depth: "full",
    region: "operations",
    summary:
      "Marketplace and affiliate commerce platform for vendors, customers, and administrators across multiple countries.",
    description:
      "MERIDIAN is a global e-commerce affiliate and marketplace platform built for vendors to sell physical products or redirect buyers to external merchants. Launched in Saudi Arabia with a multi-country schema from day one, built as a monorepo with 8 workspace packages, 4 applications, 12 domain modules, and ~111 API endpoints.",
    metrics: [
      { value: "~111", label: "API Endpoints" },
      { value: "30", label: "DB Entities" },
      { value: "9", label: "State Machines" },
      { value: "~400", label: "Unit Tests" },
    ],
    sections: [
      {
        title: "Modular Backend Architecture",
        body: "Single NestJS application with 12 bounded-context modules communicating via domain events (EventEmitter2). Port/Adapter pattern isolates payment and shipping integrations, designed for Stripe/HyperPay and Aramex/DHL without coupling business logic to vendor APIs. Idempotency keys prevent duplicate orders, payments, and refunds.",
      },
      {
        title: "Three-App Frontend + Shared UI Kit",
        body: "Customer storefront (15 routes), vendor portal (17 routes), and admin panel (16 routes), all sharing a 25+ component UI kit with SWR data fetching, 5 hooks, and 3 providers. Each app has its own design system: the storefront uses Cormorant Garamond and gold accents; the vendor portal uses dark sidebar with indigo accents.",
      },
      {
        title: "Commerce & Inventory Logic",
        body: "9 explicit state machines control every status transition: products, offers, orders, payments, shipments, reviews, and eligibility. Stock is reserved on order creation and released on cancellation. Cart items are re-validated at checkout. Prices are snapshotted at order time. Reviews are gated to verified purchases within a 90-day window.",
      },
    ],
    operationalValue:
      "Supports multiple revenue models from one platform. Scales vendor operations with admin and portal tooling. Provides foundation for regional marketplace expansion.",
    stack: [
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "OpenSearch",
      "BullMQ",
      "Redis",
      "TypeScript",
      "Docker",
      "Turborepo",
      "Nginx",
    ],
    tags: ["Storefront", "Admin Console"],
    relatedServices: ["custom-business-software"],
    source: "/work/meridian",
  },
  {
    slug: "lawyer-ai",
    name: "Legal Assistant",
    formerly: "Lawyer AI",
    tagline: "Legal Document Intelligence",
    category: "Legal AI",
    status: "Delivered MVP",
    depth: "full",
    region: "knowledge",
    summary:
      "Platform for legal professionals with document analysis, legal research, case discovery, OCR, translation, comparison, and AI chat.",
    description:
      "Legal Assistant is an AI-powered legal platform for document analysis, research, and case discovery. Multi-agent CrewAI workflows handle specialized tasks (document comparison, content extraction, OCR/translation, and case law search), backed by Gemini, Perplexity, and Mistral as LLM providers.",
    metrics: [
      { value: "4+", label: "AI Crews" },
      { value: "3", label: "LLM Providers" },
      { value: "PDF + Image", label: "Input Types" },
      { value: "Indian Kanoon", label: "Case Database" },
    ],
    sections: [
      {
        title: "Document Analysis & Chat",
        body: "Users upload legal documents and interact via chat to extract clauses, summaries, risks, and obligations. OCR handles scanned PDFs and images via Mistral. The comparison module diffs two documents side-by-side, highlighting additions, deletions, and structural changes. Translation supports multilingual legal text.",
      },
      {
        title: "Multi-Agent CrewAI Workflows",
        body: "Four specialized CrewAI crews handle distinct tasks: document comparison, content listing, suggestion generation, and PDF analysis. Each crew runs as an autonomous multi-agent system with Gemini as the backbone LLM and Perplexity providing real-time research depth for case law and legal precedent.",
      },
      {
        title: "Case Law Discovery",
        body: "Indian Kanoon API integration lets lawyers search relevant case law by topic or citation directly within the platform. Perplexity deepens research by surfacing additional context and analysis. Results are presented alongside the active document for side-by-side legal research without switching tools.",
      },
    ],
    operationalValue:
      "Speeds legal research and first-pass review. Extracts insight from long documents. Improves preparation for case strategy and document comparison.",
    stack: [
      "React 19",
      "Vite",
      "Flask",
      "CrewAI",
      "LangChain",
      "Google Gemini",
      "Perplexity",
      "Mistral",
      "SQLite",
      "Google OAuth",
    ],
    tags: ["OCR & Translation", "Welcome Portal"],
    relatedServices: ["rag-development", "ai-mvp-development"],
    source: "/work/lawyer-ai",
  },
  {
    slug: "kanaka-gold-loan",
    name: "Kanaka Gold Loan",
    tagline: "Digital Gold & Silver Loan Platform",
    category: "Fintech",
    status: "Delivered MVP",
    depth: "snapshot",
    region: "operations",
    summary: "Digitizes borrower and admin journey for pledge-backed gold and silver loans.",
    description: "Digitizes borrower and admin journey for pledge-backed gold and silver loans.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Borrowers estimate eligibility, apply, complete KYC, upload documents, select appointments, track status, and repay loans. Admins review users, applications, documents, rates, payments, loan records, exports, and operational metrics. Server-side rules handle rate snapshots, LTV calculations, fees, GST, and repayment schedules.",
      },
    ],
    operationalValue:
      "Reduces friction in secured-loan acquisition. Improves borrower transparency. Enables centralized review and operations at scale.",
    stack: [],
    tags: ["Loan Application Tracking", "Gold Loan Calculator", "Secured Lending", "Compliance"],
    relatedServices: ["workflow-automation"],
    source: "/work/kanaka-gold-loan",
  },
  {
    slug: "saloon",
    name: "Saloon Management System",
    tagline: "Salon Management System",
    category: "Operations",
    status: "Production",
    depth: "full",
    region: "operations",
    client: "Priya Natural Care",
    summary: "Operations platform for multi-branch salon and spa businesses.",
    description:
      "Saloon Management System is a production multi-branch salon and spa management system: POS billing, inventory, CRM, staff management, appointment scheduling, and business analytics in one app. Live on Google Cloud Run with 7 branches, 600+ customers, and 1,000+ transaction records.",
    metrics: [
      { value: "7", label: "Branches" },
      { value: "600+", label: "Customers" },
      { value: "30+", label: "DB Collections" },
      { value: "v20", label: "Version" },
    ],
    sections: [
      {
        title: "Point of Sale & Inventory",
        body: "Multi-item billing supports services, packages, products, memberships, and prepaid balances in a single checkout. Stock validates in real time: products disable when out of stock, low-stock alerts fire at ≤5 units, and quantities reduce automatically on sale. Discount requests require manager approval via a coded approval workflow. PDF invoices include GST breakdown.",
      },
      {
        title: "Staff & Customer Management",
        body: "Staff profiles track attendance (check-in/out), leave requests, temporary cross-branch assignments, and commission earnings per sale. Customer records accumulate visit history, total spend, and loyalty data. Leads and missed enquiries feed into a follow-up pipeline. Service recovery tracks complaints through resolution.",
      },
      {
        title: "Analytics & Reporting",
        body: "Dashboard surfacing KPI cards, revenue trends, service sales analysis, staff performance leaderboards, customer lifecycle segmentation, and client value metrics. All reports support custom date ranges and can be filtered per branch. Expense tracking categorizes operational costs alongside revenue for profit analysis.",
      },
    ],
    operationalValue:
      "Unifies day-to-day salon operations. Improves inventory and staff control. Makes branch performance measurable.",
    stack: [
      "React 18",
      "Vite",
      "Ant Design",
      "Zustand",
      "Flask",
      "MongoDB Atlas",
      "Redis",
      "Google Cloud Run",
      "Docker",
    ],
    tags: ["Staff Dashboard", "Growth Analytics"],
    relatedServices: ["workflow-automation", "custom-business-software"],
    source: "/work/saloon",
  },
  {
    slug: "apex",
    name: "Apex",
    tagline: "Sports Coaching & Readiness Platform",
    category: "SportsTech",
    status: "In Progress",
    depth: "snapshot",
    region: "products",
    summary: "Mobile-first sports coaching and readiness platform for athletics academies.",
    description: "Mobile-first sports coaching and readiness platform for athletics academies.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Coaches, athletes, and guardians work around daily check-ins, attendance, session plans, RPE, recovery, and feedback. The system converts training and wellness data into readiness indicators and risk flags. Access control scopes coach, athlete, and guardian data correctly.",
      },
    ],
    operationalValue:
      "Gives coaches squad-level triage and faster intervention signals. Improves athlete accountability. Turns academy operations into measurable performance workflows.",
    stack: [],
    tags: ["Role Selection", "Daily Check-In & Readiness", "Readiness", "Mobile-first"],
    relatedServices: ["ai-mvp-development"],
    source: "/work/apex",
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    tagline: "AI-Assisted Weight Management",
    category: "HealthTech",
    status: "In Progress",
    depth: "snapshot",
    region: "products",
    summary:
      "AI-assisted weight management application designed around adherence, recovery, and sustainable behavior change.",
    description:
      "AI-assisted weight management application designed around adherence, recovery, and sustainable behavior change.",
    metrics: [],
    sections: [
      {
        title: "How It Works",
        body: "Backend rules own calorie targets, macro splits, recovery mode, scoring, safety floors, and daily recomputation. AI supports meal classification, coach conversation, and phrasing, while health-critical targets remain deterministic. Recovery Mode reduces intensity after low-engagement days and pauses streaks instead of resetting them.",
      },
    ],
    operationalValue:
      "Supports sustainable adherence instead of guilt-based engagement. Speeds meal logging through AI-assisted recognition. Keeps health logic explainable, auditable, and server-controlled.",
    stack: [],
    tags: ["Progress Dashboard", "Meal Logging", "Behavior Change", "AI Coach"],
    relatedServices: ["ai-mvp-development"],
    source: "/work/nutrition",
  },
  {
    slug: "health-dashboard",
    name: "Health Activity Dashboard",
    tagline: "Cross-Platform Health & Wellness Tracker",
    category: "HealthTech",
    status: "MVP",
    depth: "snapshot",
    region: "products",
    summary:
      "Cross-platform health dashboard reading Apple Health and Google Health Connect data, with graceful demo-mode fallback and backend sync.",
    description:
      "A cross-platform health activity dashboard built with React Native (Expo) and a Next.js API backend. Users register, complete onboarding, connect a platform health data source, and view heart rate, steps, calories, distance, and wellness scoring on Android, iOS, and Web from a single shared UI codebase.",
    metrics: [
      { value: "iOS, Android, Web", label: "Platforms" },
      { value: "HealthKit + Health Connect", label: "Health Providers" },
      { value: "9", label: "API Endpoints" },
      { value: "8+", label: "Metrics Tracked" },
    ],
    sections: [
      {
        title: "One Health Provider Interface, Three Platforms",
        body: "Screen components never call HealthKit or Health Connect directly. They consume a shared HealthProvider interface (requestPermissions, getTodaySummary, getHeartRateHistory, syncToBackend, and more). Metro resolves the correct platform-specific implementation automatically, so the same dashboard UI renders live Apple Health data on iOS, Health Connect data on Android, and backend-synced data on Web.",
      },
      {
        title: "Demo Mode Is a First-Class Feature",
        body: "Native health modules are optional dependencies, lazy-loaded inside try/catch. If a module is unavailable or permission is denied, the app falls back to generated demo data automatically, with a clear \"Demo Mode\" label so no one is misled about what they're looking at. This keeps the app fully demoable on any device, including web browsers with no health API access at all.",
      },
      {
        title: "Sync, Scoring, and History",
        body: "Daily summaries and full day reports (heart rate samples, activity entries) sync to a MongoDB-backed Next.js API over HTTP. A client-side wellness scoring module computes BMI, BMR, and activity/sleep/heart/recovery scores with plain-language insights from profile and metric data. Informational only, not a medical claim.",
      },
    ],
    operationalValue:
      "Validates a full cross-platform health data flow (register, connect, view, sync, and browse history) without requiring native hardware pairing. Graceful demo-mode fallback means the product can always be shown, tested, or sold even where native health APIs aren't available.",
    stack: [
      "React Native",
      "Expo",
      "Next.js",
      "MongoDB",
      "HealthKit",
      "Health Connect",
      "Zustand",
      "Tamagui",
    ],
    tags: ["Daily Dashboard", "Heart Rate History"],
    relatedServices: ["ai-mvp-development"],
    source: "/work/health-dashboard",
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
