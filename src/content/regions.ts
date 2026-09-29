import type { Region, RegionId } from "./types";

export const REGIONS: Region[] = [
  {
    id: "voice",
    name: "Voice",
    grammar: ["Speech", "Structured information", "Intelligence and action"],
    serviceSlugs: ["voice-ai-development"],
  },
  {
    id: "knowledge",
    name: "Knowledge",
    grammar: ["Documents and conversations", "Retrieval and reasoning", "Usable knowledge"],
    serviceSlugs: ["rag-development", "ai-agent-development"],
  },
  {
    id: "operations",
    name: "Operations",
    grammar: ["Fragmented processes", "Connected workflow", "Controlled operations"],
    serviceSlugs: ["workflow-automation", "custom-business-software"],
  },
  {
    id: "products",
    name: "Products",
    grammar: ["Business need", "Structured product", "Usable digital experience"],
    serviceSlugs: ["ai-mvp-development"],
  },
];

export const regionById = (id: RegionId) => REGIONS.find((r) => r.id === id);
