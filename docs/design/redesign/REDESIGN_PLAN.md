# Tech Cogniverse: complete redesign plan (v1)

Status: plan, for approval. Only the load-bearing prototype (§11) is built before approval.
Facts: `src/content/` (carried over, unchanged). Everything else is replaced.

---

## 1. Skill analysis

### What each skill actually is

**10k-websites** (in repo, `10k-websites-skill/`). A production playbook for a *single* cinematic scroll-scrubbed hero on a one-page static site, with a fixed tool pipeline (Higgsfield, Hostinger) and a fixed tutorial flow. Its real value is not the pipeline; it is the engineering and design floor, each rule earned from a shipped bug:
- Scrub engineering: Blob-fetched media, dt-normalised lerp in a rAF loop that *rests*, gated seeks, delta-gated DOM writes, keyframe interval `-g 8`, compositor-promoted media layer.
- Pacing: bands sized in vh not seconds, 80 to 130vh plateaus, the flick test (120/240/360px wheel steps).
- Legibility over motion: four-layer system plus worst-frame contrast audit (≥ 3.5:1).
- Text choreography: split once with a seeded RNG, every entrance scrubbed off one `--k` variable, transform/opacity only, fully reversible, "echo principle" (the words do what the footage does).
- Static gates decided live in CSS and JS, complete-without-media, reduced motion honoured live in both directions.
- Design bar: one committed direction, ONE signature element whose removal would be noticed, no two adjacent sections sharing a skeleton, accent in rare doses, never pure black/white, one persistent environment layer, banned "AI made this" looks.
- Copy gate: no em dashes, no stock words, no AI tells.

**frontend-motion skill**. A method, not a recipe book (its companion reference files are not installed; only SKILL.md exists). Its value:
- Motion as a *contract* per effect (purpose, trigger, readable initial state, properties, interval, end state, interruption, mobile, reduced motion, cleanup, acceptance test).
- Scroll-triggered vs scroll-linked are different behaviours; pick deliberately.
- Simplest suitable tool per need; one owner per animated property; cleanup of observers and timelines.
- Honesty of demonstrations: illustration vs simulation vs live integration, labelled.
- Mobile recomposition, reduced-motion equivalence, CWV targets (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1), never report targets as results.

### Responsibility split (as requested, with two adjustments)

| Area | Owner | Note |
|---|---|---|
| Visual direction, composition, type, hierarchy, spacing, art direction, the signature element, adjacent-section variety, copy gate | **10k-websites** | its design bar is stricter than anything else available |
| Motion system, choreography, pins, parallax, transitions, architecture, per-effect contracts, cleanup, mobile/reduced-motion equivalence | **frontend-motion** | |
| **Scrub/frame-sequence engineering** (lerp, gated decode, delta-gated writes, flick test, legibility audit) | **10k-websites** (adjustment 1) | it is the more battle-tested source for exactly this mechanism, so it wins over a generic "use GSAP" answer |
| Demonstration honesty (illustration labels, no fake UIs) | **frontend-motion** (adjustment 2) | 10k has no rule for this; it matters for an AI company |

### Where they disagree, and what wins here

| Conflict | Decision | Why |
|---|---|---|
| 10k: one `index.html`, no npm, no framework | **Rejected.** Keep Next.js | 30 routes, typed content, a server form route. A single file would make inner pages and the region-to-page transition impossible |
| 10k: Higgsfield + Hostinger only, tutorial flow, partner links | **Rejected** | you directed Gemini/Veo and GitHub; the skill's own creative-licence clause covers the build, and your instruction outranks its pipeline clause |
| 10k: "particles drifting at whisper level", a living loop per section | **Rejected as stated.** Replaced by *meaningful* life: signal pulses that travel along real paths, only while visible | you banned meaningless particles and ambient loops |
| 10k: phones get a static hero | **Partly adopted.** Phones get a static *media* frame, but the code-driven story still runs vertically | your brief requires the same story on mobile |
| 10k: video scrub via `currentTime` | **Replaced by a canvas frame sequence** for the one filmed scene | frame-perfect in both directions and no Safari seek jank; the 10k lerp/gating rules still apply to decode |
| frontend-motion: "native scrolling, no smooth-scroll library" vs cinematic feel | **Native scroll kept.** Smoothness comes from lerped drawing, not scroll hijacking | smooth-scroll libraries break anchors, find-in-page, and accessibility |

