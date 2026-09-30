# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # dev server (localhost:3000)
npm run build      # production build (also typechecks)
npm run start      # serve the production build
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
npm run media      # rebuild every served image from /assets-src masters
```

No unit test suite. Verification is done by driving the production build with Playwright (screenshots, frame timing, request audits); review captures go in `review/` (gitignored).

## What this site is

Marketing site for **Tech Cogniverse**. Story: business friction → structure → working system. Every chapter is a real project's transformation, drawn in code. Facts live only in `src/content/` (carried over from the company's previous website; `source` fields keep the page path). Never add a fact, metric, client or status that isn't in `src/content/`.

## Architecture

- **Content** (`src/content/`): `projects.ts` (15 builds: status, depth `full|snapshot`, region), `services.ts` (6), `regions.ts` (Voice, Knowledge, Operations, Products: the map), `company.ts`, `legal.ts`, `transformations.ts` (the one input → output sequence per service/project page, plus which full case studies show a real screenshot). Pages render from these; add a project or service by editing data, not markup.
- **Homepage** (`src/components/home/`): Hero (K1 still + `VoiceFlow`, pinned scrub) → four chapters (`Chapter` shell + a `*Stage` SVG each) → `SystemMap` (K2, code zoom from a sharp crop of the channel junction) → `Process` (route) → `Trust` (route of 10 checkpoints; review/fallback are amber gates) → `Closing` (K3 + `ContactForm`).
- **Inner pages** (`src/app/`): `/services/[slug]`, `/work/[slug]` open with `RegionBanner` (the page's K2 region crop + mini-map), then a quiet editorial layout with one `Transformation`. Index pages use `MapStrip`.
- **Motion** (`src/lib/motion.ts`): `useScene(ref, build)` wraps `gsap.matchMedia` for `desktop` / `mobile` and does nothing under reduced motion. Timelines are built with `.from()`, so the markup at rest is always the final, resolved state (reduced motion, no-JS and failed JS all show it). One animation owner per property; animate transform/opacity and SVG attributes only. Desktop pins only in the hero and the map; chapters use CSS sticky + scrub.
- **Contact** (`src/lib/contact.ts`, `src/app/api/contact/route.ts`): provider adapter chosen by env (`CONTACT_PROVIDER=resend|webhook`, see `.env.example`). Unconfigured returns 503 and the form says it can't deliver; it must never show success without a real 2xx.
- **Media**: generated masters in `assets-src/anchors/` (never served). `npm run media` writes AVIF/WebP/JPEG at fixed widths plus 9:16 portrait crops (phones get only those) and K2 region crops. `tools/gen/` holds the Gemini generation scripts; they read no keys (auth is injected by the environment) and the 4K endpoint can exceed a 30 s proxy limit, so use `image_stream.py` at 2K when that happens.

## Design rules

Tokens are in `src/app/globals.css`: mineral base (limestone, cool, ivory, sand, clay), three signals with fixed meaning: cobalt = structure, teal = voice/data flow, amber = action or human gate. Serif (Newsreader) for statements and reading, mono (JetBrains Mono) for labels and system text. Generated images never contain text or UI; real product UI appears only as one labelled screenshot per full case study. Anything drawn to explain a real product is captioned as an illustration.

## Configuration still pending

`NEXT_PUBLIC_SITE_URL` (canonical, sitemap), contact provider env, and the booking/social links (`COMPANY.calendly`, `COMPANY.x` are empty until Tech Cogniverse accounts exist; UI hides them when empty).
