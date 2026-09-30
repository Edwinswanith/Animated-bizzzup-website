# Website3 Storyboard + Asset Plan (v2.1, approved; K1 generated)

Facts: the previous company website, 28 pages read 2026-09-29 (content only; no design, layout or code used).
Direction: DESIGN_BRIEF.md. Typography: editorial serif + technical mono.
Approved since v1: map regions Voice / Knowledge / Operations / Products; ~1 small real screenshot per full case study; form behind a configurable server adapter; Conroy Brown testimonial used unlinked; max 3 anchors, max 1 Veo clip.
Nothing generated. Quoted lines are facts to carry, not final copy.

---

## 1. Factual content map

**Company.** Tech Cogniverse, the AI engineering practice under the Tech Cogniverse brand; builds AI agents, voice systems, RAG platforms, custom software, full-stack web and mobile products. Founded by Suhail and Edwin Swanith; Chennai, India. Team: Suhail (Founder, Principal Design), Edwin Swanith (Co-Founder, AI/ML), Kishore (AI Engineer), Vikram (voice interfaces, automation, real-time AI).
**Core promise.** "Your AI system, live in 45 days. Fixed price. Demo every Friday." "Built for production, not demos."
**Numbers.** 15 selected builds · 12 delivered or live (verified: 3 In Progress) · 45-day fixed window · 10+ industries.
**Clients named.** Priya Natural Care (7 branches on one operations system) · Intuitive Neurons (AI note editor, concept to product).
**Testimonials (published).**
- "Tech Cogniverse took our AI note editor from concept to a working product, with visible progress every single week. They build fast, and they build properly." Conroy Brown, Intuitive Neurons. **Not linked to a project.**
**Process.** Scope (20-minute call → 2-page proposal; fixed scope, fixed price, 50% advance) → Build (demo every Friday) → Launch (live in 45 days: deployed, tested, documented, handed over) → Grow (monthly retainer). "No hourly billing. No open-ended scope. No disappearing for a month."
**Engagement models.** Launch Sprint from ₹60k (~$900), 10 days · Core MVP from ₹2.5L (~$3k), 45 days (marked most popular) · Growth Retainer from ₹30k/month (~$450). Final quote after scoping; depends on scope, integrations, AI complexity, deployment.
**Production practices (10).** Secure API architecture · role-based access control · Dockerized services · cloud deployment · CI/CD · monitoring and logging · database + vector DB setup · human review checkpoints · fallback flows · data privacy. Plus verbatim honesty line: no SOC 2, ISO, HIPAA or uptime guarantees unless independently audited.
**Contact.** edwinswanith006@gmail.com · +91 9003 020 030 · 105, ECR Road, Panaiyur, Chennai 600119, Tamil Nadu, India · booking link and social profile: pending Tech Cogniverse accounts · "Typically respond within 24 hours". Existing form fields: name, email, company, need (AI Agent, RAG / Chatbot, Workflow Automation, Voice AI, Computer Vision, Custom AI App, Business Software, Not sure yet), stage (Idea, Prototype, Existing product, Need automation, Need AI integration, Need technical audit), budget (Under ₹1L, ₹1L–₹3L, ₹3L–₹5L, ₹5L+, Not sure yet), message.
**Existing CTAs.** Book an AI audit · View our work · Start a project · Discuss a similar project · book a 20-minute call.
**Legal pages.** Privacy Policy (information collected, use, service providers, cookies and local storage, retention and deletion, contact). Content Rights (ownership, project screenshots and case studies, third-party marks, AI-generated and assisted content, corrections and takedown, contact). Text will be carried from the live pages at build time.

**Projects** (full case study = has multi-section page; snapshot = short page):