---

## 2. Scrolltide reference analysis: BLOCKED

`scrolltide.co` is refused by this environment's network policy (direct, fetch tool and proxy all blocked). A web search confirmed exactly one detail: the Eagle template's clip "plays once and freezes into its own final frame". Nothing else could be inspected, so nothing else is claimed.

| Reference | Verified | What I will treat as a hypothesis to validate (from your brief only) |
|---|---|---|
| Pouterby | nothing | cursor-reactive visual state / frame selection |
| Cold Club | nothing | **no hypothesis; you asked me not to guess** |
| Ora | nothing | scroll progress → frame index → canvas draw |
| Eagle | clip plays once, freezes on its own final frame | video resolves into a matching still, so the cut disappears |
| Camera | nothing | exploded view: parts separate and reorganise on scroll |

**To unblock:** add `scrolltide.co` to the environment's allowed domains (this session picked up the content-site domain change live before), or drop screen recordings of the five references into the chat. I will then do the per-reference breakdown you listed (hero, type placement, pins, cursor, parallax, frames, video, 3D, entry/exit, handoffs, mobile, what is premium vs decorative) and adjust this plan. The plan below uses only the four *principles* you named, which are standard techniques and do not depend on their implementations.

---

## 3. Creative concept: **One Line**

**Premise (the one idea the whole site teaches):** every system we build starts as a tangle. Tech Cogniverse pulls one line through it until it works.

**The signature element: the Line.** A single continuous line, alive on a fixed stage behind the page, that is never cut from the first frame to the last. It is born as a tangle in the hero, pulls taut, then *becomes* each piece of real work: a waveform (voice), a retrieval path threading documents (knowledge), the spine of an agent that separates into its layers (anatomy), routed decisions (operations), the wireframe of a product (products), the topology of the system map, the 45-day timeline, the checkpoint route, and finally the cursor line of the contact field, where the visitor's own words become the last input. Removal test: take the Line away and the site has no continuity, no transitions and no story. It passes.

**The website becomes more intelligent as you scroll** because the Line's behaviour escalates: noise → shape → structure → reasoning (branching, choosing) → an organised map → a plan → a promise → a conversation.

### Visual system (new; nothing carried from the current site)

| | Decision | Why |
|---|---|---|
| Canvas | **Vellum**: cool drafting-film grey, `#E6E9EA`, with a faint paper grain | light, as you asked (no black-heavy site), but cooler and more technical than the current limestone |
| Ink | **Graphite** `#16191D` for type and structure | engineering drawing, not "AI glow" |
| Signal | **Vermilion** `#F2461E`, used for the Line and the primary action only | an oscilloscope trace or a red line on a technical drawing; unmistakably "live". Rare-dose rule holds, so it never becomes decoration |
| Secondary | graphite at 12 to 60% for grid, ticks and annotations | structure without colour noise |
| Display type | **Bricolage Grotesque** (oversized, variable optical size) | expressive grotesk for statements that compress and stretch with the motion |
| Body | **Instrument Sans** | quiet, very legible |
| Labels | **Martian Mono** | technical annotation voice for the Line's readouts |

Risk, stated: vermilion reads as "alert" in product UIs. Mitigation: it is never used for status or errors, only for the Line and the one CTA. This is the one decision I would like your yes/no on (see §12).

---

## 4. Homepage storyboard

Desktop pins are native CSS sticky stages driven by scroll progress. Heights are starting points, validated by the flick test.

