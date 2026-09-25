"use client";

import { useEffect, useRef, type Ref } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  The Digital Assembly — scroll-controlled hero                      */
/*                                                                     */
/*  Desktop: a pinned stage whose scroll progress drives the approved  */
/*  6s film (separated panels -> connected -> one blank glass panel).  */
/*  The real Caption CC screenshot is composited onto that panel only  */
/*  after it has come to rest (frame ~136 of 145).                     */
/*                                                                     */
/*  Static hero (no pinning, no video download) when ANY of the five   */
/*  gates below match. These strings must stay identical to the        */
/*  media query in globals.css (.ah static block).                     */
/* ------------------------------------------------------------------ */

const GATES = [
  "(max-width: 720px)",
  "(orientation: portrait) and (max-width: 1024px)",
  "(orientation: portrait) and (pointer: coarse)",
  "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
  "(prefers-reduced-motion: reduce)",
];

const VIDEO_URL = "/hero/assembly-scrub.mp4";
const POSTER_URL = "/hero/assembly-poster.jpg";
const END_URL = "/hero/assembly-end.jpg";
const SCREENSHOT_URL = "/projects/caption-cc.png";

/* Scroll progress (0..1) at which each story step becomes active */
const STEP_AT = [0, 0.36, 0.7];
/* The glass panel has settled by here; the screenshot fades in after */
const REVEAL_START = 0.925;
const REVEAL_END = 0.985;

const STEPS = ["Scattered inputs", "Connected workflow", "Working product"];