| Project | Region | Category | Status | Depth | Friction → system |
|---|---|---|---|---|---|
| MediConsult (formerly Doctor AI) | Voice | Healthcare | Production-ready MVP | full | calls routed by hand, nothing recorded → VAPI routing, Deepgram live transcript, NL scheduling, prescription lifecycle with doctor review; Outlook sync |
| Caption CC | Voice | AI Media | Production-ready MVP | full | Tamil-English code-switched video → 5-stage caption pipeline, 7-stage dubbing; SRT/VTT/MP4; 500 MB, 10 min |
| MediScribe | Voice | Clinical AI | In Progress | snapshot | consultations → ESP32-S3 recorder → transcript → draft note held for doctor review |
| Legal Assistant (formerly Lawyer AI) | Knowledge | Legal AI | Delivered MVP | full | documents → 4 CrewAI crews, Mistral OCR, 3 LLM providers, Indian Kanoon case law |
| Neura | Knowledge | AI Memory | Delivered MVP | snapshot | conversations, voice notes, meetings, WhatsApp → tasks, decisions, risks, people → searchable memory |
| Saloon Management System · Priya Natural Care | Operations | Operations | Production | full | 7 branches, 600+ customers, 1,000+ transactions on one POS/inventory/staff/CRM/analytics system; Cloud Run; v20 |
| Kanaka Gold Loan | Operations | Fintech | Delivered MVP | snapshot | borrower journey + server rules (rate snapshot, LTV, fees) |
| MERIDIAN | Operations | Marketplace | Launched (Saudi Arabia) | full | 3 apps, 12 modules, 9 state machines, ~111 endpoints, ~400 unit tests |
| FlightDeck | Operations | EdTech | Delivered MVP | snapshot | study content, quizzes, mentor sessions, role-based |
| DesignT | Products | E-commerce | MVP | full | prompt + references → Gemini artwork → live mockup → 4-step checkout |
| OptimaFlow | Products | ML Tooling | Delivered MVP | snapshot | nodes → validated DAG → topological execution; quantization variants |
| Health Activity Dashboard | Products | HealthTech | MVP | full | Apple Health + Health Connect, 3 platforms, labelled demo mode |
| Apex | Products | SportsTech | In Progress | snapshot | check-ins → readiness indicators and risk flags |
| Nutrition | Products | HealthTech | In Progress | snapshot | deterministic health targets + AI meal classification |
| Void Runner | Products | Game | Delivered MVP | snapshot | Three.js space shooter |

Screenshots (D3): used only on the 7 full case studies, one each, small, captioned as the real product.

## 2. Region mapping

| Region | Transformation grammar | Services | Lead evidence | Signal |
|---|---|---|---|---|
| **Voice** | speech → structured information → intelligence/action | Voice AI Development | MediConsult, Caption CC, MediScribe | teal → amber |
| **Knowledge** | documents/information → retrieval/reasoning → usable knowledge | RAG Development, AI Agent Development | Legal Assistant, Neura | teal → cobalt |
| **Operations** | fragmented processes → connected workflow → controlled operations | Workflow Automation, Custom Business Software | Saloon, Kanaka, MERIDIAN, FlightDeck | cobalt → amber |
| **Products** | business need → structured product → usable experience | AI MVP Development | DesignT, OptimaFlow, Health Dashboard, Apex, Nutrition, Void Runner | cobalt → full product color |

