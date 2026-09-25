"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, PROJECTS, type ProjectDetails } from "@/data/projects";
import Contact from "@/components/sections/Contact";

/* ------------------------------------------------------------------ */
/*  BIZZZUP: The Connected Build, the full homepage journey            */
/*                                                                     */
/*  One pinned stage (the generated light studio, always the same      */
/*  camera) sits behind the page; the chapters scroll over it in       */
/*  normal flow and drive what the stage shows:                        */
/*   01 Ideas and inputs  rigid HTML panes assemble onto Plate 2       */
/*   02 Real products     real screenshots mapped onto the displays    */
/*   03 Connected systems Plate 4, the display opened into 4 layers    */
/*   04 How we build      Plate 5, the layers along the delivery rail  */
/*   05 Proof             Plate 6 behind an editorial reading veil      */
/*   06 Start             Plate 6, the empty frame, beside the form     */
/*  Generated plates never contain interface text. Every screen is a   */
/*  real product screenshot placed by the page.                        */
/*  GATES must match journey.css.                                      */
/* ------------------------------------------------------------------ */

const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

type Pt = [number, number];
type Quad = [Pt, Pt, Pt, Pt];
const px = (x: number, y: number): Pt => [x / 1920, y / 1080];

/* Measured on the plates (review/light/veo-inputs/*-1080.png) */
const FACE_1: Quad = [px(908, 225), px(1695, 199), px(1692, 729), px(908, 695)];
const SCREEN_1: Quad = [px(908, 225), px(1695, 199), px(1692, 719), px(908, 686)];
const SCREEN_2: Quad = [px(909, 307), px(1698, 283), px(1694, 800), px(909, 758)];
const SERVICE_PANES: { tl: Pt; tr: Pt }[] = [
  { tl: px(868, 341), tr: px(1649, 321) },
  { tl: px(926, 302), tr: px(1626, 283) },
  { tl: px(984, 261), tr: px(1695, 232) },
  { tl: px(1042, 223), tr: px(1768, 184) },
];
const STEP_ANCHORS: Pt[] = [px(984, 300), px(1195, 292), px(1403, 284), px(1636, 268)];
const RAIL: [Pt, Pt] = [px(830, 784), px(1926, 842)];
const NEXT_BUILD_TAG: Pt = px(1355, 270);

const PANES = [
  { key: "doc", dx: -0.092, dy: -0.2, rx: 42, ry: -12, rz: -7, s: 0.58, delay: 0.0 },
  { key: "wave", dx: 0.03, dy: -0.05, rx: 40, ry: -14, rz: 6, s: 0.56, delay: 0.08 },
  { key: "flow", dx: -0.077, dy: 0.13, rx: 44, ry: -10, rz: -8, s: 0.58, delay: 0.16 },
  { key: "app", dx: 0.036, dy: 0.3, rx: 40, ry: -12, rz: 5, s: 0.6, delay: 0.24 },
] as const;

/* Service lines: copy from FeatureCards (the source of truth on the current site) */
const SERVICES = [
  { title: "AI Agents & Automation", tag: "Automation", href: "/services/ai-agent-development", description: "Custom agents for research, support, sales, operations, reporting, CRM updates, and internal workflows. Workflows that execute, not just assist." },
  { title: "AI Product MVPs", tag: "Product Engineering", href: "/services/ai-mvp-development", description: "Full-stack web and mobile products, from idea to deployed product, built around one or two valuable AI features." },
  { title: "Custom Business Software", tag: "Software", href: "/services/custom-business-software", description: "CRM, POS, billing, inventory, dashboards, admin panels, and internal tools built around how a business actually runs." },
  { title: "Voice & RAG Platforms", tag: "Voice & Retrieval", href: "/services", description: "Voice assistants, meeting and consultation intelligence, document search, knowledge bots, and retrieval systems grounded in client data." },
];

/* Delivery steps: copy from FlagshipProcess */
const STEPS = [
  { title: "Scope", description: "20-minute call, then a 2-page proposal. Fixed scope, fixed price, and 50% advance to begin." },
  { title: "Build", description: "Demo every Friday. The client watches the product take shape week by week. No black box." },
  { title: "Launch", description: "Live in 45 days: deployed, tested, documented, and handed over properly." },
  { title: "Grow", description: "Monthly retainer for iterations, fixes, monitoring, and new features after launch." },
];

