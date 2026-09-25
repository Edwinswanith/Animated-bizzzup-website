# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config: eslint.config.mjs)
```

No test suite exists in this repo.

## Deployment

Deploys as a Docker image to Google Cloud Run (`asia-south1`). `next.config.ts` sets `output: "standalone"` for this. `cloud_run.bat` builds, tags, pushes to Artifact Registry, and runs `gcloud run deploy` — it is a manual local script, not CI. Bump `IMAGE_TAG` before re-running. `Dockerfile` is a 3-stage build (deps → builder → runner) running as non-root `nextjs` user on port 3000.

## Architecture

Marketing site for Bizzzup AI Labs, built with Next.js App Router (Next 16 / React 19), Tailwind v4, and Framer Motion. Four routes under `src/app/`:

- **`/` (`page.tsx`)** — the main conversion page: `Navigation`, `Hero`, `ProofAndTrust`, `FeatureCards`, `Projects`, `FlagshipProcess`, `BuiltForProductionSummary`, `Testimonials`, `TeamPreview`, `Contact`, `Footer`, in that order, separated by `<div className="section-divider" />`. Sections are self-contained and take no props — reorder/add by editing this file only.
- **`/process`** — "How We Work" page: a hero block plus `EngagementModels` and `BuiltForProduction`.
- **`/about`** — `Team` section only.
- **`/work`** and **`/work/[slug]`** — portfolio index (renders `src/components/work/WorkExplorer.tsx`) and per-project detail pages, sourced from `src/data/projects.ts`. `src/app/sitemap.ts` generates a sitemap entry per project slug from that same file.

Every route composes `Navigation` and `Footer` (from `src/components/sections/`) around its content; there's no shared layout route group, so each `page.tsx` imports them itself.

`src/components/ui/` holds cross-cutting interactive widgets: `ChatBot.tsx` (floating chat, mounted globally in `layout.tsx` so it appears on every route), `ProjectDetailModal.tsx` (detail overlay for Projects), `ProjectMedia.tsx`, `SystemGraph.tsx` / `HeroWorkflowVisual.tsx` (animated diagram widgets used in the Hero).

### Projects carousel (`Projects.tsx`)

Auto-advances every 7s (`AUTO_ADVANCE_MS`). Hover over the carousel pauses temporarily; ANY manual interaction (dot click, swipe, arrow key) permanently disables auto-advance (`autoEnabled` flag); a pause/play toggle beside the dots (`aria-pressed`) also controls it and is hidden under reduced motion. Arrow keys are scoped to the viewport div (`tabIndex={0}` + `onKeyDown`) — never re-attach them to `window`, that regresses a fixed bug where the carousel moved while typing in the contact form.

### API routes (`src/app/api/*/route.ts`)

- **`api/chat`** — proxies chat messages to Gemini (`@google/generative-ai`, model `gemini-2.0-flash`) using `SYSTEM_PROMPT` from `src/data/chatContext.ts` as the system instruction, and streams the reply back as SSE (`data: {...}\n\n`, terminated with `data: [DONE]`). The client message history (OpenAI-style `{role, content}[]`) is translated to Gemini's `{role: "user"|"model", parts}` format, with the last message sent via `sendMessageStream` and the rest as history. Requires `GOOGLE_API_KEY` env var (lazily instantiated so the build doesn't fail without it).
- **`api/contact`** — sends the contact form via the Resend API (`RESEND_API_KEY` env var). Returns 503 if the key is missing, escapes all user input before interpolating into the HTML email body.
- Both routes share `createRateLimiter(limit, windowMs)` from `src/lib/rateLimit.ts` — an in-memory `Map` keyed by IP (from `x-forwarded-for`/`x-real-ip`), pruned once it exceeds 500 entries. This resets on redeploy/restart and does not work across multiple instances — fine for Cloud Run's low-traffic min-instances=0 setup, but don't assume it enforces a global limit.

### Chatbot content

To change what the AI assistant knows or how it talks, edit `SYSTEM_PROMPT` (and `QUICK_REPLIES`) in `src/data/chatContext.ts` — this is the only place bot behavior/knowledge is defined; there's no RAG or external knowledge base wired in.

### Animation conventions

**Ambient animation is removed by design** — no infinite pulses, rotating rings, floating orbs, or shimmer anywhere. The ONLY perpetually animated elements are the hero workflow console (`HeroWorkflowVisual.tsx`) and the ChatBot's own keyframes (`pulse-ring`, `typing-dot` in globals.css — keep those). Don't reintroduce decorative infinite animations.

`src/lib/animations.ts` centralizes Framer Motion primitives: `EXPO_OUT` easing, `containerVariants`/`fadeUpVariants`/`fadeUpBlurVariants` (stagger + fade-up-on-scroll pattern used throughout sections), `scaleLineVariants` (decorative line reveals), and the `useReplay(ref)` hook — sections animate ONCE on first viewport entry and never replay on scroll-up (returns `[isInView, replayKey]`; the key flips 0→1 on first reveal). Reuse these instead of hand-rolling new variants. Note `fadeUpVariants`/`fadeUpBlurVariants` keep `hidden.opacity: 1` (only offsetting `y`) intentionally, so content stays visible for full-page screenshot tools that never trigger the real scroll-into-view. The hero entrance completes in ~1.2s (0.02s/word stagger; entrance gate 1200ms).

### Design tokens

Color/font tokens are defined as CSS custom properties in `src/app/globals.css` under `@theme inline` (`--color-bg-*`, `--color-accent-*`, `--color-text-*`, `--font-*`) and consumed via Tailwind v4's automatic `@theme` integration (e.g. `bg-bg-deep`, `text-text-secondary`). The palette is the **warm charcoal system from `design-system-reference.md`** (now the implemented reality, not just a target): `--color-accent-1: #44403C` with `--color-accent-1-hover: #292524` (use `hover:bg-accent-1-hover` on filled buttons — never `hover:opacity-*`), `--color-accent-2: #B45309` (amber, sparingly), `--color-accent-3: #6B8A9E` (slate blue, sparingly). `--gradient-1` is a subtle charcoal gradient used by `.gradient-text`, which appears ONLY in the Hero headline ("live in 45 days.") — don't add gradient text elsewhere.

### Button conventions

Two button variants + text links, all sentence case (no uppercase/tracking-widest labels):
- **Primary** (filled `clip-corner-md bg-accent-1 hover:bg-accent-1-hover !text-white font-display font-semibold`): ONLY "Book an AI audit" instances (nav, hero, contact submit) and the footer "Start a project".
- **Secondary** (quiet border, `border-border text-text-primary hover:border-border-accent`): hero "View our work".
- **Text link + arrow** (`group inline-flex items-center gap-2 font-display font-semibold text-text-primary hover:text-accent-2` + arrow SVG with `group-hover:translate-x-0.5`): all other CTAs ("See our engagement models", "View all 14 projects", "Meet the full team", "View details", …). No rounded-full mono pills.

Type scale: hero h1 `clamp(2.6rem, 4vw + 1rem, 4.2rem)` is the largest text on the site; section h2s cap at `clamp(1.9rem, 3.5vw, 2.8rem)`.

### SEO / metadata

`src/app/layout.tsx` centralizes site-wide metadata (OpenGraph, Twitter cards, JSON-LD `Organization`/`LocalBusiness`/`WebSite` structured data) and font loading (`next/font/google`: Plus Jakarta Sans, IBM Plex Sans, IBM Plex Mono) for all routes. `/process`, `/about`, and `/work` each additionally export their own `metadata` (title/description) from their `page.tsx`. `src/app/sitemap.ts` and `src/app/opengraph-image.tsx` are generated via Next's file conventions.

## Environment variables

Defined in `.env.local` (gitignored): `GOOGLE_API_KEY` (Gemini, used by `api/chat`), `RESEND_API_KEY` (Resend, used by `api/contact`). Both API routes degrade gracefully (lazy init / 503) when their key is absent so local dev and CI builds don't require them.
