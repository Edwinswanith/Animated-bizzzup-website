"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { getProjectBySlug, PROJECTS } from "@/data/projects";

/* ------------------------------------------------------------------ */
/*  BIZZZUP: The Connected Build (homepage scene 1)                    */
/*                                                                     */
/*  Desktop: one pinned stage in the generated light studio.           */
/*   1. Four rigid HTML glass panes (inputs) assemble by scroll onto    */
/*      the exact corners of the display in Plate 2.                    */
/*   2. The photographic display takes over; the real Caption CC        */
/*      screenshot is mapped onto its face with a measured homography.  */
/*   3. In-place swap to Plate 3 with the real MediConsult screenshot.  */
/*  Generated imagery never contains interface text; every screen is    */
/*  a real product screenshot placed by the page.                      */
/*                                                                     */
/*  Static version (phones, portrait tablets, reduced motion): the same */
/*  story as a stacked sequence. GATES must match connected-build.css.  */
/* ------------------------------------------------------------------ */

const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

type Pt = [number, number];
type Quad = [Pt, Pt, Pt, Pt]; // TL, TR, BR, BL as fractions of the 1920x1080 plate

const px = (x: number, y: number): Pt => [x / 1920, y / 1080];
/* Measured on the generated plates (review/light/veo-inputs/*-1080.png) */
const FACE_1: Quad = [px(908, 225), px(1695, 199), px(1692, 729), px(908, 695)];
const SCREEN_1: Quad = [px(908, 225), px(1695, 199), px(1692, 719), px(908, 686)];
const SCREEN_2: Quad = [px(909, 307), px(1698, 283), px(1694, 800), px(909, 758)];

/* Cascade pose of each pane, relative to the face centre (fractions of the plate) */
const PANES = [
  { key: "doc", dx: -0.092, dy: -0.2, rx: 42, ry: -12, rz: -7, s: 0.58, delay: 0.0 },
  { key: "wave", dx: 0.03, dy: -0.05, rx: 40, ry: -14, rz: 6, s: 0.56, delay: 0.08 },
  { key: "flow", dx: -0.077, dy: 0.13, rx: 44, ry: -10, rz: -8, s: 0.58, delay: 0.16 },
  { key: "app", dx: 0.036, dy: 0.3, rx: 40, ry: -12, rz: 5, s: 0.6, delay: 0.24 },
] as const;

/* Scroll phases (0..1 across the pinned stage) */
const P = {
  assembleStart: 0.04,
  assembleEnd: 0.4,
  photoIn: [0.38, 0.45],
  screen1In: [0.46, 0.53],
  heroOut: [0.42, 0.5],
  p1In: [0.5, 0.56],
  p1Out: [0.68, 0.73],
  screen1Out: [0.67, 0.71],
  swap: [0.715, 0.755],
  screen2In: [0.76, 0.81],
  p2In: [0.78, 0.84],
} as const;

const CHAPTERS = ["Ideas and inputs", "Connected systems", "Real products"];
const CHAPTER_AT = [0, 0.18, 0.46];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (p: number, [a, b]: readonly [number, number]) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* Projective transform mapping the rect (0,0)-(w,h) onto quad q (in px), as CSS matrix3d */
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
  // Gaussian elimination
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
  const h8 = B.map((b, i) => b / A[i][i]);
  const [a, b, c2, d, e, f, g, hh] = h8;
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

function ProjectCopy({ slug, chapterNote }: { slug: string; chapterNote: string }) {
  const p = getProjectBySlug(slug);
  if (!p) return null;
  return (
    <>
      <p className="cb-kicker">
        <span>03 / Real products</span>
        <span className="cb-kicker-note">{chapterNote}</span>
      </p>
      <h2 className="cb-project-name">{p.name}</h2>
      <p className="cb-project-tagline">{p.tagline}</p>
      <p className="cb-status">
        <span className="cb-status-dot" aria-hidden="true" />
        {p.status}
        <span className="cb-status-sep" aria-hidden="true">·</span>
        {p.category}
      </p>
      <p className="cb-project-context">{p.context}</p>
      <div className="cb-project-links">
        <Link href={`/work/${p.slug}`} className="group cb-link">
          Read the {p.name} case study
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link href="/work" className="cb-link-quiet">View all {PROJECTS.length} projects</Link>
      </div>
    </>
  );
}