/* Proof: copy from ProofAndTrust, Testimonials and TeamPreview */
const STATS = [
  { value: "15", label: "selected builds" },
  { value: "12", label: "delivered or live" },
  { value: "45 days", label: "fixed delivery window" },
];
const OUTCOMES = [
  "Priya Natural Care: 7 branches on one operations system",
  "Cogniverse: production-ready healthcare voice assistant",
  "Intuitive Neurons: AI note editor from concept to product",
];
const TESTIMONIALS = [
  { quote: "Bizzzup took our AI note editor from concept to a working product, with visible progress every single week. They build fast, and they build properly.", name: "Conroy Brown", role: "Intuitive Neurons", project: "AI Note Editor, SaaS MVP" },
  { quote: "They delivered our healthcare voice assistant production-ready, including consultations, scheduling, and prescriptions. It works, and it shipped on time.", name: "Rahul", role: "CEO, Cogniverse", project: "Healthcare voice assistant", caseStudySlug: "doctor-ai" },
];
const TEAM = [
  { name: "Suhail", role: "Founder · Principal Design", photo: "/team/suhail.png" },
  { name: "Edwin Swanith", role: "Co-Founder · AI/ML", photo: "/team/edwin.png" },
  { name: "Kishore", role: "AI Engineer", photo: "/team/kishore.jpg" },
  { name: "Vikram", role: "AI Engineer", photo: "/team/vikram.jpeg" },
];

