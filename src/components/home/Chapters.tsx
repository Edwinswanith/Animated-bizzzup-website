import { Chapter } from "./Chapter";
import { Evidence } from "@/components/site/Evidence";
import { CaptionStage } from "./CaptionStage";
import { KnowledgeStage } from "./KnowledgeStage";
import { OperationsStage } from "./OperationsStage";
import { ProductsStage } from "./ProductsStage";

const svc = (slug: string, label: string) => ({ href: `/services/${slug}`, label });

export function Chapters() {
  return (
    <>
      <Chapter
        id="voice"
        index="01"
        region="voice"
        friction="A conversation ends, and nothing usable is left behind."
        body={
          <>
            <p>Calls routed by hand. Consultations nobody has time to write up. Video in two languages that no subtitle tool understands.</p>
            <p>We build voice systems that listen live, turn speech into structure, and act on it, with a person reviewing anything consequential.</p>
          </>
        }
        stage={<CaptionStage />}
        evidence={
          <>
            <Evidence slug="caption-cc" />
            <Evidence slug="mediscribe" compact />
          </>
        }
        services={[svc("voice-ai-development", "Voice AI")]}
      />
      <Chapter
        id="knowledge"
        index="02"
        region="knowledge"
        tone="cool"
        layout="stage-left"
        friction="The answer is in there. Somewhere."
        body={
          <>
            <p>Case files, contracts, scans, meetings and voice notes pile up faster than anyone can read them.</p>
            <p>We build agents that split the reading into scoped tasks, and retrieval that grounds every answer in your own documents, with sources attached.</p>
          </>
        }
        stage={<KnowledgeStage />}
        evidence={
          <>
            <Evidence slug="lawyer-ai" />
            <Evidence slug="neura" compact />
          </>
        }
        services={[svc("rag-development", "RAG & Search"), svc("ai-agent-development", "AI Agents")]}
      />
      <Chapter
        id="operations"
        index="03"
        region="operations"
        layout="stage-wide"
        friction="Seven branches. Seven versions of the truth."
        body={
          <>
            <p>Stock tracked in one place, staff in another, approvals in someone’s head. Every branch runs the same business a little differently.</p>
            <p>We replace that with one system: explicit states, server-side rules, role-based access, and dashboards built on the data the operation actually produces.</p>
          </>
        }
        stage={<OperationsStage />}
        evidence={
          <>
            <Evidence slug="saloon" />
            <Evidence slug="kanaka-gold-loan" compact />
            <Evidence slug="meridian" compact />
          </>
        }
        services={[svc("workflow-automation", "Workflow Automation"), svc("custom-business-software", "Business Software")]}
      />
      <Chapter
        id="products"
        index="04"
        region="products"
        tone="cool"
        friction="An idea, and nothing to put it in."
        body={
          <>
            <p>A valuable AI feature is not a product until it has users, accounts, payments and a place to live.</p>
            <p>We build the whole product around one or two AI features, deployed and handed over in a fixed 45-day scope.</p>
          </>
        }
        stage={<ProductsStage />}
        evidence={
          <>
            <Evidence slug="designt" />
            <Evidence slug="optimaflow" compact />
          </>
        }
        services={[svc("ai-mvp-development", "AI MVPs")]}
      />
    </>
  );
}