| # | Chapter (pin length) | Friction → what the Line does | Real facts on screen | Type behaviour |
|---|---|---|---|---|
| 0 | **Tangle** (hero, 260vh) | First screen: the statement is readable at once; behind and *through* the letters, the Line is a live tangle that leans toward the cursor. Scroll: the tangle pulls taut into one horizontal line, then the filmed layer (A1→A2) shows the same pull as a physical filament | "We turn business complexity into AI systems that work." · 45 days · fixed price · Friday demos | oversized words sit *between* stage layers; the Line passes in front of some letters, behind others |
| 1 | **Voice** (220vh) | the taut line starts to vibrate into speech → words peel off the waveform into a transcript → the transcript resolves into fields → an action fires, and a draft stops at a review gate | MediConsult flow; Caption CC 5-stage pipeline; MediScribe (In Progress) | transcript words are real DOM text released from the waveform's position |
| 2 | **Knowledge** (220vh) | the waveform flattens and becomes a retrieval path that threads through a stack of document slabs, linking passages; relationships branch; one cited answer lands | Legal Assistant (4 crews, Indian Kanoon), Neura | citations dock onto the path as it passes them |
| 3 | **Anatomy** (280vh, the Camera principle) | the path stands up into a vertical spine; an agent **separates into six layers**: Input, Context, Reasoning, Tools, Memory, Actions, each labelled with the real build that shows it; then the layers close back onto the spine | Input: MediConsult calls · Context: Legal documents · Reasoning: crews · Tools: OCR, Indian Kanoon · Memory: Neura · Actions: booking, review gate | layer labels slide out with their layers (2.5D CSS 3D, not WebGL) |
| 4 | **Operations** (220vh) | the spine falls sideways and routes: seven branch nodes, decisions, a loan state machine; the Line visibly *chooses* paths | Saloon (7 / 600+ / 1,000+), Kanaka lifecycle, MERIDIAN 9 state machines | counters run while the route passes them |
| 5 | **Products** (200vh) | routed lines square up into an interface wireframe; a typed request becomes structure, then a usable screen outline | DesignT, OptimaFlow (DAG) | the headline compresses into the wireframe's header |
| 6 | **The Map** (240vh; Anchor A2 world under it) | camera pulls back: every shape the Line made (waveform, path, spine, routes, wireframe) shrinks into place as **a region of one map**. The map is literally assembled from the chapters | 4 regions, 6 services, 15 builds; regions are links | region names type on along the Line |
| 7 | **Work** (normal flow, horizontal rail) | the Line becomes a rail; 15 builds hang from it in order with their real status marks; scrolling moves the rail | all 15 projects: name, category, status | rows, not cards |
| 8 | **Process** (160vh) | the rail straightens into a 45-day timeline; Friday ticks appear; Launch is day 45 | Scope → Build → Launch → Grow; 3 engagement models | |
| 9 | **Trust** (normal flow) | the timeline becomes a checkpoint route; 10 practices are gates, human review and fallback are distinct gate shapes | 10 practices, certification note verbatim, 1 testimonial | |
| 10 | **Contact** (Anchor A3) | the Line settles into the contact field and becomes its text cursor. **The one interactive moment:** as the visitor types their friction, the Line takes on their words' rhythm, a tangle that pulls taut when they send | form + direct contact | |

---

## 5. Motion architecture

