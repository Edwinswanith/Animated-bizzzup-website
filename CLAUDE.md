# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config: eslint.config.mjs)
```

No test suite exists in this repo. Visual verification is done by driving the dev server with Playwright and saving screenshots to `../review/` (outside this repo).

## Deployment

Deploys as a Docker image to Google Cloud Run (`asia-south1`). `next.config.ts` sets `output: "standalone"` for this. `cloud_run.bat` (not tracked) builds, tags, pushes to Artifact Registry, and runs `gcloud run deploy` — it is a manual local script, not CI. Bump `IMAGE_TAG` before re-running. `Dockerfile` is a 3-stage build (deps → builder → runner) running as non-root `nextjs` user on port 3000.

## Architecture

Marketing site for Bizzzup AI Labs (`SITE_URL` https://ai.bizzzup.com), built with Next.js App Router (Next 16 / React 19), Tailwind v4, and Framer Motion.

### Homepage: "The Connected Build" (`ConnectedJourney.tsx`)

`/` renders only `Navigation`, `ConnectedJourney`, `Footer`. The whole homepage is one client component, `src/components/sections/ConnectedJourney.tsx`, styled by `src/app/journey.css` (plus shared `.cb-*` classes from `connected-build.css`). It replaced the older stacked-section homepage (`Hero`, `ProofAndTrust`, `FeatureCards`, `Projects`, `FlagshipProcess`, `Testimonials`, `TeamPreview`, …); those components still exist in `src/components/sections/` but are not on `/`. `ConnectedJourney` copies its service/step/proof text from them (comments mark which) and embeds `Contact` for the final chapter.

How it works:
- A **sticky stage** (`.jr-stage`, 100svh) holds generated studio photographs ("plates" in `public/connected/`, each with a `-960` variant) cover-fitted at 16:9. The chapter content (`.jr-flow`) scrolls over it in normal flow via `margin-top: -100svh`. Chapter ids: `ch-hero`, `ch-caption`, `ch-medi`, `ch-more`, `ch-services`, `ch-process`, `ch-trust`, `ch-contact`.
- **Real product screenshots are placed onto the plates' displays** with a CSS `matrix3d` homography (`homography()` + `.cb-quad` elements carrying `data-quad`). Quad corners are hand-measured pixel coords on the 1920×1080 plates (`FACE_1`, `SCREEN_1`, `SCREEN_2`, `SERVICE_PANES`, `STEP_ANCHORS`, `RAIL`), normalized with `px(x, y)`. If a plate is regenerated, these coordinates must be re-measured. Generated plates must never contain interface text; every on-screen UI is a real screenshot placed by the page.
- Scroll drives a single rAF loop (lerp toward `window.scrollY`, stops when settled) that calls `render()`; style writes go through a delta cache (`set()`) so unchanged values aren't rewritten. Chapter positions are measured in `layout()` and re-run by a `ResizeObserver`.
- **`GATES`** (media queries: phones, portrait tablets, coarse-pointer portrait, short landscape phones, `prefers-reduced-motion`) disable the scroll-driven stage and show a static sequence instead. The list in the TSX **must match** the matching media queries in `journey.css`; change both together.

`AssemblyHero.tsx` (scroll-scrubbed video, `public/hero/`, `assembly-hero.css`) and `ConnectedBuild.tsx` (`connected-build.css`) are earlier iterations of this hero; they are unused on `/`, but their CSS is still imported by `globals.css`.

### Other routes (`src/app/`)

- **`/process`** — hero block plus `EngagementModels` and `BuiltForProduction`.
- **`/about`** — `Team` section.
- **`/services`** and **`/services/[slug]`** — sourced from `src/data/services.ts` (`SERVICES`, `getServiceBySlug`, `getServicesForProject`), detail pages render `src/components/services/ServicePageTemplate.tsx`.
- **`/work`** and **`/work/[slug]`** — portfolio index (`src/components/work/WorkExplorer.tsx`) and per-project pages, sourced from `src/data/projects.ts` (`PROJECTS`, `FEATURED_PROJECTS`, `getProjectBySlug`). `sitemap.ts` generates entries from these data files.
- **`/privacy-policy`**, **`/content-rights`** — render `src/components/legal/LegalPage.tsx` with a page-specific `sections` array and `updated` date; add legal pages by writing a new `sections` array, not new markup.

Every route composes `Navigation` and `Footer` itself (no shared layout group) and wraps content in `<main id="main" tabIndex={-1}>` for the skip link. Per-page metadata uses `pageMetadata({ title, description, path })` from `src/lib/site.ts`, which also holds the site constants. `src/app/layout.tsx` centralizes site-wide metadata, JSON-LD (`Organization`/`LocalBusiness`/`WebSite`), fonts (`next/font/google`: Plus Jakarta Sans, IBM Plex Sans, IBM Plex Mono), GA, and mounts `ChatBot` globally.

`src/hooks/useIsMobile.ts` is an SSR-safe media-query hook (`useSyncExternalStore`, server snapshot always `false`); reuse it for responsive JS logic instead of a new `matchMedia` listener.

### API routes (`src/app/api/*/route.ts`)

- **`api/chat`** — proxies chat to Gemini (`@google/generative-ai`, model `gemini-2.5-flash`) with `SYSTEM_PROMPT` from `src/data/chatContext.ts` as system instruction, streaming SSE (`data: {...}\n\n`, terminated by `data: [DONE]`). Client history (`{role, content}[]`) is translated to Gemini's `{role: "user"|"model", parts}`; the last message goes via `sendMessageStream`. Client lazily instantiated so builds don't need the key.
- **`api/contact`** — sends the contact form via Resend. Returns 503 if the key is missing; escapes all user input before interpolating into the HTML email.
- Both share `createRateLimiter(limit, windowMs)` from `src/lib/rateLimit.ts`: an in-memory per-IP `Map`, reset on restart and not shared across instances — don't assume a global limit.

Chatbot knowledge and tone live only in `SYSTEM_PROMPT` / `QUICK_REPLIES` in `src/data/chatContext.ts` (no RAG).

### Animation conventions

No decorative ambient animation (infinite pulses, rotating rings, floating orbs, shimmer). Motion should be tied to scroll or to a single entrance. Exceptions: the ChatBot's own keyframes (`pulse-ring`, `typing-dot` in globals.css).

`src/lib/animations.ts` centralizes Framer Motion primitives (`EXPO_OUT`, `containerVariants`, `fadeUpVariants`, `fadeUpBlurVariants`, `scaleLineVariants`, `useReplay(ref)`, which reveals once and never replays). `fadeUp*` variants intentionally keep `hidden.opacity: 1` so full-page screenshot tools that never trigger scroll-into-view still see content. Reuse these instead of hand-rolling variants.

### Design tokens

Tokens are CSS custom properties in `src/app/globals.css` under `@theme inline`, consumed as Tailwind v4 utilities (e.g. `bg-bg-deep`, `text-text-secondary`). The palette is a **light "studio" system** (no dark mode), with commented contrast ratios: Ivory canvas `--color-bg-deep #f7f4ee`, Stone `--color-bg-surface`, Paper `--color-bg-card`, Mist `--color-bg-mist`; Ink/Graphite/Pewter text; indigo `--color-accent-1 #4f46e5` used in rare doses (hover `--color-accent-1-hover #2e2a8c`, use `hover:bg-accent-1-hover` on filled buttons, never `hover:opacity-*`); teal `--color-accent-2 #1f6f65` is the text-safe teal, `--color-accent-2-mark` is for dots/lines only. Status feedback never uses red/green/amber. The OG image (`opengraph-image.tsx`) and the contact email template can't read CSS vars and hardcode hex values; update them if the palette changes.

Buttons are sentence case. Filled primary (`bg-accent-1 hover:bg-accent-1-hover !text-white font-display font-semibold`) is reserved for "Book an AI audit" and the footer "Start a project"; other CTAs are quiet bordered buttons or text-link-plus-arrow.

## Environment variables

`.env.local` (gitignored; see `.env.example`): `GOOGLE_API_KEY` (chat), `RESEND_API_KEY` (contact), optional `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Everything degrades gracefully when absent.
