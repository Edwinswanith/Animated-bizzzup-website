"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  clamp, sstep, geometry, tangle, taut, wave, resample, morph, nearest,
  knowledgeAnchors, routeAnchors, type Geo,
} from "./engine";
import s from "./LineLab.module.css";

const WORDS = ["I", "need", "to", "see", "a", "doctor", "on", "Thursday", "morning."];
const DOCS = ["Agreement v1", "Agreement v2", "Scanned notice · OCR", "Case law · Indian Kanoon"];
const SIGNAL = "#F2461E";

type Sec = { el: HTMLElement; top: number; height: number; p: number };

export function LineLab() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current!;
    const canvas = host.querySelector<HTMLCanvasElement>("[data-line]")!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");

    let g: Geo = geometry(innerWidth, innerHeight);
    let T = new Float32Array(0), TA = T, W1 = T, R = T, RO = T, TC = T, OUT = T;
    let docIdx: number[] = [];
    let docEls: HTMLElement[] = [];
    let branches: { from: number; to: [number, number] }[] = [];
    const secs: Record<string, Sec> = {};
    let dpr = 1;

    /* ---------------------------------------------------------- layout, once per resize */
    function measure() {
      g = geometry(innerWidth, innerHeight);
      const n2 = g.n * 2;
      [T, TA, W1, R, RO, TC, OUT] = Array.from({ length: 7 }, () => new Float32Array(n2));
      tangle(g, T);
      taut(g, TA);
      const ka = knowledgeAnchors(g);
      resample(ka.path, g.n, R, true);
      const ra = routeAnchors(g);
      resample(ra.path, g.n, RO, false);
      branches = ra.branches;
      docIdx = ka.docs.map((d) => nearest(R, g.n, d));
      docEls = [...host.querySelectorAll<HTMLElement>("[data-doc]")];

      // The DOM is placed from the same anchors the line is drawn through.
      host.querySelectorAll<HTMLElement>("[data-doc]").forEach((el, i) => {
        el.style.left = `${ka.docs[i][0]}px`;
        el.style.top = `${ka.docs[i][1]}px`;
      });
      const ans = host.querySelector<HTMLElement>("[data-answer]")!;
      ans.style.left = `${ka.answer[0]}px`;
      ans.style.top = `${ka.answer[1]}px`;
      host.querySelectorAll<HTMLElement>("[data-branch]").forEach((el, i) => {
        el.style.left = `${ra.branches[i].to[0]}px`;
        el.style.top = `${ra.branches[i].to[1]}px`;
      });
      let wx = 0.44 * g.w;
      host.querySelectorAll<HTMLElement>("[data-word]").forEach((el) => {
        if (g.portrait) { el.style.left = ""; el.style.top = ""; return; }
        const ww = el.offsetWidth;
        el.style.left = `${wx + ww / 2}px`;
        el.style.top = `${0.72 * g.h}px`;
        wx += ww + 0.45 * parseFloat(getComputedStyle(el).fontSize);
      });

      host.querySelectorAll<HTMLElement>("[data-sec]").forEach((el) => {
        const r = el.getBoundingClientRect();
        secs[el.dataset.sec!] = { el, top: r.top + scrollY, height: r.height, p: -1 };
      });

      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(g.w * dpr);
      canvas.height = Math.round(g.h * dpr);
      canvas.style.width = `${g.w}px`;
      canvas.style.height = `${g.h}px`;
    }

    /* ---------------------------------------------------------- state */
    let targetY = scrollY, shownY = scrollY;
    const ptr = { tx: 0, ty: 0, x: 0, y: 0, on: 0, onT: 0 };
    let raf: number | null = null;
    let last = 0;
    let drawnKey = "";

    const progress = (sec: Sec, y: number) => clamp((y - sec.top) / Math.max(1, sec.height - g.h));
    const idx = (f: number) => Math.round(clamp(f) * (g.n - 1));

    function setP(sec: Sec, p: number) {
      // Delta-gated: only touch the DOM when the value moved enough to matter (ends always land).
      if (sec.p === p || (Math.abs(sec.p - p) < 0.002 && p > 0 && p < 1)) return;
      sec.p = p;
      sec.el.style.setProperty("--p", p.toFixed(4));
    }

    function frame(y: number) {
      const { hero, voice, knowledge, ops } = secs;
      const ph = progress(hero, y), pv = progress(voice, y), pk = progress(knowledge, y), po = progress(ops, y);
      setP(hero, ph); setP(voice, pv); setP(knowledge, pk); setP(ops, po);

      let branchGrow = 0;
      let pulse = -1;
      if (y < voice.top) {
        // Hero: the tangle (leaning toward the cursor) pulls taut.
        const m = sstep(0.12, 0.72, ph);
        TC.set(T);
        const strength = ptr.on * (1 - m);
        if (strength > 0.001) {
          const Rr = Math.min(g.w, g.h) * 0.26;
          for (let i = 0; i < g.n; i++) {
            const dx = ptr.x - TC[i * 2], dy = ptr.y - TC[i * 2 + 1];
            const d = Math.hypot(dx, dy);
            if (d < Rr) {
              const f = (1 - d / Rr) ** 2 * 0.42 * strength;
              TC[i * 2] += dx * f;
              TC[i * 2 + 1] += dy * f;
            }
          }
        }
        morph(TC, TA, m, g.n, OUT);
      } else if (y < knowledge.top) {
        // Voice: the taut line starts to speak.
        wave(g, OUT, sstep(0, 0.3, pv), pv * 9);
      } else if (y < ops.top) {
        // Knowledge: speech flattens into a path that threads the documents.
        wave(g, W1, 1, 9);
        morph(W1, R, sstep(0, 0.36, pk), g.n, OUT);
        pulse = pk > 0.36 ? idx(sstep(0.38, 0.92, pk)) : -1;
      } else {
        // Operations: the path squares up into routes, then branches grow out of it.
        morph(R, RO, sstep(0, 0.36, po), g.n, OUT);
        branchGrow = sstep(0.4, 0.85, po);
      }

      // Documents light up only once the travelling signal has actually reached them.
      docEls.forEach((el, i) => {
        const lit = pulse >= docIdx[i] || (y >= ops.top);
        if ((el.dataset.lit === "1") !== lit) el.dataset.lit = lit ? "1" : "0";
      });

      draw(pulse, branchGrow);
    }

    function draw(pulse: number, grow: number) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, g.w, g.h);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = SIGNAL;
      ctx.lineWidth = g.portrait ? 2 : 2.4;
      ctx.beginPath();
      ctx.moveTo(OUT[0], OUT[1]);
      for (let i = 1; i < g.n; i++) ctx.lineTo(OUT[i * 2], OUT[i * 2 + 1]);
      ctx.stroke();

      if (grow > 0) {
        ctx.lineWidth = 1.6;
        for (const b of branches) {
          const i = idx(b.from);
          const x0 = OUT[i * 2], y0 = OUT[i * 2 + 1];
          const x1 = x0 + (b.to[0] - x0) * grow, y1 = y0 + (b.to[1] - y0) * grow;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          if (g.portrait) { ctx.lineTo(x1, y0); ctx.lineTo(x1, y1); } else { ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); }
          ctx.stroke();
          if (grow > 0.98) {
            ctx.fillStyle = "#E6E9EA";
            ctx.beginPath(); ctx.arc(b.to[0], b.to[1], 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          }
        }
      }

      if (pulse >= 0) {
        // The signal: a short brighter run of the line with a head, travelling forward.
        const from = Math.max(0, pulse - 28);
        ctx.lineWidth = g.portrait ? 4 : 5;
        ctx.beginPath();
        ctx.moveTo(OUT[from * 2], OUT[from * 2 + 1]);
        for (let i = from + 1; i <= pulse; i++) ctx.lineTo(OUT[i * 2], OUT[i * 2 + 1]);
        ctx.stroke();
        ctx.fillStyle = SIGNAL;
        ctx.beginPath(); ctx.arc(OUT[pulse * 2], OUT[pulse * 2 + 1], 6, 0, Math.PI * 2); ctx.fill();
      }

    }

    /* ---------------------------------------------------------- the loop that rests */
    function tick(now: number) {
      const dt = Math.min(100, now - (last || now));
      last = now;
      const k = 1 - Math.pow(1 - 0.14, dt / 16.667);
      shownY += (targetY - shownY) * k;
      ptr.x += (ptr.tx - ptr.x) * k;
      ptr.y += (ptr.ty - ptr.y) * k;
      ptr.on += (ptr.onT - ptr.on) * k;
      const settled = Math.abs(targetY - shownY) < 0.3 && Math.abs(ptr.tx - ptr.x) < 0.3 && Math.abs(ptr.ty - ptr.y) < 0.3 && Math.abs(ptr.onT - ptr.on) < 0.002;
      if (settled) { shownY = targetY; ptr.x = ptr.tx; ptr.y = ptr.ty; ptr.on = ptr.onT; }
      const key = `${shownY.toFixed(1)}|${ptr.x.toFixed(1)}|${ptr.y.toFixed(1)}|${ptr.on.toFixed(3)}`;
      if (key !== drawnKey) { drawnKey = key; frame(shownY); }
      if (settled) { raf = null; last = 0; } else raf = requestAnimationFrame(tick);
    }
    const wake = () => { if (raf === null) raf = requestAnimationFrame(tick); };
    const onScroll = () => { targetY = scrollY; wake(); };
    const onPointer = (e: PointerEvent) => {
      if (!fine.matches || scrollY > secs.hero.top + secs.hero.height) return;
      ptr.tx = e.clientX; ptr.ty = e.clientY; ptr.onT = 1; wake();
    };
    const onLeave = () => { ptr.onT = 0; wake(); };

    /* ---------------------------------------------------------- reduced motion: static stills */
    function drawStills() {
      host.querySelectorAll<HTMLCanvasElement>("[data-still]").forEach((c) => {
        const which = c.dataset.still!;
        const stage = c.parentElement!;
        const sg = geometry(stage.clientWidth, stage.clientHeight);
        const buf = new Float32Array(sg.n * 2);
        if (which === "hero") taut(sg, buf);
        if (which === "voice") wave(sg, buf, 1, 9);
        if (which === "knowledge") resample(knowledgeAnchors(sg).path, sg.n, buf, true);
        if (which === "ops") resample(routeAnchors(sg).path, sg.n, buf, false);
        const r = Math.min(devicePixelRatio || 1, 2);
        c.width = sg.w * r; c.height = sg.h * r;
        const x = c.getContext("2d")!;
        x.setTransform(r, 0, 0, r, 0, 0);
        x.strokeStyle = SIGNAL; x.lineWidth = 2.2; x.lineJoin = "round";
        x.beginPath(); x.moveTo(buf[0], buf[1]);
        for (let i = 1; i < sg.n; i++) x.lineTo(buf[i * 2], buf[i * 2 + 1]);
        x.stroke();
        if (which === "ops") {
          x.lineWidth = 1.4;
          for (const b of routeAnchors(sg).branches) {
            const i = Math.round(b.from * (sg.n - 1));
            x.beginPath(); x.moveTo(buf[i * 2], buf[i * 2 + 1]);
            if (sg.portrait) x.lineTo(b.to[0], buf[i * 2 + 1]); else x.lineTo(buf[i * 2], b.to[1]);
            x.lineTo(b.to[0], b.to[1]); x.stroke();
          }
        }
      });
    }

    function applyMode() {
      const still = reduce.matches;
      host.dataset.mode = still ? "still" : "live";
      measure();
      if (still) {
        removeEventListener("scroll", onScroll);
        if (raf !== null) cancelAnimationFrame(raf);
        raf = null;
        host.querySelectorAll<HTMLElement>("[data-sec]").forEach((el) => el.style.setProperty("--p", "1"));
        host.querySelectorAll<HTMLElement>("[data-doc]").forEach((el) => (el.dataset.lit = "1"));
        drawStills();
      } else {
        addEventListener("scroll", onScroll, { passive: true });
        targetY = shownY = scrollY;
        drawnKey = "";
        Object.values(secs).forEach((x) => (x.p = -1));
        frame(shownY);
      }
    }

    const ro = new ResizeObserver(() => { measure(); drawnKey = ""; if (reduce.matches) drawStills(); else frame(shownY); });
    ro.observe(document.documentElement);
    addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    reduce.addEventListener("change", applyMode);
    document.fonts?.ready.then(() => { measure(); drawnKey = ""; applyMode(); });
    applyMode();

    return () => {
      ro.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", applyMode);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className={s.root} data-mode="live">
      <canvas data-line className={s.line} aria-hidden="true" />
      <header className={s.bar}>
        <span className={s.brand}>Tech Cogniverse</span>
        <span className={s.tag}>Prototype · The Line</span>
      </header>

      <main id="main" tabIndex={-1}>
        {/* 00 · Hero: the statement is readable at once; the tangle runs between two type layers. */}
        <section data-sec="hero" className={`${s.sec} ${s.hero}`} aria-labelledby="h-title">
          <div className={`${s.stage} ${s.back}`} aria-hidden="true">
            <span className={s.giant}>complexity</span>
          </div>
          <div className={`${s.stage} ${s.front}`}>
            <canvas data-still="hero" className={s.still} aria-hidden="true" />
            <p className={s.kicker}>AI systems &amp; product engineering · Chennai</p>
            <h1 id="h-title" className={s.h1}>
              We turn business complexity into <em>AI systems that work.</em>
            </h1>
            <p className={s.facts}>Live in 45 days · Fixed price · A demo every Friday</p>
            <p className={s.actions}>
              <a className={s.cta} href="#contact">Describe your friction</a>
              <a className={s.link} href="#voice">See how it works</a>
            </p>
            <p className={s.next} aria-hidden="true">01 · Voice</p>
          </div>
        </section>

        {/* 01 · Voice */}
        <section id="voice" data-sec="voice" className={`${s.sec} ${s.voice}`} aria-labelledby="v-title">
          <div className={s.stage}>
            <canvas data-still="voice" className={s.still} aria-hidden="true" />
            <div className={s.copy}>
              <p className={s.marker}>01 · Voice</p>
              <h2 id="v-title" className={s.h2}>A conversation ends. Nothing usable is left behind.</h2>
              <p className={s.body}>Voice systems that listen live, turn speech into structure, and act on it, with a person reviewing anything consequential.</p>
            </div>
            <div className={s.transcript}>
              <p className={s.words}>
                <span className="sr-only">Sample call: I need to see a doctor on Thursday morning.</span>
                {WORDS.map((w, i) => (
                  <span key={i} data-word className={s.word} style={{ ["--i" as string]: i }} aria-hidden="true">{w}</span>
                ))}
              </p>
              <dl className={s.fields}>
                <div><dt>intent</dt><dd>consultation</dd></div>
                <div><dt>day</dt><dd>Thursday</dd></div>
                <div><dt>slot</dt><dd>morning</dd></div>
              </dl>
              <p className={s.action}>Appointment booked · calendar synced</p>
              <p className={s.gate}>Prescription draft · waits for doctor review</p>
            </div>
            <p className={s.caption}>Illustration of MediConsult’s voice layer, sample call.</p>
          </div>
        </section>

        {/* 02 · Knowledge */}
        <section data-sec="knowledge" className={`${s.sec} ${s.knowledge}`} aria-labelledby="k-title">
          <div className={s.stage}>
            <canvas data-still="knowledge" className={s.still} aria-hidden="true" />
            <div className={s.copy}>
              <p className={s.marker}>02 · Knowledge</p>
              <h2 id="k-title" className={s.h2}>The answer is in there. Somewhere.</h2>
            </div>
            {DOCS.map((d, i) => (
              <article key={d} data-doc data-lit="0" className={s.doc} style={{ ["--i" as string]: i }}>
                <span className={s.docTitle}>{d}</span>
                <span className={s.docLines} aria-hidden="true" />
              </article>
            ))}
            <div data-answer className={s.answer}>
              <p className={s.answerTitle}>Answer · 2 citations</p>
              <p className={s.answerGate}>Reviewed before use</p>
            </div>
            <p className={s.caption}>Illustration of Legal Assistant’s document flow: four agent crews, Indian Kanoon case law.</p>
          </div>
        </section>

        {/* 04 · Operations (entry only, to prove the next handoff) */}
        <section data-sec="ops" className={`${s.sec} ${s.ops}`} aria-labelledby="o-title">
          <div className={s.stage}>
            <canvas data-still="ops" className={s.still} aria-hidden="true" />
            <div className={s.copy}>
              <p className={s.marker}>04 · Operations</p>
              <h2 id="o-title" className={s.h2}>Seven branches. Seven versions of the truth.</h2>
            </div>
            {Array.from({ length: 7 }, (_, i) => (
              <span key={i} data-branch className={s.branch} style={{ ["--i" as string]: i }}>Branch {i + 1}</span>
            ))}
          </div>
        </section>

        <section id="contact" className={s.tail}>
          <p>The prototype ends here. In the full build the Line continues into Anatomy, Products, the Map, Work, Process, Trust and the contact field.</p>
          <Link href="/" className={s.link}>Back to the current site</Link>
        </section>
      </main>
    </div>
  );
}
