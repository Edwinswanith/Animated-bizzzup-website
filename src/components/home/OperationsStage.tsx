"use client";

import { useRef } from "react";
import { useScene } from "@/lib/motion";
import { Stage } from "./Stage";
import { stageTimeline } from "./stageMotion";
import s from "./svg.module.css";

/* Saloon Management System for Priya Natural Care (/work/saloon): 7 branches, 600+ customers,
   1,000+ transaction records on one system; low-stock alerts at ≤5 units.
   Kanaka Gold Loan (/work/kanaka-gold-loan): estimate, apply, KYC, documents, appointment, track,
   repay, with server-side rules for rate snapshots, LTV and fees. */
const BRANCHES = 7;
const ROWS = 5;
const LOAN = ["Estimate", "Apply", "KYC", "Documents", "Appointment", "Track", "Repay"];

export function OperationsStage() {
  const ref = useRef<HTMLDivElement>(null);
  useScene(ref, (ctx) => {
    const { tl, q } = stageTimeline(ctx);
    tl.from(q("[data-ledger]"), {
      x: (i: number) => [-22, 16, -8, 26, -18, 10, -30][i],
      y: (i: number) => [34, -26, 52, -12, 20, -40, 8][i],
      rotation: (i: number) => [-6, 4, -3, 7, -5, 3, -8][i],
      transformOrigin: "50% 50%",
      duration: 1.1,
    }, 0)
      .from(q("[data-row]"), { scaleX: (i: number) => 0.35 + ((i * 29) % 13) / 13, fill: "#b8b1a5", transformOrigin: "0 50%", duration: 1, stagger: 0.004 }, 0)
      .from(q("[data-head]"), { fill: "#d6d0c6", duration: 0.4 }, 0.9)
      .from(q("[data-system]"), { scaleX: 0, transformOrigin: "50% 50%", duration: 0.5 }, 1.1)
      .from(q("[data-count]"), { opacity: 0, y: 10, duration: 0.3, stagger: 0.15 }, 1.3)
      .from(q("[data-rule]"), { opacity: 0, duration: 0.3 }, 1.8)
      .from(q("[data-state]"), { fill: "#ece8e1", stroke: "#a9a297", duration: 0.25, stagger: 0.18 }, 1.9)
      .from(q("[data-edge-line]"), { strokeDashoffset: 1, duration: 0.25, stagger: 0.18 }, 2.0)
      .from(q("[data-rules]"), { opacity: 0, duration: 0.4 }, 3.1);
  });

  const colW = 92, x0 = 20, gap = 16;
  return (
    <div ref={ref}>
      <Stage
        bare
        id="operations"
        system="Saloon Management System · Kanaka Gold Loan"
        caption="Seven branch ledgers become one operations system with shared rules; a secured loan becomes an explicit, auditable sequence of states."
      >
        <svg data-wide className={s.wide} viewBox="0 0 1100 420" role="img" aria-label="Seven separate branch ledgers align into one system: 7 branches, 600+ customers, 1,000+ transaction records, with a low-stock rule at 5 units or fewer. Below, a loan journey as states: estimate, apply, KYC, documents, appointment, track, repay, governed by server-side rules for rate snapshots, LTV and fees.">
          <rect data-system x={x0} y="14" width={BRANCHES * (colW + gap) - gap} height="22" className={s.cobaltSoft} />
          <text x={x0 + 10} y="29" className={`${s.mono} ${s.cobaltText}`}>One operations system</text>
          {Array.from({ length: BRANCHES }, (_, b) => {
            const x = x0 + b * (colW + gap);
            return (
              <g key={b} data-ledger>
                <rect x={x} y="48" width={colW} height="150" className={s.paper} />
                <rect data-head x={x} y="48" width={colW} height="22" fill="var(--cobalt-soft)" />
                <text x={x + 8} y="63" className={s.monoSm}>Branch {b + 1}</text>
                {Array.from({ length: ROWS }, (_, r) => (
                  <rect key={r} data-row x={x + 8} y={82 + r * 22} width={colW - 16} height="10" rx="1" fill="var(--sand)" />
                ))}
              </g>
            );
          })}
          {[
            ["7", "branches"],
            ["600+", "customers"],
            ["1,000+", "transaction records"],
          ].map(([v, l], i) => (
            <g key={l} data-count>
              <text x="800" y={76 + i * 52} className={s.ink} style={{ font: "400 32px var(--serif)" }}>{v}</text>
              <text x="800" y={94 + i * 52} className={s.monoSm}>{l}</text>
            </g>
          ))}
          <g data-rule>
            <rect x="800" y="210" width="262" height="26" className={s.amberSoft} />
            <text x="810" y="227" className={`${s.monoSm} ${s.amberText}`}>Stock ≤ 5 units → low-stock alert</text>
          </g>

          {/* Loan lifecycle */}
          <text x={x0} y="262" className={s.monoSm}>Secured loan · explicit states</text>
          {LOAN.map((st, i) => {
            const cx = x0 + 40 + i * 150;
            return (
              <g key={st}>
                {i > 0 && <line data-edge-line x1={cx - 150 + 12} y1="300" x2={cx - 12} y2="300" pathLength={1} className={s.cobaltLine} />}
                <circle data-state cx={cx} cy="300" r="9" fill="var(--cobalt)" stroke="var(--cobalt)" strokeWidth="1.5" />
                <text x={cx} y="332" textAnchor="middle" className={s.mono}>{st}</text>
              </g>
            );
          })}
          <g data-rules>
            {["Rate snapshot", "LTV", "Fees"].map((r, i) => (
              <g key={r}>
                <rect x={x0 + 150 + i * 132} y="358" width="120" height="24" className={s.amberSoft} />
                <text x={x0 + 160 + i * 132} y="374" className={`${s.monoSm} ${s.amberText}`}>{r}</text>
              </g>
            ))}
            <text x={x0 + 560} y="374" className={s.monoSm}>server-side rules, not manual steps</text>
          </g>
        </svg>
        {/* Portrait composition (< 900px) */}
        <svg data-tall className={s.tall} viewBox="0 0 340 630" role="img" aria-label="Seven branch ledgers align into one operations system: 7 branches, 600+ customers, 1,000+ transaction records, with a low-stock rule at 5 units or fewer. Below, a secured loan as explicit states from estimate to repay, governed by server-side rules for rate snapshots, LTV and fees.">
          <rect data-system x="6" y="6" width="328" height="26" className={s.cobaltSoft} />
          <text x="16" y="24" className={`${s.monoM} ${s.cobaltText}`}>One operations system</text>
          {Array.from({ length: BRANCHES }, (_, b) => {
            const row = b < 4 ? 0 : 1;
            const x = row ? 48 + (b - 4) * 84 : 6 + b * 84;
            const y = row ? 152 : 44;
            return (
              <g key={b} data-ledger>
                <rect x={x} y={y} width="76" height="96" className={s.paper} />
                <rect data-head x={x} y={y} width="76" height="20" fill="var(--cobalt-soft)" />
                <text x={x + 7} y={y + 14} className={s.monoSmM}>Branch {b + 1}</text>
                {[0, 1, 2].map((r) => <rect key={r} data-row x={x + 8} y={y + 34 + r * 18} width="60" height="8" rx="1" fill="var(--sand)" />)}
              </g>
            );
          })}
          {[["7", "branches", ""], ["600+", "customers", ""], ["1,000+", "transaction", "records"]].map(([v, l1, l2], i) => (
            <g key={l1} data-count>
              <text x={6 + i * 114} y="286" className={s.ink} style={{ font: "400 28px var(--serif)" }}>{v}</text>
              <text x={6 + i * 114} y="304" className={s.monoSmM}>{l1}</text>
              {l2 && <text x={6 + i * 114} y="318" className={s.monoSmM}>{l2}</text>}
            </g>
          ))}
          <g data-rule>
            <rect x="6" y="334" width="328" height="28" className={s.amberSoft} />
            <text x="16" y="352" className={`${s.monoSmM} ${s.amberText}`}>Stock ≤ 5 units → low-stock alert</text>
          </g>
          <text x="6" y="398" className={s.monoSmM}>Secured loan · explicit states</text>
          {LOAN.map((st, i) => {
            const cy = 424 + i * 30;
            return (
              <g key={st}>
                {i > 0 && <line data-edge-line x1="24" y1={cy - 30 + 9} x2="24" y2={cy - 9} pathLength={1} className={s.cobaltLine} />}
                <circle data-state cx="24" cy={cy} r="8" fill="var(--cobalt)" stroke="var(--cobalt)" strokeWidth="1.5" />
                <text x="44" y={cy + 4} className={s.monoM}>{st}</text>
              </g>
            );
          })}
          <g data-rules>
            {["Rate snapshot", "LTV", "Fees"].map((r, i) => (
              <g key={r}>
                <rect x="196" y={440 + i * 36} width="138" height="26" className={s.amberSoft} />
                <text x="206" y={457 + i * 36} className={`${s.monoSmM} ${s.amberText}`}>{r}</text>
              </g>
            ))}
            <text x="196" y="560" className={s.monoSmM}>server-side rules,</text>
            <text x="196" y="575" className={s.monoSmM}>not manual steps</text>
          </g>
        </svg>
      </Stage>
    </div>
  );
}
