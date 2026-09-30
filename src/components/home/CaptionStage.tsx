"use client";

import { useRef } from "react";
import { useScene } from "@/lib/motion";
import { Stage } from "./Stage";
import { stageTimeline } from "./stageMotion";
import s from "./svg.module.css";

/* Caption CC, as published on /work/caption-cc: a five-stage pipeline (Upload, STT, Correct, Time,
   Export) turns Tamil-English code-switched speech into English subtitles, exported as SRT, VTT or
   burned-in MP4. Segment blocks are abstract; no transcript text is invented. */
const STAGES = ["Upload", "STT", "Correct", "Time", "Export"];
const LANG = ["TA", "EN", "TA", "TA", "EN", "TA"]; // six speech segments, mixed languages
const BARS_PER = 9;
const amp = (i: number) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45));
// Round generated geometry so server and browser render identical attributes.
const r2 = (n: number) => Math.round(n * 100) / 100;

export function CaptionStage() {
  const ref = useRef<HTMLElement>(null);
  useScene(ref, (ctx) => {
    const { tl, q } = stageTimeline(ctx);
    tl.from(q("[data-bar]"), { scaleY: (i: number) => 0.2 + ((i * 37) % 11) / 8, fill: "#a9a297", duration: 1.2, stagger: 0.01 }, 0)
      .from(q("[data-lang]"), { opacity: 0, duration: 0.4, stagger: 0.08 }, 0.9)
      .from(q("[data-tick]"), { fill: "#ece8e1", stroke: "#a9a297", duration: 0.3, stagger: 0.45 }, 0.2)
      .from(q("[data-drop]"), { scaleY: 0, duration: 0.6, stagger: 0.1 }, 1.4)
      .from(q("[data-seg]"), { opacity: 0, y: -36, duration: 0.6, stagger: 0.12 }, 1.6)
      .from(q("[data-export]"), { opacity: 0, x: -12, duration: 0.4, stagger: 0.15 }, 2.5);
  });

  const segW = 88, gap = 6, x0 = 18;
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <Stage
        id="caption"
        system="Caption CC · caption pipeline"
        caption="Mixed Tamil-English speech becomes one timed English subtitle track, then SRT, VTT or burned-in MP4. Five stages, videos up to 10 minutes."
      >
        <svg data-wide className={s.wide} viewBox="0 0 600 360" role="img" aria-label="Five pipeline stages; a waveform with Tamil and English segments; English subtitle segments aligned on a timeline; exports SRT, VTT, MP4.">
          {/* Stage rail */}
          <line x1="30" y1="22" x2="570" y2="22" className={s.hair} />
          {STAGES.map((st, i) => {
            const x = 30 + i * 135;
            return (
              <g key={st}>
                <circle data-tick cx={x} cy="22" r="6" fill="#0f8c80" stroke="#0f8c80" strokeWidth="1.5" />
                <text x={x} y="48" textAnchor="middle" className={s.mono}>{st}</text>
              </g>
            );
          })}

          {/* Waveform: six segments, language-tagged */}
          {LANG.map((lang, g) => {
            const gx = x0 + g * (segW + gap);
            return (
              <g key={g}>
                <text data-lang x={gx} y="88" className={s.monoSm}>{lang}</text>
                {Array.from({ length: BARS_PER }, (_, b) => {
                  const i = g * BARS_PER + b;
                  const h = 8 + amp(i) * 46;
                  return (
                    <rect
                      key={b}
                      data-bar
                      x={r2(gx + b * (segW / BARS_PER) + 1)}
                      y={r2(126 - h / 2)}
                      width={r2(segW / BARS_PER - 3)}
                      height={r2(h)}
                      rx="1.5"
                      className={lang === "TA" ? s.teal : s.tealOutline}
                      style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                    />
                  );
                })}
                <line data-drop x1={gx + segW / 2} y1="160" x2={gx + segW / 2} y2="206" className={s.hair} strokeDasharray="3 3" style={{ transformBox: "fill-box", transformOrigin: "50% 0" }} />
              </g>
            );
          })}

          {/* Timed English subtitle track */}
          <text x="18" y="200" className={s.monoSm}>English subtitle track</text>
          {LANG.map((_, g) => {
            const gx = x0 + g * (segW + gap);
            return (
              <g key={g} data-seg>
                <rect x={gx} y="212" width={segW} height="30" rx="2" className={s.cobaltSoft} />
                <text x={gx + 10} y="231" className={`${s.monoSm} ${s.cobaltText}`}>EN {String(g + 1).padStart(2, "0")}</text>
              </g>
            );
          })}
          <line x1="18" y1="258" x2="582" y2="258" className={s.hair} />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={r2(18 + i * 56.4)} y1="258" x2={r2(18 + i * 56.4)} y2={i % 5 === 0 ? 268 : 263} className={s.hair} />
          ))}
          <text x="18" y="284" className={s.monoSm}>00:00</text>
          <text x="582" y="284" textAnchor="end" className={s.monoSm}>10:00 max</text>

          {/* Exports */}
          {["SRT", "VTT", "MP4"].map((f, i) => (
            <g key={f} data-export>
              <rect x={18 + i * 96} y="310" width="84" height="32" className={s.amberSoft} />
              <text x={60 + i * 96} y="330" textAnchor="middle" className={`${s.mono} ${s.amberText}`}>{f}</text>
            </g>
          ))}
          <text x="582" y="330" textAnchor="end" className={s.monoSm}>+ optional AI dubbing</text>
        </svg>
        {/* Portrait composition (< 900px) */}
        <svg data-tall className={s.tall} viewBox="0 0 340 372" role="img" aria-label="Five pipeline stages; a waveform with Tamil and English segments; English subtitle segments on a timeline; exports SRT, VTT, MP4.">
          <line x1="20" y1="18" x2="320" y2="18" className={s.hair} />
          {STAGES.map((st, i) => {
            const x = 20 + i * 75;
            return (
              <g key={st}>
                <circle data-tick cx={x} cy="18" r="6" fill="#0f8c80" stroke="#0f8c80" strokeWidth="1.5" />
                <text x={x} y="42" textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"} dx={i === 0 ? -6 : i === 4 ? 6 : 0} className={s.monoSmM}>{st}</text>
              </g>
            );
          })}
          {LANG.map((lang, g) => {
            const gx = 6 + g * 54;
            return (
              <g key={g}>
                <text data-lang x={gx} y="76" className={s.monoSmM}>{lang}</text>
                {Array.from({ length: 6 }, (_, b) => {
                  const h = 8 + amp(g * 6 + b) * 36;
                  return (
                    <rect key={b} data-bar x={r2(gx + b * (50 / 6) + 1)} y={r2(112 - h / 2)} width={r2(50 / 6 - 2.5)} height={r2(h)} rx="1.5"
                      className={lang === "TA" ? s.teal : s.tealOutline} style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} />
                  );
                })}
                <line data-drop x1={gx + 25} y1="140" x2={gx + 25} y2="178" className={s.hair} strokeDasharray="3 3" style={{ transformBox: "fill-box", transformOrigin: "50% 0" }} />
              </g>
            );
          })}
          <text x="6" y="196" className={s.monoSmM}>English subtitle track</text>
          {LANG.map((_, g) => {
            const gx = 6 + g * 54;
            return (
              <g key={g} data-seg>
                <rect x={gx} y="206" width="50" height="28" rx="2" className={s.cobaltSoft} />
                <text x={gx + 7} y="224" className={`${s.monoSmM} ${s.cobaltText}`}>EN {String(g + 1).padStart(2, "0")}</text>
              </g>
            );
          })}
          <line x1="6" y1="250" x2="330" y2="250" className={s.hair} />
          <text x="6" y="270" className={s.monoSmM}>00:00</text>
          <text x="330" y="270" textAnchor="end" className={s.monoSmM}>10:00 max</text>
          {["SRT", "VTT", "MP4"].map((f, i) => (
            <g key={f} data-export>
              <rect x={6 + i * 110} y="292" width="100" height="34" className={s.amberSoft} />
              <text x={56 + i * 110} y="314" textAnchor="middle" className={`${s.monoM} ${s.amberText}`}>{f}</text>
            </g>
          ))}
          <text x="6" y="356" className={s.monoSmM}>+ optional AI dubbing</text>
        </svg>
      </Stage>
    </div>
  );
}
