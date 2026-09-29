"use client";

import { useRef } from "react";
import { useScene } from "@/lib/motion";
import { Stage } from "./Stage";
import { stageTimeline } from "./stageMotion";
import s from "./svg.module.css";

/* DesignT (/work/designt): a plain-English description (plus up to 3 reference images) becomes
   Gemini-generated artwork, previewed live on a t-shirt, then a 4-step checkout:
   Design → Customize → Details → Payment. The prompt shown is a sample; the artwork is an abstract
   code drawing, not a DesignT output. */
const PROMPT = "a quiet wave, indigo, for a black tee";
const RAIL = ["Design", "Customize", "Details", "Payment"];

export function ProductsStage() {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, (ctx) => {
    const { tl, q } = stageTimeline(ctx);
    const artFrom = ctx.desktop ? { x: -210, y: -8, scale: 1.25 } : { y: -110, scale: 1.2 };
    tl.from(q("[data-char]"), { opacity: 0, duration: 0.05, stagger: 0.02 }, 0.1)
      .from(q("[data-arc]"), { strokeDashoffset: 1, duration: 0.6, stagger: 0.12 }, 0.9)
      .from(q("[data-art]"), { ...artFrom, transformOrigin: "50% 50%", duration: 0.8 }, 1.8)
      .from(q("[data-shirt]"), { opacity: 0.25, duration: 0.6 }, 1.6)
      .from(q("[data-step]"), { fill: "#ece8e1", stroke: "#a9a297", duration: 0.2, stagger: 0.2 }, 2.6)
      .from(q("[data-rail]"), { strokeDashoffset: 1, duration: 0.8 }, 2.6);
  });

  const arcs = [0, 1, 2, 3, 4];
  return (
    <div ref={ref}>
      <Stage
        id="products"
        system="DesignT · AI t-shirt design studio"
        caption="A sentence becomes artwork, the artwork becomes a product on a live mockup, and the product moves through a four-step checkout."
      >
        <svg data-wide className={s.wide} viewBox="0 0 600 400" role="img" aria-label="A typed description becomes an abstract wave artwork, which moves onto a t-shirt mockup, followed by a four-step checkout: design, customize, details, payment.">
          <text x="20" y="30" className={s.monoSm}>Sample description</text>
          <text x="20" y="58" className={s.serif}>
            “{PROMPT.split("").map((c, i) => <tspan key={i} data-char>{c}</tspan>)}”
          </text>

          {/* Shirt */}
          <path data-shirt d="M 380 104 L 420 90 Q 450 108 480 90 L 520 104 L 556 150 L 526 166 L 516 150 L 516 300 L 384 300 L 384 150 L 374 166 L 344 150 Z" fill="var(--ink)" />
          {/* Artwork: abstract concentric arcs */}
          <g data-art>
            {arcs.map((a) => (
              <path key={a} data-arc d={`M ${418 - a * 7} ${214} A ${32 + a * 7} ${32 + a * 7} 0 0 1 ${482 + a * 7} ${214}`} pathLength={1} fill="none" stroke="#6b73e8" strokeWidth="3" strokeDasharray="1" />
            ))}
          </g>
          <text x="450" y="326" textAnchor="middle" className={s.monoSm}>Live mockup</text>

          {/* Checkout rail */}
          <line data-rail x1="40" y1="360" x2="560" y2="360" pathLength={1} className={s.cobaltLine} />
          {RAIL.map((r, i) => {
            const x = 40 + i * (520 / 3);
            return (
              <g key={r}>
                <circle data-step cx={x} cy="360" r="8" fill="var(--cobalt)" stroke="var(--cobalt)" strokeWidth="1.5" />
                <text x={x} y="388" textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"} dx={i === 0 ? -8 : i === 3 ? 8 : 0} className={s.mono}>{r}</text>
              </g>
            );
          })}
        </svg>
        {/* Portrait composition (< 900px) */}
        <svg data-tall className={s.tall} viewBox="0 0 340 452" role="img" aria-label="A typed description becomes an abstract wave artwork on a t-shirt mockup, followed by a four-step checkout: design, customize, details, payment.">
          <text x="6" y="18" className={s.monoSmM}>Sample description</text>
          <text x="6" y="46" className={s.serif}>“{"a quiet wave, indigo,".split("").map((c, i) => <tspan key={i} data-char>{c}</tspan>)}</text>
          <text x="6" y="70" className={s.serif}>{"for a black tee".split("").map((c, i) => <tspan key={i} data-char>{c}</tspan>)}”</text>
          <g transform="translate(-280 30)">
            <path data-shirt d="M 380 104 L 420 90 Q 450 108 480 90 L 520 104 L 556 150 L 526 166 L 516 150 L 516 300 L 384 300 L 384 150 L 374 166 L 344 150 Z" fill="var(--ink)" />
            <g data-art>
              {arcs.map((a) => (
                <path key={a} data-arc d={`M ${418 - a * 7} ${214} A ${32 + a * 7} ${32 + a * 7} 0 0 1 ${482 + a * 7} ${214}`} pathLength={1} fill="none" stroke="#6b73e8" strokeWidth="3" strokeDasharray="1" />
              ))}
            </g>
          </g>
          <text x="170" y="360" textAnchor="middle" className={s.monoSmM}>Live mockup</text>
          <line data-rail x1="20" y1="404" x2="320" y2="404" pathLength={1} className={s.cobaltLine} />
          {RAIL.map((r, i) => (
            <g key={r}>
              <circle data-step cx={20 + i * 100} cy="404" r="8" fill="var(--cobalt)" stroke="var(--cobalt)" strokeWidth="1.5" />
              <text x={20 + i * 100} y="432" textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"} dx={i === 0 ? -8 : i === 3 ? 8 : 0} className={s.monoSmM}>{r}</text>
            </g>
          ))}
        </svg>
      </Stage>
    </div>
  );
}