function Screen({ quad, src, alt, className }: { quad: Quad; src: string; alt: string; className: string }) {
  return (
    <div className={`cb-quad ${className}`} data-quad={JSON.stringify(quad)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

export default function ConnectedBuild() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const stage = section.querySelector<HTMLElement>(".cb-stage")!;
    const cover = section.querySelector<HTMLElement>(".cb-film .cb-cover")!;
    const panes = Array.from(section.querySelectorAll<HTMLElement>(".cb-pane"));
    const layers = {
      display1: section.querySelector<HTMLElement>(".cb-display-1")!,
      screen1: section.querySelector<HTMLElement>(".cb-film .cb-screen-1")!,
      display2: section.querySelector<HTMLElement>(".cb-display-2")!,
      screen2: section.querySelector<HTMLElement>(".cb-film .cb-screen-2")!,
    };
    const copies = {
      hero: section.querySelector<HTMLElement>('[data-copy="hero"]')!,
      p1: section.querySelector<HTMLElement>('[data-copy="p1"]')!,
      p2: section.querySelector<HTMLElement>('[data-copy="p2"]')!,
    };
    const chapterEls = Array.from(section.querySelectorAll<HTMLElement>(".cb-chapter"));
    const bar = section.querySelector<HTMLElement>(".cb-bar-fill")!;

    /* ---------- geometry: every quad in every box (scrub and static) ---------- */
    let facePx: Pt[] = [];
    let paneW = 0;
    let paneH = 0;
    const layout = () => {
      section.querySelectorAll<HTMLElement>(".cb-quad").forEach((el) => {
        const box = el.parentElement!;
        const W = box.clientWidth;
        const H = box.clientHeight;
        const q = (JSON.parse(el.dataset.quad!) as Quad).map(([x, y]) => [x * W, y * H] as Pt);
        const w = Math.round((q[1][0] - q[0][0] + q[2][0] - q[3][0]) / 2);
        const h = Math.round((q[3][1] - q[0][1] + q[2][1] - q[1][1]) / 2);
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.transform = homography(w, h, q);
      });
      const W = cover.clientWidth;
      const H = cover.clientHeight;
      facePx = FACE_1.map(([x, y]) => [x * W, y * H] as Pt);
      paneW = Math.round((facePx[1][0] - facePx[0][0] + facePx[2][0] - facePx[3][0]) / 2);
      paneH = Math.round((facePx[3][1] - facePx[0][1] + facePx[2][1] - facePx[1][1]) / 2);
      panes.forEach((el) => { el.style.width = `${paneW}px`; el.style.height = `${paneH}px`; });
      cache.clear();
      render(shown);
    };

    /* ---------- delta-gated writes ---------- */
    const cache = new Map<HTMLElement | string, string>();
    const set = (el: HTMLElement, prop: string, val: string) => {
      const k = `${prop}`;
      const id = el.dataset.cbid ?? (el.dataset.cbid = Math.random().toString(36).slice(2));
      const key = id + k;
      if (cache.get(key) === val) return;
      cache.set(key, val);
      el.style.setProperty(prop, val);
    };
    const inertState = new Map<HTMLElement, boolean>();
    const setLive = (el: HTMLElement, live: boolean) => {
      if (inertState.get(el) === live) return;
      inertState.set(el, live);
      el.toggleAttribute("inert", !live);
      el.setAttribute("aria-hidden", live ? "false" : "true");
    };

    const render = (p: number) => {
      if (!facePx.length || paneW <= 0 || paneH <= 0) return;
      /* Panes: cascade -> exact face quad */
      const H = homography(paneW, paneH, facePx);
      const cx = (facePx[0][0] + facePx[1][0] + facePx[2][0] + facePx[3][0]) / 4;
      const cy = (facePx[0][1] + facePx[1][1] + facePx[2][1] + facePx[3][1]) / 4;
      const W = cover.clientWidth;
      const Hh = cover.clientHeight;
      const span = P.assembleEnd - P.assembleStart;
      const paneFade = 1 - smooth(p, [0.44, 0.48]);
      panes.forEach((el, i) => {
        const cfg = PANES[i];
        const local = clamp01((p - P.assembleStart - cfg.delay * span * 0.5) / (span * 0.76));
        const t = easeInOut(local);
        const k = 1 - t;
        const tf =
          `translate(${(cx + cfg.dx * W * k).toFixed(2)}px,${(cy + cfg.dy * Hh * k).toFixed(2)}px) ` +
          `perspective(1600px) rotateX(${(cfg.rx * k).toFixed(3)}deg) rotateY(${(cfg.ry * k).toFixed(3)}deg) rotateZ(${(cfg.rz * k).toFixed(3)}deg) ` +
          `scale(${(cfg.s + (1 - cfg.s) * t).toFixed(4)}) translate(${(-cx).toFixed(2)}px,${(-cy).toFixed(2)}px) ${H}`;
        set(el, "transform", tf);
        set(el, "--mark", (1 - smooth(local, [0.55, 0.9])).toFixed(3));
        set(el, "--rim", (1 - smooth(local, [0.6, 1])).toFixed(3));
        set(el, "opacity", paneFade.toFixed(3));
      });

      set(layers.display1, "opacity", smooth(p, P.photoIn).toFixed(3));
      /* The glass clears before the in-place swap, so the crossfade happens between two blank displays */
      set(layers.screen1, "opacity", (smooth(p, P.screen1In) * (1 - smooth(p, P.screen1Out))).toFixed(3));
      const sw = smooth(p, P.swap);
      set(layers.display2, "opacity", sw.toFixed(3));
      set(layers.screen2, "opacity", smooth(p, P.screen2In).toFixed(3));

      const heroV = 1 - smooth(p, P.heroOut);
      const p1V = smooth(p, P.p1In) * (1 - smooth(p, P.p1Out));
      const p2V = smooth(p, P.p2In);
      set(copies.hero, "opacity", heroV.toFixed(3));
      set(copies.hero, "transform", `translateY(${(-(1 - heroV) * 28).toFixed(1)}px)`);
      set(copies.p1, "opacity", p1V.toFixed(3));
      set(copies.p1, "transform", `translateY(${((1 - smooth(p, P.p1In)) * 24 - smooth(p, P.p1Out) * 24).toFixed(1)}px)`);
      set(copies.p2, "opacity", p2V.toFixed(3));
      set(copies.p2, "transform", `translateY(${((1 - p2V) * 24).toFixed(1)}px)`);
      setLive(copies.hero, heroV > 0.5);
      setLive(copies.p1, p1V > 0.5);
      setLive(copies.p2, p2V > 0.5);

      let ch = 0;
      CHAPTER_AT.forEach((at, i) => { if (p >= at) ch = i; });
      chapterEls.forEach((el, i) => {
        const cls = i === ch ? "is-active" : i < ch ? "is-done" : "";
        if (el.dataset.state !== cls) { el.dataset.state = cls; el.className = `cb-chapter ${cls}`; }
      });
      set(bar, "transform", `scaleX(${(Math.round(p * 500) / 500).toFixed(3)})`);
    };

    /* ---------- scroll progress with a resting lerp ---------- */
    const progress = () => {
      const r = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      return range > 0 ? clamp01(-r.top / range) : 0;
    };
    let target = 0;
    let shown = 0;
    let raf: number | null = null;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      if (Math.abs(target - shown) < 0.0004) { shown = target; raf = null; last = 0; }
      else raf = requestAnimationFrame(tick);
      render(shown);
    };
    const onScroll = () => {
      target = progress();
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => layout());
    ro.observe(section);
    ro.observe(stage);

    let scrubOn = false;
    const enable = () => {
      if (scrubOn) return;
      scrubOn = true;
      section.classList.add("is-scrub");
      window.addEventListener("scroll", onScroll, { passive: true });
      target = shown = progress();
      layout();
    };
    const disable = () => {
      if (!scrubOn) return;
      scrubOn = false;
      section.classList.remove("is-scrub");
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
      Object.values(copies).forEach((el) => { el.removeAttribute("inert"); el.removeAttribute("aria-hidden"); el.style.removeProperty("opacity"); el.style.removeProperty("transform"); });
      inertState.clear();
      cache.clear();
      layout();
    };
    const MQLS = GATES.map((q) => window.matchMedia(q));
    const apply = () => (MQLS.some((m) => m.matches) ? disable() : enable());
    MQLS.forEach((m) => m.addEventListener("change", apply));
    apply();
    if (!scrubOn) layout();

    return () => {
      disable();
      ro.disconnect();
      MQLS.forEach((m) => m.removeEventListener("change", apply));
    };
  }, []);

  const heroCopy = (
    <>
      <p className="cb-kicker"><span>01 / Ideas and inputs</span></p>
      <h1 id="hero-title" className="cb-title">
        AI systems.
        <span className="cb-title-line">Built for real work.</span>
      </h1>
      <p className="cb-lede">We build AI agents, voice platforms, and custom software around the way your business operates.</p>
      <div className="cb-ctas">
        <a href="#contact" className="clip-corner-md cb-btn-primary">Book an AI audit</a>
        <Link href="/work" className="group cb-btn-secondary">
          View our work
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </>
  );

  const caption = getProjectBySlug("caption-cc");
  const medi = getProjectBySlug("doctor-ai");

  return (
    <section ref={sectionRef} id="hero" className="cb" aria-labelledby="hero-title">
      <div className="cb-stage">
        {/* ── Scrub stage (desktop) ── */}
        <div className="cb-film" aria-hidden="true">
          <div className="cb-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cb-plate" src="/connected/room.jpg" alt="" loading="lazy" decoding="async" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cb-plate cb-display-1" src="/connected/display-1.jpg" alt="" loading="lazy" decoding="async" />
            <Screen quad={SCREEN_1} src={caption?.image ?? ""} alt="" className="cb-screen cb-screen-1" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cb-plate cb-display-2" src="/connected/display-2.jpg" alt="" loading="lazy" decoding="async" />
            <Screen quad={SCREEN_2} src={medi?.image ?? ""} alt="" className="cb-screen cb-screen-2" />
            {PANES.map((pane) => (
              <div key={pane.key} className={`cb-pane cb-pane-${pane.key}`}>
                <Symbol kind={pane.key} />
              </div>
            ))}
          </div>
        </div>

        <div className="cb-content">
          <div className="cb-copy-stack">
            <div className="cb-copy" data-copy="hero">{heroCopy}</div>
            <div className="cb-copy" data-copy="p1" inert aria-hidden="true"><ProjectCopy slug="caption-cc" chapterNote="Featured project 1 of 2" /></div>
            <div className="cb-copy" data-copy="p2" inert aria-hidden="true"><ProjectCopy slug="doctor-ai" chapterNote="Featured project 2 of 2" /></div>
          </div>
          <ol className="cb-chapters" aria-label="Chapters of this page">
            {CHAPTERS.map((c, i) => (
              <li key={c} className="cb-chapter" data-state="">
                <span className="cb-chapter-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="cb-chapter-label">{c}</span>
              </li>
            ))}
            <li className="cb-bar" aria-hidden="true"><span className="cb-bar-fill" /></li>
          </ol>
        </div>

        {/* ── Static sequence (phones, portrait tablets, reduced motion) ── */}
        <div className="cb-static">
          <ul className="cb-inputs" aria-label="Scattered inputs">
            {PANES.map((pane) => (
              <li key={pane.key} className="cb-input-chip"><Symbol kind={pane.key} /></li>
            ))}
          </ul>
          <figure className="cb-frame cb-frame-1">
            <div className="cb-frame-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cb-plate" src="/connected/display-1-960.jpg" alt="" loading="lazy" decoding="async" />
              <Screen quad={SCREEN_1} src={caption?.image ?? ""} alt={`${caption?.name}: ${caption?.imageLabel} screen`} className="cb-screen" />
            </div>
          </figure>
          <div className="cb-static-copy"><ProjectCopy slug="caption-cc" chapterNote="Featured project 1 of 2" /></div>
          <figure className="cb-frame cb-frame-2">
            <div className="cb-frame-zoom">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cb-plate" src="/connected/display-2-960.jpg" alt="" loading="lazy" decoding="async" />
              <Screen quad={SCREEN_2} src={medi?.image ?? ""} alt={`${medi?.name}: ${medi?.imageLabel} screen`} className="cb-screen" />
            </div>
          </figure>
          <div className="cb-static-copy"><ProjectCopy slug="doctor-ai" chapterNote="Featured project 2 of 2" /></div>
        </div>
      </div>
    </section>
  );
}
