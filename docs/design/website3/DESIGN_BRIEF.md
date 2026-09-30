# Website3 Design Brief (v1, discovery complete)

Source: micro-QA session, 2026-09-29. Status: **direction confirmed, build not started.**
Build inputs: frontend-motion skill (principles + execution quality). No reference website is a layout, hero, palette or motion source.

## Core idea
Tech Cogniverse turns unclear business friction into working digital systems.
The whole site is a sequence of transformations: **friction → structure → working system**.
The transformation idea recurs; the visual mechanism changes per type of work.

## Decisions

| # | Decision | Value | Status |
|---|---|---|---|
| 1 | Visual story | Problem → working system, experiential. Never the repeated "problem text → diagram → screenshot" pattern. Each work type expresses friction in its own mechanism. | confirmed |
| 2 | Color world | **Mineral → Signal → Product color.** Base: limestone, pale cool gray, soft sand, muted clay (pushed away from the old ivory canvas). Signals: cobalt/electric blue (systems, intelligence), cool bright teal (voice/data flows), coral/amber (actions). No black-heavy sections, no purple gradients, no neon, no monochrome gray. | confirmed (base shift proposed, not yet overruled) |
| 3 | Hero | Editorial statement on one side + an **unresolved system** on the other: partial structure, muted, disconnected pieces, signal traces. First scroll physically connects the headline to the transformation; signals appear, connections complete. | confirmed |
| 3a | Screenshots | **Superseded** hero-screenshot plan. Transformations resolve into **code-driven representations of real capability**, never presented as real UI. Existing screenshots only in small proof / case-study contexts, and only after explicit approval. No team photos. No fake dashboards. | confirmed |
| 4 | Lead work type | **Voice AI**: speech → waveform → structured transcript → actions. Hero transformation is code-driven (precise, scroll-reversible). | confirmed |
| 5 | Cinematic level | **Balanced.** 3 generated anchor worlds (hero, mid-page handoff, closing). Between them, deterministic code motion: typography, diagrams, signal lines, system transformations. Ceilings: 6 Higgsfield stills, 2 Veo clips. | confirmed |
| 6 | Work → services handoff (Anchor 2) | **Pull back to the map.** Camera pulls back from close-up transformations to one studio system map. Services = regions; process = route through it. Candidate for Veo clip #1 (desktop only). | confirmed |
| 7 | Inner pages | **Enter from the map**: whole system → region → focused page, then a calm editorial landing. One input → transformation → output animation per page. No new media per page; Anchor 2 reused via code, crops, SVG, masks. Soft crop → code/typography fallback. Direct loads fully functional. | confirmed |
| 8 | Mobile | Same story, recomposed vertically (input travels down, not across). Short pins only. Anchors as stills, no Veo download. Map → tappable stacked regions. Fallback per sequence to final state + short entrance, decided in QA on a throttled mobile profile; runtime fallback only on measurable signals (deviceMemory, Save-Data, repeated long frames). | confirmed |
| 9 | Reduced motion | Final visual states directly, no scroll-linked motion; full content and navigation. | confirmed |
| 10 | Primary action | **"Describe your friction"** form in the closing world, sending a real message; booking link as secondary. Honest loading/error/success states; never a fake success. | confirmed |

## Work-type transformation mechanisms (homepage + inner pages)
- Voice & RAG: speech/documents → waveform → structured knowledge/transcript → usable response/action
- AI Agents & Automation: incoming work → decision logic → coordinated action → completed outcome
- Business Software: scattered operational data → connected workflow → clear business state
- AI on documents: documents → extraction → reasoning → usable answer
- Web/product build: idea/content → interface taking shape → finished product
- Process page: problem → scope → build → launch → growth
- Case study: real business friction → what Tech Cogniverse changed → resulting system

## Known real work (names from media filenames only; facts unverified)
OptimaFlow, Caption CC, Designt, Lawyer AI, Flightdeck, Nutrition, Doctor AI, Meridian, Saloon, Void Runner, Apex, Mediscribe, Neura, Kanaka Gold Loan, Health Dashboard.
Low-res (~405px wide): Mediscribe, Neura, Kanaka Gold Loan, Health Dashboard. Categories, statuses and descriptions must come from the previous company website.

## Blockers before build / generation
1. the previous company website blocked by network policy (all facts, services, statuses, contact details).
2. GEMINI_API_KEY not in the environment (Veo).
3. Higgsfield: free plan, 0 credits.
4. Booking link URL and email-sending provider for the form: unconfirmed.
5. Push to Website3 may be refused by this environment; if so, stop and hand over the local command (no substitute branch).

## Next steps (in order)
Storyboard (section-by-section: question, visual, motion contract, mobile, reduced motion) → asset plan (which anchors need Higgsfield/Veo, with purpose, model, settings, cost) → approval → build.