const MORE_SLUGS = ["meridian", "saloon", "lawyer-ai", "mediscribe"];
const CHAPTERS = [
  { id: "ch-hero", label: "Ideas and inputs" },
  { id: "ch-caption", label: "Real products" },
  { id: "ch-services", label: "Connected systems" },
  { id: "ch-process", label: "How we build" },
  { id: "ch-trust", label: "Proof" },
  { id: "ch-contact", label: "Start your project" },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (p: number, a: number, b: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function homography(w: number, h: number, q: Pt[]): string {
  const src: Pt[] = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  const B: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = q[i];
    A.push([x, y, 1, 0, 0, 0, -x * u, -y * u]); B.push(u);
    A.push([0, 0, 0, x, y, 1, -x * v, -y * v]); B.push(v);
  }
  for (let c = 0; c < 8; c++) {
    let piv = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r;
    [A[c], A[piv]] = [A[piv], A[c]];
    [B[c], B[piv]] = [B[piv], B[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      B[r] -= f * B[c];
    }
  }
  const [a, b, c2, d, e, f, g, hh] = B.map((v, i) => v / A[i][i]);
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c2},${f},0,1)`;
}

function Symbol({ kind }: { kind: string }) {
  const stroke = { stroke: "currentColor", strokeWidth: 3, fill: "none", strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 400 250" className="cb-symbol" aria-hidden="true">
      {kind === "doc" && [60, 85, 110, 135, 160, 185].map((y, i) => <line key={y} x1={130 + (i % 3) * 12} y1={y} x2={290 - (i % 2) * 30} y2={y} {...stroke} />)}
      {kind === "wave" && <path d="M40 125 H150 L160 105 L170 150 L180 80 L192 170 L204 95 L214 140 L224 115 L234 128 H360" {...stroke} />}
      {kind === "flow" && (
        <g {...stroke}>
          <circle cx="120" cy="125" r="14" /><circle cx="200" cy="125" r="14" /><circle cx="280" cy="125" r="14" />
          <line x1="134" y1="125" x2="186" y2="125" /><line x1="214" y1="125" x2="266" y2="125" />
        </g>
      )}
      {kind === "app" && (
        <g fill="currentColor" opacity="0.55">
          <rect x="60" y="45" width="190" height="45" rx="6" /><rect x="265" y="45" width="75" height="45" rx="6" />
          <rect x="60" y="105" width="190" height="100" rx="6" /><rect x="265" y="105" width="75" height="42" rx="6" />
          <rect x="265" y="160" width="75" height="45" rx="6" />
        </g>
      )}
    </svg>
  );
}

function Screen({ quad, src, alt, className, portrait }: { quad: Quad; src: string; alt: string; className: string; portrait?: boolean }) {
  return (
    <div className={`cb-quad ${className}${portrait ? " is-portrait" : ""}`} data-quad={JSON.stringify(quad)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

/* A still of one plate with its overlays, for the static sequence */
function StaticPlate({ src, children, focus }: { src: string; children?: React.ReactNode; focus: string }) {
  return (
    <figure className={`jr-fig jr-fig--${focus}`}>
      <div className="jr-fig-zoom">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="cb-plate" src={src} alt="" loading="lazy" decoding="async" />
        {children}
      </div>
    </figure>
  );
}

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ProjectCopy({ p, note }: { p: ProjectDetails; note: string }) {
  return (
    <>
      <p className="cb-kicker"><span>02 / Real products</span><span className="cb-kicker-note">{note}</span></p>
      <h2 className="cb-project-name">{p.name}</h2>
      <p className="cb-project-tagline">{p.tagline}</p>
      <p className="cb-status"><span className="cb-status-dot" aria-hidden="true" />{p.status}<span className="cb-status-sep" aria-hidden="true">·</span>{p.category}</p>
      <p className="cb-project-context">{p.context}</p>
      <div className="cb-project-links">
        <Link href={`/work/${p.slug}`} className="group cb-link">Read the {p.name} case study <Arrow /></Link>
      </div>
    </>
  );
}

export default function ConnectedJourney() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeMore, setActiveMore] = useState(0);
  const hoverRef = useRef<number | null>(null);
  const setMoreRef = useRef(setActiveMore);
  setMoreRef.current = setActiveMore;

  const caption = getProjectBySlug("caption-cc")!;
  const medi = getProjectBySlug("doctor-ai")!;
  const more = MORE_SLUGS.map((s) => getProjectBySlug(s)!).filter(Boolean);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stage = root.querySelector<HTMLElement>(".jr-stage")!;
    const cover = root.querySelector<HTMLElement>(".jr-stage .cb-cover")!;
    const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
    const panes = Array.from(root.querySelectorAll<HTMLElement>(".jr-stage .cb-pane"));
    const L = {
      display1: q(".jr-display-1"), screen1: q(".jr-stage .jr-screen-1"), display2: q(".jr-display-2"),
      screens2: Array.from(root.querySelectorAll<HTMLElement>(".jr-stage .jr-screen-2")),
      services: q(".jr-plate-services"), process: q(".jr-plate-process"), next: q(".jr-plate-next"),
      markers: Array.from(root.querySelectorAll<HTMLElement>(".jr-stage .jr-marker")),
      edges: Array.from(root.querySelectorAll<HTMLElement>(".jr-stage .jr-edge")),
      steps: Array.from(root.querySelectorAll<HTMLElement>(".jr-stage .jr-step-tag")),
      rail: q<HTMLElement>(".jr-stage .jr-rail-line"),
      nextTag: q(".jr-stage .jr-next-tag"),
      veil: q(".jr-veil"),
      rail2: q(".jr-chapters"),
      chapterEls: Array.from(root.querySelectorAll<HTMLElement>(".jr-chapter-item")),
      serviceItems: Array.from(root.querySelectorAll<HTMLElement>(".jr-flow .jr-service")),
      stepItems: Array.from(root.querySelectorAll<HTMLElement>(".jr-flow .jr-step")),
    };
    const chapters = Object.fromEntries(
      ["ch-hero", "ch-caption", "ch-medi", "ch-more", "ch-services", "ch-process", "ch-trust", "ch-contact"].map((id) => [id, q<HTMLElement>(`#${id}`)]),
    );

    /* ---------- geometry ---------- */
    let facePx: Pt[] = [];
    let paneW = 0, paneH = 0, W = 0, H = 0;
    const tops: Record<string, [number, number]> = {};
    const place = (el: HTMLElement, p: Pt, box: HTMLElement) => {
      el.style.left = `${(p[0] * 100).toFixed(3)}%`;
      el.style.top = `${(p[1] * 100).toFixed(3)}%`;
      void box;
    };
    const layout = () => {
      root.querySelectorAll<HTMLElement>(".cb-quad").forEach((el) => {
        const box = el.parentElement!;
        const bw = box.clientWidth, bh = box.clientHeight;
        if (!bw || !bh) return;
        const qd = (JSON.parse(el.dataset.quad!) as Quad).map(([x, y]) => [x * bw, y * bh] as Pt);
        const w = Math.round((qd[1][0] - qd[0][0] + qd[2][0] - qd[3][0]) / 2);
        const h = Math.round((qd[3][1] - qd[0][1] + qd[2][1] - qd[1][1]) / 2);
        el.style.width = `${w}px`; el.style.height = `${h}px`;
        el.style.transform = homography(w, h, qd);
      });
      W = cover.clientWidth; H = cover.clientHeight;
      facePx = FACE_1.map(([x, y]) => [x * W, y * H] as Pt);
      paneW = Math.round((facePx[1][0] - facePx[0][0] + facePx[2][0] - facePx[3][0]) / 2);
      paneH = Math.round((facePx[3][1] - facePx[0][1] + facePx[2][1] - facePx[1][1]) / 2);
      panes.forEach((el) => { el.style.width = `${paneW}px`; el.style.height = `${paneH}px`; });
      /* service markers and edge lines */
      L.markers.forEach((el, i) => place(el, SERVICE_PANES[i].tl, cover));
      L.edges.forEach((el, i) => {
        const { tl, tr } = SERVICE_PANES[i];
        const x1 = tl[0] * W, y1 = tl[1] * H, x2 = tr[0] * W, y2 = tr[1] * H;
        el.style.left = `${x1}px`; el.style.top = `${y1}px`;
        el.style.width = `${Math.hypot(x2 - x1, y2 - y1)}px`;
        el.style.transform = `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`;
      });
      L.steps.forEach((el, i) => place(el, STEP_ANCHORS[i], cover));
      place(L.nextTag, NEXT_BUILD_TAG, cover);
      const [r0, r1] = RAIL;
      const rx1 = r0[0] * W, ry1 = r0[1] * H, rx2 = r1[0] * W, ry2 = r1[1] * H;
      L.rail.style.left = `${rx1}px`; L.rail.style.top = `${ry1}px`;
      L.rail.style.width = `${Math.hypot(rx2 - rx1, ry2 - ry1)}px`;
      L.rail.style.transform = `rotate(${Math.atan2(ry2 - ry1, rx2 - rx1)}rad) scaleX(var(--draw, 0))`;
      for (const [id, el] of Object.entries(chapters)) {
        const r = el.getBoundingClientRect();
        tops[id] = [r.top + window.scrollY, el.offsetHeight];
      }
      cache.clear();
      render();
    };

    /* ---------- delta-gated writes ---------- */
    const cache = new Map<string, string>();
    let uid = 0;
    const set = (el: HTMLElement, prop: string, val: string) => {
      const id = el.dataset.jid ?? (el.dataset.jid = String(uid++));
      const key = id + prop;
      if (cache.get(key) === val) return;
      cache.set(key, val);
      el.style.setProperty(prop, val);
    };
    const setClass = (el: HTMLElement, cls: string, on: boolean) => {
      if (el.classList.contains(cls) !== on) el.classList.toggle(cls, on);
    };

    /* ---------- scroll -> chapter progress ---------- */
    let y = 0;
    const vh = () => window.innerHeight;
    const enter = (id: string) => clamp01((y + vh() - tops[id][0]) / vh());
    const local = (id: string) => clamp01((y - tops[id][0]) / Math.max(1, tops[id][1] - vh()));

    const render = () => {
      if (!paneW || !tops["ch-hero"]) return;
      /* 01 hero: panes assemble onto the display (exact face corners), photo takes over */
      const a = local("ch-hero");
      const Hm = homography(paneW, paneH, facePx);
      const cx = facePx.reduce((s, p) => s + p[0], 0) / 4;
      const cy = facePx.reduce((s, p) => s + p[1], 0) / 4;
      const paneFade = 1 - smooth(a, 0.86, 0.96);
      panes.forEach((el, i) => {
        const c = PANES[i];
        const t = easeInOut(clamp01((a - 0.05 - c.delay * 0.35) / 0.55));
        const k = 1 - t;
        set(el, "transform",
          `translate(${(cx + c.dx * W * k).toFixed(2)}px,${(cy + c.dy * H * k).toFixed(2)}px) perspective(1600px) ` +
          `rotateX(${(c.rx * k).toFixed(3)}deg) rotateY(${(c.ry * k).toFixed(3)}deg) rotateZ(${(c.rz * k).toFixed(3)}deg) ` +
          `scale(${(c.s + (1 - c.s) * t).toFixed(4)}) translate(${(-cx).toFixed(2)}px,${(-cy).toFixed(2)}px) ${Hm}`);
        set(el, "--mark", (1 - smooth(t, 0.55, 0.9)).toFixed(3));
        set(el, "--rim", (1 - smooth(t, 0.6, 1)).toFixed(3));
        set(el, "opacity", paneFade.toFixed(3));
      });
      set(L.display1, "opacity", smooth(a, 0.82, 0.95).toFixed(3));

      /* 02 real products */
      const eCap = enter("ch-caption");
      const eMedi = enter("ch-medi");
      set(L.screen1, "opacity", (smooth(eCap, 0.35, 0.8) * (1 - smooth(eMedi, 0.1, 0.35))).toFixed(3));
      set(L.display2, "opacity", smooth(eMedi, 0.38, 0.58).toFixed(3));
      const eMore = enter("ch-more");
      const lMore = local("ch-more");
      const scrollIdx = eMore < 0.6 ? 0 : 1 + Math.min(3, Math.floor(lMore * 4));
      const idx = hoverRef.current ?? scrollIdx;
      const eSvc = enter("ch-services");
      const screensOut = 1 - smooth(eSvc, 0.05, 0.3);
      L.screens2.forEach((el, i) => {
        const base = i === idx ? 1 : 0;
        set(el, "opacity", (base * smooth(eMedi, 0.6, 0.95) * screensOut).toFixed(3));
      });
      setMoreRef.current(idx > 0 ? idx - 1 : -1);

      /* 03 connected systems: Plate 4 */
      const lSvc = local("ch-services");
      const eProc = enter("ch-process");
      set(L.services, "opacity", smooth(eSvc, 0.3, 0.7).toFixed(3));
      const markersIn = smooth(eSvc, 0.6, 0.95) * (1 - smooth(eProc, 0.1, 0.35));
      const svcActive = eSvc < 0.95 ? -1 : Math.min(3, Math.floor(lSvc * 4));
      L.markers.forEach((el, i) => { set(el, "opacity", markersIn.toFixed(3)); setClass(el, "is-active", i === svcActive); });
      L.edges.forEach((el, i) => set(el, "opacity", (i === svcActive ? markersIn : 0).toFixed(3)));
      L.serviceItems.forEach((el, i) => setClass(el, "is-active", i === svcActive));

      /* 04 how we build: Plate 5, the rail */
      const lProc = local("ch-process");
      const eTrust = enter("ch-trust");
      set(L.process, "opacity", smooth(eProc, 0.3, 0.7).toFixed(3));
      const stepsIn = smooth(eProc, 0.6, 0.95) * (1 - smooth(eTrust, 0.05, 0.3));
      const stepActive = eProc < 0.95 ? -1 : Math.min(3, Math.floor(lProc * 4));
      L.steps.forEach((el, i) => { set(el, "opacity", stepsIn.toFixed(3)); setClass(el, "is-active", i === stepActive); setClass(el, "is-done", i < stepActive); });
      L.stepItems.forEach((el, i) => { setClass(el, "is-active", i === stepActive); setClass(el, "is-done", i < stepActive); });
      set(L.rail, "--draw", (eProc < 0.95 ? 0 : clamp01(lProc * 1.1)).toFixed(3));
      set(L.rail, "opacity", stepsIn.toFixed(3));

      /* 05 proof: quiet reading over Plate 6; 06 contact: the empty frame shows again */
      const eContact = enter("ch-contact");
      set(L.next, "opacity", smooth(eTrust, 0.2, 0.6).toFixed(3));
      const veil = smooth(eTrust, 0.1, 0.55) * 0.88 * (1 - 0.55 * smooth(eContact, 0.2, 0.7));
      set(L.veil, "opacity", veil.toFixed(3));
      set(L.nextTag, "opacity", (smooth(eContact, 0.4, 0.8)).toFixed(3));
      set(L.rail2, "opacity", (1 - smooth(eTrust, 0.05, 0.35)).toFixed(3));

      /* chapter rail */
      const current = ["ch-contact", "ch-trust", "ch-process", "ch-services", "ch-caption", "ch-hero"].find((id) => enter(id) > 0.55 || id === "ch-hero")!;
      const order = CHAPTERS.map((c) => c.id);
      const ci = order.indexOf(current === "ch-medi" || current === "ch-more" ? "ch-caption" : current);
      L.chapterEls.forEach((el, i) => { setClass(el, "is-active", i === ci); setClass(el, "is-done", i < ci); });
    };

    /* ---------- resting rAF loop ---------- */
    let target = 0;
    let raf: number | null = null;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      y += (target - y) * (1 - Math.pow(1 - 0.2, dt / 16.667));
      if (Math.abs(target - y) < 0.5) { y = target; raf = null; last = 0; }
      else raf = requestAnimationFrame(tick);
      render();
    };
    const onScroll = () => {
      target = window.scrollY;
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => layout());
    ro.observe(root);
    ro.observe(stage);

    let on = false;
    const enable = () => {
      if (on) return;
      on = true;
      root.classList.add("is-live");
      window.addEventListener("scroll", onScroll, { passive: true });
      y = target = window.scrollY;
      layout();
    };
    const disable = () => {
      if (!on) return;
      on = false;
      root.classList.remove("is-live");
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      cache.clear();
      layout();
    };
    const MQLS = GATES.map((m) => window.matchMedia(m));
    const apply = () => (MQLS.some((m) => m.matches) ? disable() : enable());
    MQLS.forEach((m) => m.addEventListener("change", apply));
    apply();
    if (!on) layout();

    return () => {
      disable();
      ro.disconnect();
      MQLS.forEach((m) => m.removeEventListener("change", apply));
    };
  }, []);

  const hoverMore = (i: number | null) => {
    hoverRef.current = i === null ? null : i + 1;
    window.dispatchEvent(new Event("scroll"));
  };

  return (
    <div ref={rootRef} className="jr">
      {/* ── The studio stage (desktop) ── */}
      <div className="jr-stage" aria-hidden="true">
        <div className="cb-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cb-plate" src="/connected/room.jpg" alt="" loading="lazy" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cb-plate jr-layer jr-display-1" src="/connected/display-1.jpg" alt="" loading="lazy" decoding="async" />
          <Screen quad={SCREEN_1} src={caption.image} alt="" className="jr-layer jr-screen-1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cb-plate jr-layer jr-display-2" src="/connected/display-2.jpg" alt="" loading="lazy" decoding="async" />
          {[medi, ...more].map((p) => (
            <Screen key={p.slug} quad={SCREEN_2} src={p.image} alt="" className="jr-layer jr-screen-2" portrait={p.slug === "mediscribe"} />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cb-plate jr-layer jr-plate-services" src="/connected/services.jpg" alt="" loading="lazy" decoding="async" />
          {SERVICE_PANES.map((_, i) => <span key={`e${i}`} className="jr-edge" />)}
          {SERVICE_PANES.map((_, i) => <span key={`m${i}`} className="jr-marker">{String(i + 1).padStart(2, "0")}</span>)}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cb-plate jr-layer jr-plate-process" src="/connected/process.jpg" alt="" loading="lazy" decoding="async" />
          <span className="jr-rail-line" />
          {STEPS.map((s, i) => <span key={s.title} className="jr-step-tag"><b>{String(i + 1).padStart(2, "0")}</b> {s.title}</span>)}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cb-plate jr-layer jr-plate-next" src="/connected/next-build.jpg" alt="" loading="lazy" decoding="async" />
          <span className="jr-next-tag">The next build</span>
          {PANES.map((pane) => <div key={pane.key} className={`cb-pane cb-pane-${pane.key}`}><Symbol kind={pane.key} /></div>)}
        </div>
        <div className="jr-veil" />
        <ol className="jr-chapters">
          {CHAPTERS.map((c, i) => (
            <li key={c.id} className="jr-chapter-item"><span>{String(i + 1).padStart(2, "0")}</span> {c.label}</li>
          ))}
        </ol>
      </div>

      {/* ── The chapters (normal flow, over the stage) ── */}
      <div className="jr-flow">
        <section id="ch-hero" className="jr-ch jr-ch--hero" aria-labelledby="hero-title">
          <div className="jr-copy">
            <p className="cb-kicker"><span>01 / Ideas and inputs</span></p>
            <h1 id="hero-title" className="cb-title">AI systems.<span className="cb-title-line">Built for real work.</span></h1>
            <p className="cb-lede">We build AI agents, voice platforms, and custom software around the way your business operates.</p>
            <div className="cb-ctas">
              <a href="#contact" className="clip-corner-md cb-btn-primary">Book an AI audit</a>
              <Link href="/work" className="group cb-btn-secondary">View our work <Arrow /></Link>
            </div>
            <ul className="jr-inputs" aria-label="Scattered inputs">
              {PANES.map((pane) => <li key={pane.key} className="cb-input-chip"><Symbol kind={pane.key} /></li>)}
            </ul>
          </div>
        </section>

        <section id="ch-caption" className="jr-ch" aria-label={`Featured project: ${caption.name}`}>
          <StaticPlate src="/connected/display-1-960.jpg" focus="display-1">
            <Screen quad={SCREEN_1} src={caption.image} alt={`${caption.name}: ${caption.imageLabel} screen`} className="" />
          </StaticPlate>
          <div className="jr-copy"><ProjectCopy p={caption} note="Featured project 1 of 2" /></div>
        </section>

        <section id="ch-medi" className="jr-ch" aria-label={`Featured project: ${medi.name}`}>
          <StaticPlate src="/connected/display-2-960.jpg" focus="display-2">
            <Screen quad={SCREEN_2} src={medi.image} alt={`${medi.name}: ${medi.imageLabel} screen`} className="" />
          </StaticPlate>
          <div className="jr-copy"><ProjectCopy p={medi} note="Featured project 2 of 2" /></div>
        </section>

        <section id="ch-more" className="jr-ch jr-ch--more" aria-labelledby="more-title">
          <div className="jr-copy">
            <p className="cb-kicker"><span>02 / Real products</span><span className="cb-kicker-note">On the display: the selected project</span></p>
            <h2 id="more-title" className="jr-h2">More real products.</h2>
            <ol className="jr-more">
              {more.map((p, i) => (
                <li key={p.slug} className={`jr-more-row${activeMore === i ? " is-active" : ""}`}
                  onMouseEnter={() => hoverMore(i)} onMouseLeave={() => hoverMore(null)}>
                  <Link href={`/work/${p.slug}`} className="jr-more-link" onFocus={() => hoverMore(i)} onBlur={() => hoverMore(null)}>
                    <span className="jr-more-num">{p.number}</span>
                    <span className="jr-more-main">
                      <span className="jr-more-name">{p.name}</span>
                      <span className="jr-more-tag">{p.tagline}</span>
                    </span>
                    <span className="jr-more-status">{p.status}</span>
                  </Link>
                  <span className="jr-more-thumb" aria-hidden="true">
                    <Image src={p.image} alt="" width={320} height={200} sizes="160px" />
                  </span>
                </li>
              ))}
            </ol>
            <Link href="/work" className="group cb-link">View all {PROJECTS.length} projects <Arrow /></Link>
          </div>
        </section>

        <section id="ch-services" className="jr-ch jr-ch--services" aria-labelledby="services-title">
          <StaticPlate src="/connected/services-960.jpg" focus="services">
            {SERVICE_PANES.map((sp, i) => <span key={i} className="jr-marker is-static" style={{ left: `${sp.tl[0] * 100}%`, top: `${sp.tl[1] * 100}%` }}>{String(i + 1).padStart(2, "0")}</span>)}
          </StaticPlate>
          <div className="jr-copy">
            <p className="cb-kicker"><span>03 / Connected systems</span></p>
            <h2 id="services-title" className="jr-h2">Four ways we turn operations into AI systems</h2>
            <p className="jr-note">The four layers are a picture of our service lines, not the internals of a specific project.</p>
            <ol className="jr-services">
              {SERVICES.map((s, i) => (
                <li key={s.title} className="jr-service">
                  <span className="jr-service-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="jr-service-tag">{s.tag}</p>
                    <h3 className="jr-service-title"><Link href={s.href} className="jr-service-link">{s.title}</Link></h3>
                    <p className="jr-service-desc">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="ch-process" className="jr-ch jr-ch--process" aria-labelledby="process-title">
          <StaticPlate src="/connected/process-960.jpg" focus="process">
            {STEP_ANCHORS.map((a, i) => <span key={i} className="jr-step-tag is-static" style={{ left: `${a[0] * 100}%`, top: `${a[1] * 100}%` }}><b>{String(i + 1).padStart(2, "0")}</b><span className="jr-step-tag-name"> {STEPS[i].title}</span></span>)}
          </StaticPlate>
          <div className="jr-copy">
            <p className="cb-kicker"><span>04 / How we build</span></p>
            <h2 id="process-title" className="jr-h2">Your AI-ready MVP, live in 45 days</h2>
            <p className="jr-lede">Web, mobile, and AI features built around one clear business workflow. Fixed scope, fixed price, weekly demos, and production handover.</p>
            <ol className="jr-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="jr-step">
                  <span className="jr-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="jr-step-title">{s.title}</h3><p className="jr-step-desc">{s.description}</p></div>
                </li>
              ))}
            </ol>
            <p className="jr-small">No hourly billing. No open-ended scope. No disappearing for a month.</p>
            <Link href="/process" className="group cb-link">See our engagement models <Arrow /></Link>
          </div>
        </section>

        <section id="ch-trust" className="jr-ch jr-ch--trust" aria-labelledby="trust-title">
          <div className="jr-trust">
            <p className="cb-kicker"><span>05 / Proof</span></p>
            <h2 id="trust-title" className="jr-h2 jr-h2--wide">Built with teams across healthcare, SaaS, retail operations, fitness technology, and custom ML.</h2>
            <dl className="jr-stats">
              {STATS.map((s) => (<div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>))}
            </dl>
            <ul className="jr-outcomes">{OUTCOMES.map((o) => <li key={o}>{o}</li>)}</ul>
            <div className="jr-quotes">
              {TESTIMONIALS.map((t) => (
                <figure key={t.name} className="jr-quote">
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span className="jr-quote-name">{t.name}</span>
                    <span className="jr-quote-role">{t.role}</span>
                    <span className="jr-quote-project">Project: {t.project}</span>
                    {t.caseStudySlug && <Link href={`/work/${t.caseStudySlug}`} className="group cb-link jr-quote-link">View case study <Arrow /></Link>}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="jr-team">
              <div>
                <h3 className="jr-team-title">The team behind the systems</h3>
                <p className="jr-team-where">Bizzzup AI Labs, 105, ECR Road, Panaiyur, Chennai 600119, Tamil Nadu, India</p>
                <Link href="/about" className="group cb-link">Meet the full team <Arrow /></Link>
              </div>
              <ul className="jr-team-list">
                {TEAM.map((m) => (
                  <li key={m.name}>
                    <Image src={m.photo} alt={m.name} width={96} height={96} className="jr-team-photo" />
                    <span className="jr-team-name">{m.name}</span>
                    <span className="jr-team-role">{m.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="ch-contact" className="jr-ch jr-ch--contact" aria-labelledby="contact-title">
          <StaticPlate src="/connected/next-build-960.jpg" focus="next" />
          <div className="jr-copy jr-copy--contact-intro">
            <p className="cb-kicker"><span>06 / Start your project</span></p>
            <h2 id="contact-title" className="cb-project-name">Not sure where to start? Book an AI audit.</h2>
            <p className="cb-lede">A 20-minute call is enough to scope your project and give you a fixed price.</p>
          </div>
          <div className="jr-contact-card">
            <Contact variant="journey" />
          </div>
        </section>
      </div>
    </div>
  );
}