const smoothstep = (p: number, e0: number, e1: number) => {
  const t = Math.min(1, Math.max(0, (p - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

function FeaturedTag() {
  return (
    <Link href="/work/caption-cc" className="ah-tag group">
      <span className="ah-tag-kicker">Featured Bizzzup project</span>
      <span className="ah-tag-name">
        Caption CC
        <span className="ah-tag-desc">Tamil-English subtitle generator</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ah-tag-arrow">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

function Steps({ reference }: { reference?: Ref<HTMLOListElement> }) {
  return (
    <ol className="ah-steps" ref={reference} aria-label="How a Bizzzup build comes together">
      {STEPS.map((label, i) => (
        <li key={label} className="ah-step" data-step={i}>
          <span className="ah-step-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="ah-step-label">{label}</span>
        </li>
      ))}
    </ol>
  );
}

export default function AssemblyHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const tagWrapRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const poster = posterRef.current;
    const reveal = revealRef.current;
    const tagWrap = tagWrapRef.current;
    const steps = stepsRef.current;
    const bar = barRef.current;
    if (!section || !stage || !video || !poster || !reveal || !tagWrap || !steps || !bar) return;

    video.muted = true;
    const stepEls = Array.from(steps.querySelectorAll<HTMLLIElement>(".ah-step"));

    /* ---------- scroll progress ---------- */
    const heroProgress = () => {
      const r = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return Math.min(1, Math.max(0, -r.top / range));
    };

    /* ---------- gated seeks (deadlock-safe) ---------- */
    let seekBusy = false;
    let pendingTime: number | null = null;
    const requestSeek = (t: number) => {
      if (!video.duration || !videoReady) return;
      const clamped = Math.min(video.duration - 0.04, Math.max(0, t));
      if (Math.abs(clamped - video.currentTime) < 0.001) return;
      if (seekBusy) { pendingTime = clamped; return; }
      seekBusy = true;
      video.currentTime = clamped;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    };
    video.addEventListener("seeked", onSeeked);

    /* ---------- delta-gated DOM writes ---------- */
    let lastStep = -1;
    let lastReveal = -1;
    let lastBar = -1;
    let tagLive: boolean | null = null;
    const render = (p: number) => {
      /* If the film failed, the page shows the finished product: steps match it */
      const q = videoFailed ? 1 : p;
      let step = 0;
      for (let i = 0; i < STEP_AT.length; i++) if (q >= STEP_AT[i]) step = i;
      if (step !== lastStep) {
        stepEls.forEach((el, i) => {
          el.classList.toggle("is-active", i === step);
          el.classList.toggle("is-done", i < step);
        });
        lastStep = step;
      }
      const barV = Math.round(q * 1000) / 1000;
      if (barV !== lastBar) {
        bar.style.transform = `scaleX(${barV})`;
        lastBar = barV;
      }
      const rv = videoFailed ? 1 : Math.round(smoothstep(p, REVEAL_START, REVEAL_END) * 1000) / 1000;
      if (rv !== lastReveal) {
        stage.style.setProperty("--reveal", String(rv));
        lastReveal = rv;
      }
      const live = rv > 0.6;
      if (live !== tagLive) {
        tagWrap.toggleAttribute("inert", !live);
        tagWrap.classList.toggle("is-live", live);
        tagLive = live;
      }
    };

    /* ---------- rAF lerp that rests ---------- */
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let lastTick = 0;
    let heroOnScreen = true;
    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      const k = 0.14;
      shown += (target - shown) * (1 - Math.pow(1 - k, dt / 16.667));
      if (Math.abs(target - shown) < 0.0005) {
        shown = target;
        rafId = null;
        lastTick = 0;
      } else {
        rafId = requestAnimationFrame(tick);
      }
      requestSeek(shown * video.duration);
      render(shown);
    };
    const onScroll = () => {
      target = heroProgress();
      if (rafId === null && heroOnScreen) rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      heroOnScreen = e.isIntersecting;
      if (heroOnScreen) onScroll();
    });
    io.observe(section);

    /* ---------- media loading (only inside the scrub path) ---------- */
    let unmounted = false;
    let initDone = false;
    let videoReady = false;
    let videoFailed = false;
    let objectUrl: string | null = null;
    const ctrl = new AbortController();

    const failVideo = () => {
      if (videoFailed) return;
      videoFailed = true;
      seekBusy = false;
      pendingTime = null;
      /* Useful fallback: the settled panel with the real screenshot */
      poster.style.backgroundImage = `url('${END_URL}')`;
      stage.classList.add("video-failed");
      stage.classList.remove("is-loading");
      lastReveal = -1;
      render(shown);
    };
    const onVideoError = () => { seekBusy = false; pendingTime = null; failVideo(); };
    video.addEventListener("error", onVideoError);

    const loadVideo = async () => {
      let watchdog = setTimeout(() => ctrl.abort(), 20000);
      try {
        const res = await fetch(VIDEO_URL, { signal: ctrl.signal });
        if (!res.ok || !res.body) throw new Error("video fetch failed");
        const reader = res.body.getReader();
        const chunks: BlobPart[] = [];
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          clearTimeout(watchdog);
          watchdog = setTimeout(() => ctrl.abort(), 20000);
          chunks.push(value);
        }
        clearTimeout(watchdog);
        objectUrl = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
        video.src = objectUrl;
        video.load();
        video.addEventListener(
          "loadeddata",
          () => {
            videoReady = true;
            stage.classList.remove("is-loading");
            stage.classList.add("video-ready");
            requestSeek(shown * video.duration);
          },
          { once: true },
        );
      } catch {
        clearTimeout(watchdog);
        if (!unmounted) failVideo();
      }
    };

    const initOnce = () => {
      if (initDone) return;
      initDone = true;
      stage.classList.add("is-loading");
      poster.style.backgroundImage = `url('${POSTER_URL}')`;
      let started = false;
      const start = () => { if (!started) { started = true; loadVideo(); } };
      const img = new Image();
      img.onload = start;
      img.onerror = start;
      img.src = POSTER_URL;
      setTimeout(start, 4000);
    };

    /* ---------- live gate: arm / disarm the scrub ---------- */
    let scrubOn = false;
    const enableScrub = () => {
      if (scrubOn) return;
      scrubOn = true;
      initOnce();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      lastStep = -1; lastReveal = -1; lastBar = -1; tagLive = null;
      target = shown = heroProgress();
      render(shown);
      onScroll();
    };
    const disableScrub = () => {
      if (!scrubOn) return;
      scrubOn = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      tagWrap.removeAttribute("inert");
    };
    const applyHeroMode = () => {
      if (MQLS.some((m) => m.matches)) disableScrub();
      else enableScrub();
    };
    const MQLS = GATES.map((q) => window.matchMedia(q));
    MQLS.forEach((m) => m.addEventListener("change", applyHeroMode));
    applyHeroMode();

    return () => {
      unmounted = true;
      disableScrub();
      ctrl.abort();
      io.disconnect();
      MQLS.forEach((m) => m.removeEventListener("change", applyHeroMode));
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onVideoError);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="ah" aria-labelledby="hero-title">
      <div ref={stageRef} className="ah-stage">
        {/* ── Film layer (decorative, desktop scrub only) ── */}
        <div className="ah-film" aria-hidden="true" inert>
          <div className="ah-cover">
            <div ref={posterRef} className="ah-poster" />
            <video ref={videoRef} className="ah-video" muted playsInline preload="none" tabIndex={-1} />
            <div ref={revealRef} className="ah-reveal">
              {/* Real product screenshot, composited — never generated */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SCREENSHOT_URL} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="ah-scrim" />
        </div>

        {/* Interactive label for the reveal, in the same coordinate box as the film */}
        <div className="ah-film ah-film--ui">
          <div className="ah-cover">
            <div ref={tagWrapRef} className="ah-tag-wrap" inert>
              <FeaturedTag />
            </div>
          </div>
        </div>

        {/* ── Copy: visible from the first moment ── */}
        <div className="ah-content">
          <div className="ah-copy">
            <p className="ah-badge">
              <span className="ah-badge-dot" aria-hidden="true" />
              Bizzzup AI Labs
            </p>
            <h1 id="hero-title" className="ah-title">
              AI systems.
              <span className="ah-title-line">Built for real work.</span>
            </h1>
            <p className="ah-lede">
              We build AI agents, voice platforms, and custom software around the way your business operates.
            </p>
            <div className="ah-ctas">
              <a href="#contact" className="clip-corner-md ah-btn-primary">
                Book an AI audit
              </a>
              <Link href="/work" className="group ah-btn-secondary">
                View our work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="ah-progress">
              <Steps reference={stepsRef} />
              <span className="ah-bar" aria-hidden="true">
                <span ref={barRef} className="ah-bar-fill" />
              </span>
              <span className="ah-loading" aria-hidden="true">
                <span className="ah-loading-dot" /> Loading the build sequence
              </span>
            </div>
          </div>
        </div>

        {/* ── Static composition (phones, portrait tablets, reduced motion) ── */}
        <figure className="ah-static">
          <div className="ah-static-frame">
            <div className="ah-static-zoom">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ah-static-bg" src={END_URL} alt="" loading="lazy" decoding="async" />
            <div className="ah-static-screen">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SCREENSHOT_URL}
                alt="Caption CC, a Bizzzup project: the screen for turning Tamil-English speech into English subtitles"
                loading="lazy"
                decoding="async"
              />
            </div>
            </div>
          </div>
          <figcaption>
            <FeaturedTag />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