- **One stage, one owner.** A single fixed full-viewport `<canvas>` draws the Line (and its nodes) for the whole homepage. DOM content scrolls over it. Nothing else animates the Line.
- **The Line model.** 320 sample points (160 on phones). Each chapter declares its shape as a pure function `shape(t, progress, viewport) → points`. The renderer interpolates between the current and next shape with a per-point stagger, so the Line *flows* into the new form instead of cross-fading. Branches are child lines grown out of a point on the Line, so continuity is never broken.
- **Clock.** Scroll gives a target progress per chapter; a rAF loop eases the drawn progress toward it with the 10k dt-normalised lerp and goes to sleep when converged. No free-running loops. Drawing is skipped when nothing changed.
- **DOM choreography.** GSAP ScrollTrigger only for pin ranges and to read progress; DOM entrances are CSS driven by one `--k` per chapter (10k pattern), transform and opacity only, seeded splits, reversible.
- **Cursor (Pouterby principle, hero only, fine pointers only).** A pointer field bends the tangle's points within a radius; eased, so it never jitters; disabled on touch and reduced motion.
- **Frame sequence (Ora principle, one scene).** The filmed A1→A2 pull is extracted to ~72 frames, decoded on demand into a small window of ImageBitmaps (±10 around the current frame), drawn to its own canvas. Frame count is decided by testing, lowest that looks smooth.
- **Video → still → code (Eagle principle).** The film's last frame IS the A2 still; the code Line is positioned to lie exactly on the filament in that frame, so the physical line hands over to the drawn one with no visible cut.
- **Exploded view (Camera principle).** CSS 3D transforms with one perspective container; each layer is a DOM plane with real text; no WebGL.

## 6. Handoff map

| Boundary | Outgoing | Incoming | Shared element | Scroll behaviour | Fallback (reduced motion) | Mobile |
|---|---|---|---|---|---|---|
| Hero → Voice | tangle pulled taut; filmed filament | waveform | the taut Line starts to vibrate | continuous; film ends exactly on the drawn Line | resolved Line + waveform drawn statically | film replaced by A2 still; code untangle only |
| Voice → Knowledge | waveform | retrieval path | the Line flattens and threads the first document | continuous | both final states stacked | vertical path through stacked docs |
| Knowledge → Anatomy | cited answer | agent spine | the path rotates upright into the spine | continuous | exploded view shown open, labelled | layers become a vertical list that opens one by one |
| Anatomy → Operations | layers closing | routing field | the spine falls sideways into the main route | continuous | final route drawn | vertical route |
| Operations → Products | routes | wireframe | routes square up into interface borders | continuous | wireframe drawn | smaller wireframe |
| Products → Map | wireframe | map | every earlier shape shrinks into its region | continuous zoom-out | map shown complete | map as 2×2 regions |
| Map → Work | map | work rail | the map's main channel extends into the rail | continuous | rail static | vertical list on the Line |
| Work → Process | rail | 45-day timeline | the rail straightens and gains ticks | continuous | timeline static | vertical timeline |
| Process → Trust | timeline | checkpoint route | the timeline continues into gates | continuous | route static | same, vertical |
| Trust → Contact | route | contact field | the route ends as the field's cursor line | continuous | Line drawn as the underline | same |

No fades are used as handoffs. Every boundary shares the Line.

## 7. Technology per scene

| Scene | DOM/CSS | SVG | Canvas | GSAP | Motion | WebGL | Gemini | Veo |
|---|---|---|---|---|---|---|---|---|
| Hero tangle + cursor | type | | ✓ Line | pin range | | ✗ | A1 still | ✓ one clip, as frames |
| Voice / Knowledge / Operations / Products | text, docs, fields | icons only | ✓ Line + nodes | pin ranges | | ✗ | | |
| Anatomy (exploded) | ✓ 3D planes | | ✓ spine | pin range | | ✗ (CSS 3D is enough) | | |
| Map | labels, links | | ✓ | pin range | | ✗ | A2 still | |
| Work / Process / Trust | ✓ | | ✓ Line | reveal triggers | | | | |
| Contact | ✓ form | | ✓ Line reacts to typing | | | | A3 still | |
| Inner pages | ✓ | | small static Line | | | | region crops of A2 | |
| Region → page transition | View Transitions API (shared element), instant fallback | | | | | | | |

Framer Motion is not added: GSAP plus CSS already covers everything, and two animation libraries would break the one-owner rule.