Agents sit in Knowledge because every published agent example (Legal Assistant's crews) works on documents; the Agents service page still links from Operations too, since it lists intake, routing and follow-up.

---

## 3. Homepage storyboard

Colors: cobalt = structure · teal = voice/data flow · coral/amber = action. Base: limestone, pale cool gray, sand, warm ivory used sparingly.
Motion owners: GSAP ScrollTrigger (pinned scrubs only) · CSS (hover, focus, entrances) · one owner per property.
Every chapter is complete as static HTML before motion is added.

### 0 · Hero (Anchor 1, still K1)
- **Friction:** a consultation call nobody routes, records or acts on.
- **Capability:** voice AI that transcribes, understands and acts, with a human in the loop.
- **Start:** left: serif statement + mono line (45 days · fixed price · demo every Friday). Right: K1 (macro mineral sand moved by sound, muted) under a noisy teal trace and 4 disconnected mono nodes: routing · live transcript · scheduling · draft for doctor review. Cobalt lines broken.
- **Scroll:** noise settles into a waveform → words peel off into a transcript column → cobalt lines connect in order → amber pulse on "scheduling" → the prescription draft stops at a review gate. K1 warms slightly.
- **Final:** complete flow, caption "How MediConsult's voice layer works · illustration".
- **Facts:** positioning line, 45 days, fixed price, weekly demos; MediConsult name and status.
- **CTA:** primary "Describe your friction" (jumps to closing form) · secondary "See the work".
- **Build:** SVG nodes/lines/labels, Canvas waveform, HTML text; GSAP pin + scrub.
- **Desktop:** ~120vh pin, fully reversible. **Mobile:** statement, then system below; flow runs top→bottom; pin ≤80vh; K1 as 9:16 crop. **Reduced motion:** final flow, no pin.
- **Next:** the waveform's baseline continues down the page as the chapter-1 timeline.

### 1 · Voice (Caption CC, MediScribe)
- **Friction:** mixed Tamil-English video nobody can subtitle; consultations nobody has time to write up.
- **Start:** one waveform in two tones (Tamil / English segments).
- **Scroll:** splits into two token streams → merges into one English subtitle track on a time ruler → three amber export marks (SRT · VTT · MP4). Aside: consult → draft note → doctor-review gate, tagged In Progress.
- **Final:** timed track + exports; project notes (name, category, status, one line, case-study link).
- **Facts:** 5 caption stages, 7 dubbing stages, 10 min, 500 MB; MediScribe In Progress.
- **CTA:** "Read the Caption CC case study" · "Voice AI" service link.
- **Build:** SVG + CSS; short scrub. **Mobile:** vertical ruler. **Reduced motion:** final track.
- **Next:** the subtitle lines become the lines of a document page.

### 2 · Knowledge (Legal Assistant, Neura)
- **Friction:** answers buried in documents and scattered conversations.
- **Start:** a loose stack of pages.
- **Scroll:** pages fan into 4 cobalt lanes (comparison · content listing · suggestions · PDF analysis); a teal retrieval line brings case law in; lanes converge into one answer with citation marks, halted at a review gate. Beat 2: voice note / meeting / WhatsApp inputs settle into a small graph of tasks, decisions, risks, people.
- **Facts:** 4+ crews, 3 LLM providers, Indian Kanoon; Neura Delivered MVP.
- **CTA:** "Read the Legal Assistant case study" · "RAG" / "AI Agents" links.
- **Build:** SVG. **Mobile:** lanes stack vertically. **Reduced motion:** converged answer + graph.
- **Next:** the graph's nodes spread and become branch markers.

### 3 · Operations (Saloon, Kanaka, MERIDIAN)
- **Friction:** 7 branches, 7 ledgers, nothing agrees.
- **Start:** 7 small branch ledgers, misaligned, counting differently.
- **Scroll:** ledgers slide into one grid; counters settle on 7 branches · 600+ customers · 1,000+ transactions; a low-stock rule (≤5 units) fires amber. Beat 2: a loan path becomes an explicit state machine (estimate → apply → KYC → documents → appointment → track → repay) with server-rule marks (rate snapshot · LTV · fees). MERIDIAN as a footnote: 9 state machines, launched.
- **CTA:** "Read the Saloon case study" · "Workflow Automation" / "Business Software" links.
- **Build:** SVG + CSS grid. **Mobile:** ledgers stack; state machine vertical. **Reduced motion:** final grid + machine.
- **Next:** the state machine's last node becomes a text cursor.

### 4 · Products (DesignT, OptimaFlow)
- **Friction:** an idea with no product around it.
- **Start:** one typed sentence (a t-shirt idea) in mono.
- **Scroll:** sentence → an abstract artwork shape (code-drawn, not a fake design) → garment silhouette → 4-step rail (Design → Customize → Details → Payment). Beat 2: loose nodes snap into a validated DAG and light in execution order.
- **Facts:** 4 checkout steps, up to 3 reference images; OptimaFlow Delivered MVP.
- **CTA:** "Read the DesignT case study" · "AI MVPs" link.
- **Build:** SVG. **Mobile:** vertical rail. **Reduced motion:** final rail + DAG.
- **Next:** all four chapter graphics shrink toward center and dissolve into a close crop of K2.

### A2 · The system map (Veo V1 → still K2)
- **Friction:** "what else do you build?"
- **Start:** the chapter-4 graphics dissolve into a close crop of K2 (one terrain detail, full-bleed).
- **Transformation:** V1 plays once when the section enters: the camera climbs from that detail to the full aerial terrain (K2), with real parallax and haze, not a flat zoom. Ends on K2 still; HTML region labels + SVG outlines fade in (Voice · Knowledge · Operations · Products), each with its services and project count.
- **Final:** interactive map; hover/focus highlights a region; click enters the region's service page.
- **Build:** video (desktop, `preload="none"`, loaded when the previous chapter is near) + still + SVG/HTML overlay. Scrolling back up swaps to the K2 close-crop still (video never scrubbed or reversed).
- **Mobile:** no video; K2 still with a short scale-in; regions as a stacked, tappable list over a crop. **Reduced motion:** K2 still + map; no video.
- **Next:** the map dims; a route starts at the Voice region.

### 5 · Process (route over K2)
- **Friction:** agencies that go silent for a month.
- **Scroll:** cobalt route draws Scope → Build → Launch → Grow; Build shows Friday ticks; Launch marks day 45. Three engagement models as quiet side notes.
- **Facts:** process steps, "no hourly billing…", 3 models with prices.
- **CTA:** "See how we work" (process page).
- **Build:** SVG over dimmed K2. **Mobile:** vertical route. **Reduced motion:** complete route.
- **Next:** gates appear along the finished route.

### 6 · Trust
- **Friction:** "will it survive production?"
- **Transformation:** review gates and fallback paths appear on the route; the 10 practices appear as mono checkpoints (not cards); honesty line verbatim; two testimonials; 15 builds / 12 delivered or live; named clients.
- **CTA:** "See all work".
- **Build:** SVG + HTML, entrance only. **Mobile/Reduced:** same content, static.
- **Next:** the route ends at a single open input line.

### A3 · Closing (still K3)
- **Friction:** the visitor's own.
- **Visitor sees:** K3 (terrain in warm resolved light, low angle, open negative space) + form "Describe your friction" (existing field set) + "book a 20-minute call" + contact details + response-time line.
- **Behavior:** submit → server adapter. Success is shown only on a real 2xx; the visitor's text then animates in as the newest input line. Validation, loading, failure and retry states are real. Until a provider is configured, the form says the team can't be reached through it and shows email and phone instead (never fake success).
- **Build:** HTML form + server route + adapter interface. **Mobile/Reduced:** identical, no line animation.

---

## 4. Inner-page storyboard

Common frame: same tokens, type and motifs; quieter pages; one transformation each. **Entry:** from the map, the K2 region crop scales from its map position to a banner (≈600 ms, desktop). **Direct load:** starts on the settled banner. Soft crop → code/typography banner fallback.

| Page | Region banner | One transformation | Content | Proof |
|---|---|---|---|---|
| /services/voice-ai-development | Voice | call → live transcript → scheduling action → confirmation gate | fit, problems, deliverables, out of scope, stack, timeline and pricing factors, safeguards | links: MediConsult, Caption CC, MediScribe |
| /services/rag-development | Knowledge | documents → retrieval → grounded answer with citations | same structure | Legal Assistant, Neura |
| /services/ai-agent-development | Knowledge | one task split across scoped agents → structured output → review | same | Legal Assistant |
| /services/workflow-automation | Operations | manual status updates → explicit state machine | same | Saloon, Kanaka |
| /services/custom-business-software | Operations | scattered tools → one role-based system (owner/manager/staff) | same | Saloon, MERIDIAN |
| /services/ai-mvp-development | Products | idea → scope → 45-day build with Friday ticks → launch | same + 3 models | DesignT, OptimaFlow |
| /services (index) | whole map | the six services placed on the four regions | "which service fits your problem" mapping (from live site) | |
| /work (index) | whole map | filter by region / status reshapes the list | 15 projects: name, category, status, one line | |
| /work/[full case study] ×7 | project's region | that project's own mechanism (from its homepage chapter or page facts) | problem, how it works, architecture facts, metrics as published | one small real screenshot |
| /work/[snapshot] ×8 | project's region | a compact version of the region grammar with its own facts | how it works, operational value, status | none |
| /process | route | Scope → Build → Launch → Grow, Friday ticks | 3 models, 10 practices, honesty line | |
| /about | whole map, quiet | none (text-led) | company facts, founders, 4 people as names + roles (no photos) | |
| /privacy-policy, /content-rights | none | none | legal text, updated date | |

---

## 5. Asset plan

| Visual | Class |
|---|---|
| Hero flow, subtitle track, crew lanes, memory graph, ledgers, state machines, checkout rail, DAG, route, gates, all inner-page transformations | **CODE** (SVG, Canvas, CSS) |
| Region outlines, labels, map interaction, banner crops and masks | **CODE** over K2 |
| K1 macro sand moved by sound | **GEMINI IMAGE** |
| K2 aerial mineral terrain, four regions | **GEMINI IMAGE** |
| K3 terrain in warm resolved light | **GEMINI IMAGE** |
| V1 climb, K2 close-crop → K2 | **VEO** (desktop only) |
| Tech Cogniverse logo | **REAL ASSET** (existing logo file) |
| 7 case-study screenshots (one each) | **REAL ASSET** (existing project media, highest-resolution version) |
| Team photos, old plates, old hero media | not used |

Delivery: masters (4K) kept out of the public folder; served derivatives at 960 / 1600 / 2560 wide in AVIF + WebP + JPEG fallback; mobile gets 9:16 crops; video only on desktop, `preload="none"`, poster = K1.

---

## 6. Gemini image plan

Model: **`gemini-3-pro-image`** (Nano Banana Pro, stable, confirmed available). Reason: material texture fidelity and 4K output, because inner-page banners are crops of K2. Flash Image is cheaper but these three are the site's only generated surfaces.
Shared prompt rules: photographic, natural daylight, shallow haze, mineral palette (limestone, pale cool gray, sand, muted clay, warm ivory), thin cobalt and teal light only where stated, no text, no letters, no UI, no screens, no logos, no people, no devices.

| Card | K1 · Hero | K2 · Map | K3 · Closing |
|---|---|---|---|
| Purpose | establish the world; sound becoming structure | the whole system; Veo last frame; inner-page banners | resolution around the form |
| Section | Hero, A2 start | A2, process, trust, inner pages | Closing |
| Prompt concept | extreme macro of fine limestone-colored sand on a flat plate, partially organized into concentric standing-wave patterns by sound, one side still disordered; faint teal light grazing the ridges; top-down, very shallow depth | aerial top-down view of a mineral landscape of the same sand and stone, four clearly distinct terrain zones (rippled sand, layered stone, grid-like terraces, smooth sculpted clay), thin cobalt and teal channels connecting them; generous calm areas | low-angle view across the same terrain at warm late light, patterns fully resolved, a thin amber channel reaching the horizon, large open sky/negative space on one side |
| Output | 16:9, 4K | 16:9, 4K | 16:9, 4K |
| Attempts (max) | 2 | 2 | 2 |
| Why not code | photographic grain, light scatter and material depth at 4K need a GPU shader far heavier than one image; a procedural version looks synthetic | same material world at a different scale; must match K1 for Veo | same world in different light; a CSS tint of K2 reads as a filter, not a place |

## 7. Veo plan

| | V1 · Pull-back |
|---|---|
| Model | **`veo-3.1-generate-preview`** (Veo 3.1). Fast/lite rejected: the camera move is the only thing this clip exists for |
| Input | first frame = a close crop of K2 (cut from the 4K master, no extra generation), last frame = K2 (frame interpolation); prompt: slow continuous vertical camera climb with parallax between ridges and channels, haze increasing with altitude, no cuts, no text |
| Output | 16:9, 1080p, 8 s; audio discarded; delivered as ~5–6 s trim, H.264 + VP9/AV1, target ≤4 MB |
| Attempts (max) | 1 (a retry needs separate approval) |
| Why not code | a code zoom of K2 is flat (no parallax, no atmospheric depth). Acceptance test: V1 ships only if it is visibly better than a code zoom of the same crops; otherwise the code zoom ships |
| Must confirm at submission | first+last frame interpolation and 1080p/8 s for this model on this API; if unsupported, stop and report before spending |

## 8. Estimated API cost

| Item | Model | Unit price (UNVERIFIED) | Max count | Max cost |
|---|---|---|---|---|
| K1–K3 finals | gemini-3-pro-image, 4K | ~$0.24 / image | 3 | ~$0.72 |
| K1–K3 retries | same | ~$0.24 | 3 | ~$0.72 |
| V1 | veo-3.1-generate-preview, 8 s | ~$0.40 / s | 8 s | ~$3.20 |
| **Ceiling** | | | 6 images + 1 clip | **≈ $4.64** |

Unverified because ai.google.dev (pricing) is blocked by the network policy. Please check your AI Studio billing page before approving, or allow ai.google.dev and I'll verify.

## 9. Generation order (each needs its own approval)
1. K1: done (attempt 1 kept, plate framing accepted for hero only) → 2. K2 (same material and palette as K1; must hold detail when cropped ~3x for V1's first frame) → review → 3. K3 → review → 4. V1 from approved K2 crop + K2.

## 10. Stack (reversible)
Next.js App Router + TypeScript; plain CSS with tokens; GSAP + ScrollTrigger for pinned scrubs; SVG + one Canvas; server route for the form with a provider adapter configured by env (none bundled). Fonts: an editorial serif (e.g. Newsreader) + technical mono (e.g. JetBrains Mono); none from the old site.


## Decision log (post-approval)
- Brand renamed to Tech Cogniverse. Cogniverse is the same company, so the former client testimonial from its CEO and the Cogniverse client line are removed; MediConsult is presented as the company's own product.
- Veo V1 skipped for now (no explicit approval); the code zoom ships.
