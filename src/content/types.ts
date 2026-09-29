/** Every fact in /src/content was carried over from the company's previously published website.
 *  `source` records the path of that page so claims can be re-checked. */

export type RegionId = "voice" | "knowledge" | "operations" | "products";

export type ProjectStatus =
  | "Production"
  | "Production-ready MVP"
  | "Launched"
  | "Delivered MVP"
  | "MVP"
  | "In Progress";

export type Metric = { value: string; label: string };

export type Section = { title: string; body: string };

export type Project = {
  slug: string;
  name: string;
  formerly?: string;
  tagline: string; // e.g. "Code-Switching Subtitle Generator"
  category: string; // e.g. "AI Media"
  status: ProjectStatus;
  depth: "full" | "snapshot";
  region: RegionId;
  client?: string; // only when the page names an external client, e.g. "Priya Natural Care"
  summary: string; // one line, from the work index
  description: string; // longer intro paragraph from the project page
  metrics: Metric[]; // only published numbers
  sections: Section[]; // "How it works" / numbered sections, verbatim or lightly trimmed
  operationalValue?: string;
  stack: string[];
  tags: string[];
  relatedServices: string[]; // service slugs
  screenshot?: { file: string; alt: string }; // full case studies only; filled later
  source: string;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string; // nav label, e.g. "Voice AI"
  region: RegionId;
  headline: string; // the one-line promise
  intro: string;
  fit: string[];
  problems: string[];
  deliverables: string[];
  outOfScope: string[];
  capabilities: string[];
  stack: string[];
  timelineFactors: string[];
  pricingFactors: string[];
  safeguards: string[];
  evidence: string[]; // project slugs named on the service page
  source: string;
};

export type Region = {
  id: RegionId;
  name: string;
  grammar: [string, string, string]; // friction -> structure -> system
  serviceSlugs: string[];
};