## 8. Generated asset plan (nothing generated before approval)

One physical world so film, stills and code agree: **macro photography of translucent drafting films (vellum) and graphite, with one vermilion filament.** Same lens (100mm macro, shallow depth), same cool north light, same materials in all four assets. No text, UI, logos, people.

| Asset | Scene | Model | Output | Est. cost |
|---|---|---|---|---|
| A1 | loose vellum sheets drifting out of alignment, graphite marks scattered, the filament tangled across them (hero start) | gemini-3-pro-image | 16:9, 2K (4K exceeds the 30s proxy limit) | ~$0.13 |
| A2 | the same sheets aligned into a precise stack, the filament pulled taut through aligned holes (hero end; film's last frame; map backdrop; inner-page crops) | gemini-3-pro-image, A1 as reference | 16:9, 2K | ~$0.13 |
| A3 | the stack resolved in warmer light, filament running out of frame toward the viewer (contact) | gemini-3-pro-image, A2 as reference | 16:9, 2K | ~$0.13 |
| V1 | first frame A1 → last frame A2: the filament pulls taut and the sheets slide into alignment; slow push-in, no cuts | veo-3.1-generate-preview, first+last frame | 16:9, 1080p, 8s, audio discarded | ~$3.20 |
| **Total** | | | | **≈ $3.60** (prices unverified; check AI Studio) |

Why the film earns its cost where code cannot: real translucency, light through stacked film and a physically believable pull. Why everything else is code: the Line must be exact, reversible and continuous with the DOM.

## 9. Mobile

- Same chapters, same Line, vertical compositions: each chapter's `shape()` has a portrait variant, the Line runs down the left third, text takes the right two thirds or sits below.
- Pins capped at about 100vh per chapter; no scroll traps. Anatomy becomes a vertical stack that opens layer by layer as you scroll past.
- No film download: phones get A2 as a still at the hero's end state; the code untangle still runs.
- 160 Line points, DPR capped at 2, no cursor field.

## 10. Performance strategy

| Budget | Target |
|---|---|
| JS (gzip) first load | ≤ 150 KB |
| LCP | ≤ 2.5s field, hero still + DOM statement is the LCP element |
| CLS | ≤ 0.05 |
| Main-thread long tasks while scrolling | none > 50ms |
| Line draw cost | ≤ 1.5ms per frame at 320 points |
| Frame sequence | ~72 frames × ~55 KB WebP ≈ 4 MB, desktop only, fetched after first paint, decoded in a ±10 window (≈ 80 MB decoded max, released when off-screen) |
| Loading order | current chapter → next chapter → later only on approach (IntersectionObserver with a one-viewport margin) |
| Idle | rAF sleeps when converged; nothing animates off-screen or in hidden tabs |

## 11. The hardest, load-bearing interaction

**The persistent Line: one continuous line that is drawn by code, survives every chapter boundary, and flows between completely different shapes (tangle → taut → waveform → retrieval path → routing) in both scroll directions at 60fps, with DOM content released from it, on desktop and phone, with a reduced-motion equivalent.**

It is load-bearing because every handoff in §6 depends on it. If it stutters, breaks continuity, or cannot be read on a phone, the concept fails and must change before anything else is built. The film, the anchors and the exploded view are all replaceable; the Line is not.

Prototype scope (code only, no paid generation): route `/lab/line` with chapters 0 to 2 plus the start of 4, the cursor field, the vellum/graphite/vermilion tokens and the three type faces. Validation: frame timing (normal and 4× CPU), flick test, reverse scroll, resize, phone portrait, reduced motion, a recorded video.

## 12. Decisions for you

1. **Palette:** vellum + graphite + vermilion (recommended), or keep a signal colour closer to the brand's blue.
2. **Scrolltide access:** allow `scrolltide.co` or send recordings, so §2 can be done properly.
3. **Generation:** approve the §8 set (≈ $3.60) after the prototype is validated, not before.
