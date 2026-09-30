"use client";

import { useRef } from "react";
import { useScene } from "@/lib/motion";
import { Stage } from "./Stage";
import { stageTimeline } from "./stageMotion";
import s from "./svg.module.css";

/* Legal Assistant, as published on /work/lawyer-ai: four CrewAI crews (document comparison, content
   listing, suggestion generation, PDF analysis), Mistral OCR for scans, and Indian Kanoon case-law
   retrieval that grounds the research output. The RAG page states high-stakes answers are reviewed. */
const CREWS = ["Comparison", "Content listing", "Suggestions", "PDF analysis"];
const LANE_Y = [70, 140, 210, 280];
const JOIN = { x: 452, y: 175 };

export function KnowledgeStage() {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, (ctx) => {
    const { tl, q } = stageTimeline(ctx);
    tl.from(q("[data-page]"), { rotation: (i: number) => [-14, 9, -5, 12, -8][i], x: (i: number) => [-10, 14, -6, 18, 4][i], y: (i: number) => [30, -20, 44, -8, 60][i], transformOrigin: "50% 50%", duration: 1 }, 0)
      .from(q("[data-lane]"), { strokeDashoffset: 1, duration: 0.8, stagger: 0.15 }, 0.7)
      .from(q("[data-crew]"), { opacity: 0, duration: 0.3, stagger: 0.15 }, 0.8)
      .from(q("[data-retrieval]"), { strokeDashoffset: 1, duration: 0.8 }, 1.5)
      .from(q("[data-kanoon]"), { opacity: 0, duration: 0.3 }, 1.4)
      .from(q("[data-answer]"), { opacity: 0, x: -16, duration: 0.5 }, 2.2)
      .from(q("[data-cite]"), { opacity: 0, scale: 0.5, transformOrigin: "50% 50%", duration: 0.2, stagger: 0.1 }, 2.6)
      .from(q("[data-review]"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.4 }, 2.9);
  });

  return (
    <div ref={ref}>
      <Stage
        bare
        id="knowledge"
        system="Legal Assistant · document intelligence"
        caption="Documents split across four specialised agent crews; case-law retrieval grounds the research; one cited answer is reviewed before anyone relies on it."
      >
        <svg data-wide className={s.wide} viewBox="0 0 600 400" role="img" aria-label="A stack of legal documents flows into four agent crews: comparison, content listing, suggestions, PDF analysis. Case law from Indian Kanoon joins. The lanes converge into one answer with citations, held for review.">
          {/* Documents */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} data-page>
              <rect x={24 + i * 5} y={120 + i * 8} width="78" height="104" className={s.paper} />
              {[0, 1, 2, 3, 4].map((l) => (
                <line key={l} x1={34 + i * 5} y1={138 + i * 8 + l * 14} x2={(l % 2 ? 84 : 92) + i * 5} y2={138 + i * 8 + l * 14} className={s.hair} />
              ))}
            </g>
          ))}
          <text x="24" y="276" className={s.monoSm}>PDF · scans · images</text>
          <text x="24" y="291" className={s.monoSm}>OCR via Mistral</text>

          {/* Crews */}
          {CREWS.map((c, i) => {
            const y = LANE_Y[i];
            const d = `M 132 ${y + 110 - 60} C 190 ${y + 110 - 60}, 170 ${y}, 230 ${y} L 360 ${y} C 410 ${y}, 410 ${JOIN.y}, ${JOIN.x} ${JOIN.y}`;
            return (
              <g key={c}>
                <path data-lane d={d} pathLength={1} className={s.cobaltLine} />
                <g data-crew>
                  <rect x="236" y={y - 22} width="118" height="18" fill="var(--cool)" />
                  <text x="240" y={y - 9} className={s.mono}>{c}</text>
                </g>
              </g>
            );
          })}

          {/* Retrieval */}
          <path data-retrieval d={`M 300 372 C 380 372, 420 300, ${JOIN.x} ${JOIN.y}`} pathLength={1} className={s.tealLine} />
          <g data-kanoon>
            <rect x="130" y="360" width="170" height="24" className={s.tealOutline} />
            <text x="140" y="376" className={`${s.monoSm} ${s.tealText}`}>Indian Kanoon · case law</text>
          </g>

          {/* Answer */}
          <circle cx={JOIN.x} cy={JOIN.y} r="4" className={s.cobalt} />
          <g data-answer>
            <rect x="466" y="128" width="120" height="96" className={s.paper} />
            <text x="476" y="148" className={s.mono}>Answer</text>
            {[0, 1, 2].map((l) => (
              <line key={l} x1="476" y1={164 + l * 13} x2={l === 2 ? 540 : 574} y2={164 + l * 13} className={s.hair} />
            ))}
            {[0, 1].map((c) => (
              <g key={c} data-cite>
                <rect x={476 + c * 30} y="200" width="24" height="15" className={s.tealOutline} />
                <text x={488 + c * 30} y="211" textAnchor="middle" className={`${s.monoSm} ${s.tealText}`}>{c + 1}</text>
              </g>
            ))}
          </g>
          <rect data-review x="466" y="240" width="60" height="3" fill="var(--amber)" />
          <text x="466" y="260" className={`${s.monoSm} ${s.amberText}`}>Reviewed before use</text>
        </svg>
        {/* Portrait composition (< 900px) */}
        <svg data-tall className={s.tall} viewBox="0 0 340 496" role="img" aria-label="Legal documents flow into four agent crews: comparison, content listing, suggestions, PDF analysis. Case law from Indian Kanoon joins. They converge into one answer with citations, reviewed before use.">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} data-page>
              <rect x={12 + i * 4} y={10 + i * 6} width="60" height="78" className={s.paper} />
              {[0, 1, 2, 3].map((l) => <line key={l} x1={20 + i * 4} y1={26 + i * 6 + l * 13} x2={(l % 2 ? 56 : 64) + i * 4} y2={26 + i * 6 + l * 13} className={s.hair} />)}
            </g>
          ))}
          <text x="104" y="40" className={s.monoSmM}>PDF · scans · images</text>
          <text x="104" y="58" className={s.monoSmM}>OCR via Mistral</text>
          {CREWS.map((c, i) => {
            const y = 150 + i * 46;
            return (
              <g key={c}>
                <path data-lane d={`M 40 118 C 40 ${y - 24}, 52 ${y}, 80 ${y} L 230 ${y} C 280 ${y}, 300 ${y}, 300 316`} pathLength={1} className={s.cobaltLine} />
                <g data-crew><text x="80" y={y - 9} className={s.monoM}>{c}</text></g>
              </g>
            );
          })}
          <path data-retrieval d="M 176 342 C 240 342, 300 340, 300 318" pathLength={1} className={s.tealLine} />
          <g data-kanoon>
            <rect x="6" y="330" width="170" height="26" className={s.tealOutline} />
            <text x="14" y="347" className={`${s.monoSmM} ${s.tealText}`}>Indian Kanoon · case law</text>
          </g>
          <circle cx="300" cy="316" r="4" className={s.cobalt} />
          <line x1="300" y1="320" x2="300" y2="370" className={s.cobaltLine} strokeDasharray="none" />
          <g data-answer>
            <rect x="150" y="372" width="184" height="80" className={s.paper} />
            <text x="162" y="394" className={s.monoM}>Answer</text>
            {[0, 1].map((l) => <line key={l} x1="162" y1={410 + l * 12} x2={l ? 270 : 320} y2={410 + l * 12} className={s.hair} />)}
            {[0, 1].map((c) => (
              <g key={c} data-cite>
                <rect x={276 + c * 26} y="430" width="22" height="15" className={s.tealOutline} />
                <text x={287 + c * 26} y="441" textAnchor="middle" className={`${s.monoSmM} ${s.tealText}`}>{c + 1}</text>
              </g>
            ))}
          </g>
          <rect data-review x="150" y="466" width="60" height="3" fill="var(--amber)" />
          <text x="150" y="488" className={`${s.monoSmM} ${s.amberText}`}>Reviewed before use</text>
        </svg>
      </Stage>
    </div>
  );
}
