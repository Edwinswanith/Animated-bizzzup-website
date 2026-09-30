"use client";

import { useEffect, useRef } from "react";
import { useScene, gsap } from "@/lib/motion";
import styles from "./VoiceFlow.module.css";

/* Stages of MediConsult's voice layer as published on /work/doctor-ai:
   VAPI routing to an available doctor, Deepgram live transcription, natural-language booking,
   Outlook calendar sync, and a prescription lifecycle that waits for doctor review.
   The spoken sentence is a sample, not a real patient. */
const WORDS = ["I", "need", "to", "see", "a", "doctor", "on", "Thursday", "morning."];
const FIELDS = [
  ["intent", "consultation"],
  ["day", "Thursday"],
  ["slot", "morning"],
];

const BARS = 72;
// Deterministic pseudo-noise so server and client render the same resting frame.
const noise = (i: number) => {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};
const speech = (i: number) => {
  const t = i / BARS;
  const syllables = Math.abs(Math.sin(t * Math.PI * 9)) * 0.75 + 0.25;
  const phrase = Math.sin(t * Math.PI) ** 0.6;
  return syllables * phrase;
};

function drawWave(canvas: HTMLCanvasElement | null, clarity: number) {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const gap = w / BARS;
  for (let i = 0; i < BARS; i++) {
    const v = noise(i) * (1 - clarity) + speech(i) * clarity;
    const bh = Math.max(2, v * (h - 4));
    ctx.fillStyle = clarity > 0.55 ? "#0f8c80" : "#8f8b84";
    ctx.globalAlpha = 0.35 + 0.65 * clarity;
    ctx.fillRect(i * gap + gap * 0.2, (h - bh) / 2, gap * 0.6, bh);
  }
}

export function VoiceFlow() {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  // Resting frame: the resolved waveform, drawn even when motion is off.
  useEffect(() => {
    const draw = () => drawWave(canvas.current, 1);
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  useScene(ref, ({ root, desktop }) => {
    const wave = { c: 1 };
    const draw = () => drawWave(canvas.current, wave.c);
    const hero = root.closest("[data-hero]") as HTMLElement;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: desktop
        ? { trigger: hero, pin: hero.querySelector("[data-pin]"), start: "top top+=64", end: "+=140%", scrub: 0.6 }
        : { trigger: root, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
    });
    const q = gsap.utils.selector(root);
    tl.from(wave, { c: 0, duration: 1.2, onUpdate: draw }, 0)
      .from(q("[data-step]"), { opacity: 0.3, x: (i: number) => [10, -8, 12, -10, 8][i] ?? 0, duration: 0.8, stagger: 0.35 }, 0.2)
      .from(q("[data-word]"), { opacity: 0, y: 6, duration: 0.2, stagger: 0.08 }, 0.9)
      .from(q("[data-field]"), { opacity: 0, y: 8, duration: 0.3, stagger: 0.15 }, 1.6)
      .from(q("[data-spine]"), { scaleY: 0, duration: 2.2 }, 0.6)
      .from(q("[data-dot]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.2, stagger: 0.45 }, 0.7)
      .from(q("[data-action]"), { backgroundColor: "rgba(0,0,0,0)", color: "#46484e", borderColor: "#cbc5ba", duration: 0.35 }, 2.6)
      .from(q("[data-gate]"), { scaleX: 0, transformOrigin: "0 50%", duration: 0.4 }, 3.0)
      .from(q('[data-edge="x"]'), { scaleX: 0.25, duration: 3.2 }, 0)
      .from(q('[data-edge="y"]'), { scaleY: 0.3, duration: 3.2 }, 0);
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); drawWave(canvas.current, 1); };
  });

  return (
    <figure ref={ref} className={styles.flow} aria-labelledby="voiceflow-caption">
      <span aria-hidden="true" className={styles.frame}>
        <span data-edge="x" className={styles.edgeT} />
        <span data-edge="y" className={styles.edgeR} />
        <span data-edge="x" className={styles.edgeB} />
        <span data-edge="y" className={styles.edgeL} />
      </span>
      <div className={styles.head}>
        <span className="mono">MediConsult · voice layer</span>
        <span className={`mono ${styles.tag}`}>Illustration · sample call</span>
      </div>

      <div className={styles.stepsWrap}>
        <span data-spine aria-hidden="true" className={styles.spine} />
        <ol className={styles.steps}>
        <li data-step className={styles.step}>
          <span data-dot className={`${styles.dot} ${styles.teal}`} />
          <span className={styles.label}>Incoming call · live transcription</span>
          <canvas ref={canvas} className={styles.wave} aria-hidden="true" />
          <p className={styles.transcript}>
            <span className="sr-only">Sample transcript: </span>“
            {WORDS.map((w, i) => (
              <span key={i} data-word>{w}{i < WORDS.length - 1 ? " " : ""}</span>
            ))}
            ”
          </p>
        </li>
        <li data-step className={styles.step}>
          <span data-dot className={`${styles.dot} ${styles.cobalt}`} />
          <span className={styles.label}>Understood as structure</span>
          <dl className={styles.fields}>
            {FIELDS.map(([k, v]) => (
              <div key={k} data-field><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </li>
        <li data-step className={styles.step}>
          <span data-dot className={`${styles.dot} ${styles.cobalt}`} />
          <span className={styles.label}>Routed to an available doctor</span>
        </li>
        <li data-step className={styles.step}>
          <span data-dot className={`${styles.dot} ${styles.amber}`} />
          <span data-action className={styles.action}>Appointment booked · calendar synced</span>
        </li>
        <li data-step className={styles.step}>
          <span data-dot className={`${styles.dot} ${styles.ring}`} />
          <span className={styles.label}>Prescription draft</span>
          <span className={styles.gateRow}>
            <span data-gate className={styles.gate} />
            <span className="mono">waits for doctor review</span>
          </span>
        </li>
        </ol>
      </div>
      <figcaption id="voiceflow-caption" className={styles.caption}>
        How MediConsult’s voice layer turns a call into a booked, reviewable action. Production-ready MVP.
      </figcaption>
    </figure>
  );
}
