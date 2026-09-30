import type { TStep } from "@/components/pages/Transformation";

/** One transformation per page. Every step restates a fact from that page on the previous company website;
 *  nothing here adds capability. `friction` is the starting state, not a claim. */

export const SERVICE_FLOW: Record<string, { title: string; steps: TStep[] }> = {
  "voice-ai-development": {
    title: "A live call, turned into action",
    steps: [
      { label: "A call that needs routing and notes", kind: "friction" },
      { label: "Routed and transcribed live", kind: "structure" },
      { label: "Spoken request understood as a command", kind: "system" },
      { label: "Scheduling action taken", kind: "action" },
      { label: "Confirmation step for anything consequential", kind: "gate" },
    ],
  },
  "rag-development": {
    title: "Documents, turned into grounded answers",
    steps: [
      { label: "Records that take manual searching", kind: "friction" },
      { label: "A retrieval layer over your own documents", kind: "structure" },
      { label: "Answers grounded in retrieved sources", kind: "system" },
      { label: "Human review on high-stakes answers", kind: "gate" },
    ],
  },
  "ai-agent-development": {
    title: "A manual multi-step task, turned into a scoped workflow",
    steps: [
      { label: "Reading, comparing, summarising by hand", kind: "friction" },
      { label: "Scoped tasks per agent, not one open prompt", kind: "structure" },
      { label: "Structured, reviewable output", kind: "system" },
      { label: "Review checkpoint before decisions that matter", kind: "gate" },
    ],
  },
  "workflow-automation": {
    title: "Manual status updates, turned into a state machine",
    steps: [
      { label: "Someone pushing each step forward", kind: "friction" },
      { label: "Defined states and transitions", kind: "structure" },
      { label: "Server-side rules and triggers", kind: "system" },
      { label: "Automatic notifications and dashboards", kind: "action" },
    ],
  },
  "custom-business-software": {
    title: "Workarounds, turned into one role-based system",
    steps: [
      { label: "Generic tools that don’t match the operation", kind: "friction" },
      { label: "One system for POS, inventory, staff and customers", kind: "structure" },
      { label: "Interfaces per role, enforced server-side", kind: "system" },
      { label: "Reporting on the operation’s own data", kind: "action" },
    ],
  },
  "ai-mvp-development": {
    title: "An idea, turned into a deployed product in 45 days",
    steps: [
      { label: "An idea with no product around it", kind: "friction" },
      { label: "20-minute call, 2-page fixed-scope proposal", kind: "structure" },
      { label: "Build with a demo every Friday", kind: "system" },
      { label: "Deployed, tested, documented, handed over", kind: "action" },
    ],
  },
};

