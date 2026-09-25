/** Data-driven config for the hero's animated "Live AI System Console" (HeroWorkflowVisual.tsx). */

export interface WorkflowNode {
  label: string;
  /** Short label shown under the node chip on the rail (e.g. "STT", "Book"). */
  shortLabel: string;
  icon: "upload" | "voice" | "ai" | "calendar" | "billing" | "inventory" | "dashboard" | "ocr" | "search" | "doc" | "check";
}

export interface HeroWorkflow {
  project: string;
  category: string;
  href: string;
  nodes: WorkflowNode[];
  /** Console output lines, revealed progressively as the flow nears completion. */
  outputs: string[];
  /** Short status-chip text shown once the flow completes. */
  doneStatus: string;
}

export const HERO_WORKFLOWS: HeroWorkflow[] = [
  {
    project: "Caption CC",
    category: "AI Media",
    href: "/work/caption-cc",
    nodes: [
      { label: "Video Upload", shortLabel: "Upload", icon: "upload" },
      { label: "Speech-to-Text", shortLabel: "STT", icon: "voice" },
      { label: "AI Correction", shortLabel: "Correct", icon: "ai" },
      { label: "Subtitle Timing", shortLabel: "Time", icon: "dashboard" },
      { label: "Export", shortLabel: "Export", icon: "check" },
    ],
    outputs: ["Generated subtitle segment", "SRT ready", "VTT ready", "MP4 ready"],
    doneStatus: "Export ready",
  },
  {
    project: "Doctor AI",
    category: "Healthcare",
    href: "/work/doctor-ai",
    nodes: [
      { label: "Patient Call", shortLabel: "Call", icon: "voice" },
      { label: "Voice Transcript", shortLabel: "Transcript", icon: "doc" },
      { label: "AI Note Draft", shortLabel: "Note", icon: "ai" },
      { label: "Prescription Update", shortLabel: "Update", icon: "calendar" },
      { label: "Doctor Review", shortLabel: "Review", icon: "check" },
    ],
    outputs: [
      "Draft clinical note",
      "Symptoms captured",
      "Follow-up action",
      "Waiting for doctor approval",
    ],
    doneStatus: "Review ready",
  },
  {
    project: "Saloon Management",
    category: "Operations",
    href: "/work/saloon",
    nodes: [
      { label: "Appointment Booking", shortLabel: "Book", icon: "calendar" },
      { label: "POS Billing", shortLabel: "Bill", icon: "billing" },
      { label: "Inventory Update", shortLabel: "Stock", icon: "inventory" },
      { label: "Branch Dashboard", shortLabel: "Dashboard", icon: "dashboard" },
      { label: "Daily Insight", shortLabel: "Insight", icon: "check" },
    ],
    outputs: [
      "Appointments updated",
      "Stock alert generated",
      "Branch dashboard refreshed",
      "Daily insight ready",
    ],
    doneStatus: "Insight ready",
  },
  {
    project: "Legal Assistant",
    category: "Legal AI",
    href: "/work/lawyer-ai",
    nodes: [
      { label: "Document Upload", shortLabel: "Upload", icon: "upload" },
      { label: "OCR / Translation", shortLabel: "OCR", icon: "ocr" },
      { label: "AI Analysis", shortLabel: "Analyze", icon: "ai" },
      { label: "Case Research", shortLabel: "Research", icon: "search" },
      { label: "Structured Response", shortLabel: "Response", icon: "check" },
    ],
    outputs: [
      "Issue extracted",
      "Relevant clause found",
      "Case context prepared",
      "Structured answer ready",
    ],
    doneStatus: "Response ready",
  },
];
