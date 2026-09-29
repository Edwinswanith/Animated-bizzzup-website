# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (flat config: eslint.config.mjs)
```

No test suite exists. Visual verification is done by driving the dev server with Playwright and saving screenshots to `../review/`.

## Deployment

Deploys as a Docker image to Google Cloud Run (`asia-south1`). `next.config.ts` sets `output: "standalone"` for this. `cloud_run.bat` is a manual local deploy script, not CI. It builds, tags, pushes to Artifact Registry, and runs `gcloud run deploy`; bump `IMAGE_TAG` before re-running. `Dockerfile` is a 3-stage build (deps -> builder -> runner) running as non-root `nextjs` on port 3000.

## Architecture

Marketing site for Bizzzup AI Labs (`SITE_URL` https://ai.bizzzup.com), built with Next.js App Router (Next 16 / React 19), Tailwind v4, and Framer Motion.

### Homepage: The Connected Build

`/` renders only `Navigation`, `ConnectedJourney`, and `Footer`. The homepage is one client component, `src/components/sections/ConnectedJourney.tsx`, styled by `src/app/journey.css` plus shared `.cb-*` classes from `connected-build.css`.

Older stacked-section homepage components (`Hero`, `ProofAndTrust`, `FeatureCards`, `Projects`, `FlagshipProcess`, `Testimonials`, `TeamPreview`, and related sections) still exist in `src/components/sections/`, but they are not on `/`. `ConnectedJourney` reuses text from them and embeds `Contact` for the final chapter.

How the homepage works:

- A sticky stage (`.jr-stage`, 100svh) holds generated studio photographs from `public/connected/`, including `-960` variants. Chapter content (`.jr-flow`) scrolls over it in normal flow via `margin-top: -100svh`. Chapter ids are `ch-hero`, `ch-caption`, `ch-medi`, `ch-more`, `ch-services`, `ch-process`, `ch-trust`, and `ch-contact`.
- Real product screenshots are placed onto plate displays with CSS `matrix3d` homography (`homography()` and `.cb-quad` elements with `data-quad`). Quad corners are hand-measured pixel coordinates on 1920x1080 plates (`FACE_1`, `SCREEN_1`, `SCREEN_2`, `SERVICE_PANES`, `STEP_ANCHORS`, `RAIL`) normalized with `px(x, y)`. Re-measure these if a plate is regenerated. Generated plates must never contain interface text; the page composites real UI.
- Scroll is handled by a single rAF loop that lerps toward `window.scrollY`, stops when settled, and calls `render()`. Style writes go through a delta cache (`set()`) so unchanged values are not rewritten. Chapter positions are measured in `layout()` and updated by a `ResizeObserver`.
- `GATES` media queries (phones, portrait tablets, coarse-pointer portrait, short landscape phones, and `prefers-reduced-motion`) disable the scroll-driven stage and show a static sequence. The list in `ConnectedJourney.tsx` must match the corresponding media queries in `journey.css`.

`AssemblyHero.tsx` (scroll-scrubbed video using `public/hero/` and `assembly-hero.css`) and `ConnectedBuild.tsx` (`connected-build.css`) are earlier hero iterations. They are unused on `/`, but their CSS is still imported by `globals.css`.

### Other Routes

- `/process` - hero block plus `EngagementModels` and `BuiltForProduction`.
- `/about` - `Team` section.
- `/services` and `/services/[slug]` - sourced from `src/data/services.ts`; detail pages render `src/components/services/ServicePageTemplate.tsx`.
- `/work` and `/work/[slug]` - portfolio index (`src/components/work/WorkExplorer.tsx`) and per-project pages sourced from `src/data/projects.ts`.
- `/privacy-policy` and `/content-rights` - render `src/components/legal/LegalPage.tsx` with page-specific `sections` arrays and an `updated` date. Add legal pages by writing a new sections array, not new markup.

Every route composes `Navigation` and `Footer` itself and wraps content in `<main id="main" tabIndex={-1}>` for the skip link. Per-page metadata uses `pageMetadata({ title, description, path })` from `src/lib/site.ts`. `src/app/layout.tsx` centralizes site-wide metadata, JSON-LD, fonts, Google Analytics, and mounts `ChatBot` globally.

`src/hooks/useIsMobile.ts` is an SSR-safe media-query hook based on `useSyncExternalStore`; reuse it for responsive JS logic instead of adding new `matchMedia` listeners.

### API Routes

- `api/chat` proxies chat to Gemini (`@google/generative-ai`, model `gemini-2.5-flash`) with `SYSTEM_PROMPT` from `src/data/chatContext.ts`, streaming SSE (`data: {...}\n\n`, terminated by `data: [DONE]`). Client history is translated from `{role, content}[]` into Gemini's `{role: "user"|"model", parts}` shape; the last message is sent with `sendMessageStream`. The client is lazily instantiated so builds do not need `GOOGLE_API_KEY`.
- `api/contact` sends the contact form via Resend. It returns 503 if `RESEND_API_KEY` is missing and escapes all user input before interpolating HTML email.
- Both share `createRateLimiter(limit, windowMs)` from `src/lib/rateLimit.ts`, an in-memory per-IP `Map`. It resets on restart and is not shared across instances.

Chatbot knowledge and tone live only in `SYSTEM_PROMPT` and `QUICK_REPLIES` in `src/data/chatContext.ts`; there is no RAG or external knowledge base wired in.

### Animation

No decorative ambient animation: no infinite pulses, rotating rings, floating orbs, or shimmer. Motion should be tied to scroll or to one entrance. The only exceptions are the ChatBot keyframes (`pulse-ring`, `typing-dot` in `globals.css`).

`src/lib/animations.ts` centralizes Framer Motion primitives: `EXPO_OUT`, `containerVariants`, `fadeUpVariants`, `fadeUpBlurVariants`, `scaleLineVariants`, and `useReplay(ref)`, which reveals once and never replays. `fadeUp*` variants intentionally keep `hidden.opacity: 1` so screenshot tools that do not trigger scroll still see content.

### Design Tokens

Tokens are CSS custom properties in `src/app/globals.css` under `@theme inline`, consumed as Tailwind v4 utilities. The site is a light "studio" system with no dark mode. The current palette is documented in `design-system-reference.md`; update `src/app/opengraph-image.tsx` and the contact email template too if hardcoded palette values change.

Use primary filled buttons (`bg-accent-1 hover:bg-accent-1-hover !text-white font-display font-semibold`) only for "Book an AI audit" and footer "Start a project". Other CTAs should be quiet bordered buttons or text links with arrows. Button labels are sentence case, not uppercase/tracked.

## Environment Variables

`.env.local` is gitignored. See `.env.example`. Variables:

- `GOOGLE_API_KEY` for chat.
- `RESEND_API_KEY` for contact form email.
- Optional `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, and `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

API routes degrade gracefully when keys are absent.