export const PROJECT_FLOW: Record<string, TStep[]> = {
  "caption-cc": [
    { label: "Tamil-English code-switched video", kind: "friction" },
    { label: "Audio extracted, transcribed with Whisper", kind: "structure" },
    { label: "Gemini corrects code-switching and translates", kind: "system" },
    { label: "SRT, VTT or burned-in MP4", kind: "action" },
  ],
  "doctor-ai": [
    { label: "Patients calling in", kind: "friction" },
    { label: "VAPI routes to an available doctor; Deepgram transcribes live", kind: "structure" },
    { label: "Booking from natural language, synced to Outlook", kind: "action" },
    { label: "Prescription: request, doctor review, approval", kind: "gate" },
  ],
  mediscribe: [
    { label: "A consultation with no time to write it up", kind: "friction" },
    { label: "Recorded (ESP32-S3 hardware), transcribed", kind: "structure" },
    { label: "Structured draft clinical note", kind: "system" },
    { label: "Stays a draft until the doctor reviews it", kind: "gate" },
  ],
  "lawyer-ai": [
    { label: "Legal documents, scans and images", kind: "friction" },
    { label: "OCR and translation via Mistral", kind: "structure" },
    { label: "Four CrewAI crews: comparison, content listing, suggestions, PDF analysis", kind: "system" },
    { label: "Case law from Indian Kanoon alongside the document", kind: "action" },
  ],
  neura: [
    { label: "Conversations, voice notes, meetings, WhatsApp", kind: "friction" },
    { label: "Transcribed and segmented", kind: "structure" },
    { label: "Tasks, decisions, risks, people, follow-ups extracted", kind: "system" },
    { label: "Searchable founder memory, reminders and chat", kind: "action" },
  ],
  saloon: [
    { label: "Seven branches, one business to run", kind: "friction" },
    { label: "POS, inventory, staff and CRM in one app", kind: "structure" },
    { label: "Stock validated in real time; alerts at ≤5 units", kind: "system" },
    { label: "Analytics per branch and across all seven", kind: "action" },
  ],
  "kanaka-gold-loan": [
    { label: "Friction in acquiring a secured loan", kind: "friction" },
    { label: "Estimate, apply, KYC, documents, appointment, track, repay", kind: "structure" },
    { label: "Server rules: rate snapshots, LTV, fees", kind: "system" },
    { label: "Central admin review and operations", kind: "action" },
  ],
  meridian: [
    { label: "Vendors, customers and admins with different needs", kind: "friction" },
    { label: "Three apps on one NestJS backend, 12 domain modules", kind: "structure" },
    { label: "9 state machines govern every status transition", kind: "system" },
    { label: "Launched in Saudi Arabia, multi-country from day one", kind: "action" },
  ],
  flightdeck: [
    { label: "Aviation study spread across materials and mentors", kind: "friction" },
    { label: "Subjects, PDFs, MCQ quizzes and mentor sessions", kind: "structure" },
    { label: "One role-based system for students, mentors, admins", kind: "system" },
    { label: "Measurable practice and feedback", kind: "action" },
  ],
  designt: [
    { label: "A design idea in plain words", kind: "friction" },
    { label: "Gemini generates the artwork, with up to 3 references", kind: "structure" },
    { label: "Live mockup: 5 colours, XS–3XL, placement controls", kind: "system" },
    { label: "4-step checkout with Razorpay", kind: "action" },
  ],
  optimaflow: [
    { label: "ML workflows that are hard to construct", kind: "friction" },
    { label: "Data, model, training, validation, quantization nodes", kind: "structure" },
    { label: "DAG validated and executed in topological order", kind: "system" },
    { label: "Quantization approaches compared", kind: "action" },
  ],
  "health-dashboard": [
    { label: "Health data split across Apple and Google platforms", kind: "friction" },
    { label: "One HealthProvider interface over HealthKit and Health Connect", kind: "structure" },
    { label: "One dashboard on iOS, Android and Web", kind: "system" },
    { label: "Labelled demo mode when data isn’t available", kind: "gate" },
  ],
  apex: [
    { label: "Coaches, athletes and guardians to keep in sync", kind: "friction" },
    { label: "Daily check-ins, attendance, RPE, recovery", kind: "structure" },
    { label: "Readiness indicators and risk flags", kind: "system" },
    { label: "Faster intervention signals for coaches", kind: "action" },
  ],
  nutrition: [
    { label: "Guilt-based engagement instead of adherence", kind: "friction" },
    { label: "Deterministic targets owned by backend rules", kind: "structure" },
    { label: "AI meal classification and coaching", kind: "system" },
    { label: "Recovery mode after low-engagement days", kind: "action" },
  ],
  "void-runner": [
    { label: "A pressure mechanic: a rising void boundary", kind: "friction" },
    { label: "Shooting, dashing, shields and grazing", kind: "structure" },
    { label: "Campaign, Void Rush and Endless modes", kind: "system" },
  ],
};

export const SCREENSHOTS: Record<string, { file: string; alt: string; w: number; h: number; sizes: number[] }> = {
  "doctor-ai": { file: "doctor-ai", alt: "MediConsult mobile app screens: doctor home, live consultation recording, patient record and SOAP draft notes", w: 1536, h: 1024, sizes: [640, 1200] },
  "caption-cc": { file: "caption-cc", alt: "Caption CC subtitle editor showing timed Tamil-English segments with their English subtitles and SRT, VTT and MP4 export options", w: 1604, h: 905, sizes: [640, 1200] },
  "lawyer-ai": { file: "lawyer-ai", alt: "Legal Assistant OCR and translation tool with document upload and side-by-side translation viewer", w: 1604, h: 905, sizes: [640, 1200] },
  saloon: { file: "saloon", alt: "Saloon Management System dashboard with staff performance by branch", w: 1600, h: 759, sizes: [640, 1200] },
  meridian: { file: "meridian", alt: "MERIDIAN customer storefront", w: 1600, h: 733, sizes: [640, 1200] },
  designt: { file: "designt", alt: "DesignT design studio: a conversational prompt, generated wave artwork and a live t-shirt preview", w: 1679, h: 903, sizes: [640, 1200] },
};
