# Case-study evidence audit

Internal document. Not published on the website. Generated as part of the
`fix/geo-content-authority` branch to separate what's currently claimed on
`/work/[slug]` pages from what's actually verified.

For every project in `src/data/projects.ts`, this records: what evidence
category the current copy falls into, what's missing to publish a stronger
claim, exact questions the owner/client needs to answer, and whether the
project currently supports a Full Case Study or should stay a Build Snapshot.

## Evidence categories (for reference)

- **A. Verified implementation fact** — e.g. "uses VAPI and Deepgram." Already well-covered across all 15 projects via `techStack`/tags.
- **B. Verified measured result** — e.g. "reduced average handling time from X to Y." **None of the 15 projects currently have this.** The `evidence.measuredOutcome` field added to `ProjectDetails` is unpopulated everywhere.
- **C. Intended/expected operational benefit** — e.g. "designed to reduce repetitive administration." This is what `businessImpact` currently contains for every project. The UI now labels this "Operational Value" (not "Business Impact") wherever no `evidence.measuredOutcome` exists, precisely because it's category C, not B.

---

## 1. Caption CC (`caption-cc`)

- **Evidence available:** Category A (5-stage pipeline, 7-stage dubbing, specific tech stack) is solid and detailed. Category C claims ("cuts manual captioning effort," "expands regional content") are plausible but unmeasured.
- **Evidence missing:** No client/owner identified (may be an internal/portfolio project — confirm). No usage volume, no measured time savings, no adoption data.
- **Questions for the owner:** Is this a client project or an internal build? If internal, is it in active use — by whom, how often? Has anyone measured time saved vs. manual captioning?
- **Current tier support:** Full Case Study tier is justified by implementation depth (category A), not by results (no category B). Keep tier, but do not add outcome numbers without evidence.
- **Claims requiring verification:** "Cuts manual captioning and translation effort" — currently unverified, phrased as intended benefit only.
- **Evidence priority:** Low — no named client to follow up with unless this is an internal product with real usage data available.

## 2. DesignT (`designt`)

- **Evidence available:** Category A is strong (Gemini Vision, Razorpay checkout, live at designt.in). `liveUrl` present — this is real, verifiable deployed software.
- **Evidence missing:** No order volume, conversion data, or user counts. No client name (may be Bizzzup's own product — confirm ownership).
- **Questions for the owner:** Is DesignT a Bizzzup-owned product or a client build? If owned, is there real order/traffic data to cite? If client, who is the client and can they be named?
- **Current tier support:** Full Case Study justified by depth; no measured results to add yet.
- **Claims requiring verification:** "Shortens design-to-product cycle," "improves conversion through realistic previews" — both category C, unverified.
- **Evidence priority:** Medium — it's live and testable, so usage data may be obtainable directly (analytics, order counts) without needing external client sign-off, if Bizzzup owns it.

## 3. MediConsult / Doctor AI (`doctor-ai`)

- **Evidence available:** Named client on file: "Cogniverse — Rahul, CEO." Category A is the deepest in the portfolio (VAPI, Deepgram, CrewAI, Microsoft Graph). This is the strongest candidate for a verified case study.
- **Evidence missing:** No measured outcome (call volume, scheduling time saved, consultation count), no measurement period, no client quote.
- **Questions for the owner:** Since a named client contact exists, this is the highest-priority project to go back to for: (1) a specific measured result — e.g. average scheduling time before/after, consultation volume handled; (2) permission to quote Rahul directly; (3) production status confirmation (`status` is currently "Production-ready MVP" — is it in live use with patients today?).
- **Current tier support:** Full Case Study, well-supported by implementation depth.
- **Claims requiring verification:** "Reduces repetitive clinic administration," "improves patient-doctor coordination" — both category C. With a named client, these are the most realistic to convert to category B.
- **Evidence priority:** **Highest** — named client, richest implementation, most service pages cite it (`ai-agent-development`, `voice-ai-development`, `workflow-automation`).

## 4. MediScribe (`mediscribe`)

- **Evidence available:** Category A only (FastAPI, React Native, ESP32-S3 hardware). Status is "In Progress."
- **Evidence missing:** Everything outcome-related — expected, since it's not yet complete.
- **Questions for the owner:** What's the current completion/deployment status? Is there a pilot clinic or user testing this yet?
- **Current tier support:** Build Snapshot — correct as-is, should not be expanded until the project is further along.
- **Claims requiring verification:** "Reduces documentation time" is aspirational (category C) and appropriately hedged already ("keeps clinical safety under doctor control").
- **Evidence priority:** Low until the project reaches a testable stage.

## 5. Neura (`neura`)

- **Evidence available:** Category A only. Status "Delivered MVP" with no client named.
- **Evidence missing:** No client, no usage data, no measured recall/follow-up improvement.
- **Questions for the owner:** Is this an internal tool (e.g. used by Bizzzup's own founders) or delivered to an external client? If internal, real usage data may exist already.
- **Current tier support:** Build Snapshot — correct.
- **Claims requiring verification:** "Improves recall, follow-up, and task continuity" — category C.
- **Evidence priority:** Medium if internal (data may already exist), low if no owner is available to ask.

## 6. FlightDeck (`flightdeck`)

- **Evidence available:** Category A only. "Delivered MVP," no client named.
- **Evidence missing:** Student count, quiz completion data, mentor session volume.
- **Questions for the owner:** Is this deployed to real aviation students? How many active users/mentors?
- **Current tier support:** Build Snapshot — correct.
- **Claims requiring verification:** "Gives students measurable practice and feedback" — ironic that the claim about measurement is itself unmeasured. Category C.
- **Evidence priority:** Medium — cited as evidence for `ai-mvp-development`.

## 7. Void Runner (`void-runner`)

- **Evidence available:** Category A only. No client (appears to be a demo/portfolio game project).
- **Evidence missing:** Player counts, retention data — the "Business Impact" text itself says these are *potential* future directions ("can expand into leaderboards..."), which is honestly category C already.
- **Questions for the owner:** Confirm this is a demo project, not attached to a paying client, so no case-study evidence work is expected here.
- **Current tier support:** Build Snapshot — correct.
- **Evidence priority:** Lowest — not cited by any service page, appears to be a portfolio/skills demonstration.

## 8. OptimaFlow (`optimaflow`)

- **Evidence available:** Category A only. No client named.
- **Evidence missing:** Adoption data, comparison-speed claims unverified.
- **Questions for the owner:** Internal tool or client-delivered? Any users beyond the build team?
- **Current tier support:** Build Snapshot — correct.
- **Claims requiring verification:** "Accelerates comparison of quantization approaches" — category C, no baseline/measured comparison given.
- **Evidence priority:** Medium — cited as evidence for `ai-mvp-development`.

## 9. MERIDIAN (`meridian`)

- **Evidence available:** Category A is very strong (~111 endpoints, 30 DB entities, 9 state machines, ~400 unit tests — these are architecture facts, not business results, but they're specific and verifiable against the codebase). `liveUrl` present (an API endpoint, not a full storefront — confirm what's actually publicly live). Status "Launched."
- **Evidence missing:** No client name, no GMV/order/vendor volume, no country-specific performance data despite "Launched in Saudi Arabia" framing.
- **Questions for the owner:** Who is the client/operator behind MERIDIAN? Is it actually processing real transactions today? If so, what volume can be disclosed (even a range)?
- **Current tier support:** Full Case Study, justified by architecture depth. The "~111 API Endpoints," "30 DB Entities" etc. highlights are correctly framed as architecture stats, not business outcomes — do not reframe them as impact metrics.
- **Claims requiring verification:** "Supports multiple revenue models," "scales vendor operations," "provides foundation for regional marketplace expansion" — all category C.
- **Evidence priority:** High — "Launched" status implies real usage exists somewhere; worth following up given it's cited nowhere in services.ts currently (an omission worth revisiting once real evidence exists, since it's the most architecturally complex project in the portfolio).

## 10. Legal Assistant / Lawyer AI (`lawyer-ai`)

- **Evidence available:** Category A strong (CrewAI, LangChain, 3 LLM providers, Indian Kanoon integration). `liveUrl` present. Status "Delivered MVP."
- **Evidence missing:** No client, no measured research-time savings, no case volume processed.
- **Questions for the owner:** Is this deployed for a specific law firm or individual lawyers? Any usage data (documents analyzed, searches run)?
- **Current tier support:** Full Case Study, justified by depth.
- **Claims requiring verification:** "Speeds legal research and first-pass review" — category C, no baseline comparison.
- **Evidence priority:** High — most-cited project across service pages (`ai-agent-development`, `rag-development`, `ai-mvp-development`).

## 11. Kanaka Gold Loan (`kanaka-gold-loan`)

- **Evidence available:** Category A only. No client named despite the specific "Kanaka" brand name suggesting a real business.
- **Evidence missing:** Loan volume processed, application completion rate, any friction-reduction measurement.
- **Questions for the owner:** Who operates Kanaka Gold Loan — is this a real lending business? If so, can they provide even directional volume data (e.g. "X applications/month")?
- **Current tier support:** Build Snapshot — correct given no measured data.
- **Claims requiring verification:** "Reduces friction in secured-loan acquisition" — category C.
- **Evidence priority:** High — the branded name suggests a real operating business worth following up with directly.

## 12. Saloon Management System (`saloon`)

- **Evidence available:** Named client: "Priya Natural Care." `liveUrl` present. Category A includes real operational counts already stated as facts, not projections — "7 branches," "600+ customers," "1,000+ transaction records," "v20." These read as usage/adoption data already, but are not yet formally captured in the `evidence` block (e.g. `usageVolume`, `adoptionData`) and have no stated source/measurement date.
- **Evidence missing:** Confirmation of the "600+ customers" / "1,000+ transactions" figures' source and as-of date; no before/after operational metric (e.g. time saved on billing, inventory accuracy improvement).
- **Questions for the owner:** Can Priya Natural Care confirm the branch/customer/transaction counts and give an as-of date, so they can move into the `evidence.usageVolume`/`adoptionData` fields with a `measurementPeriod`? Any measurable before/after (e.g. stock-out incidents before vs. after automated low-stock alerts)?
- **Current tier support:** Full Case Study, well-justified. This is the best-evidenced project in the portfolio and the highest priority to formalize into the `evidence` fields.
- **Claims requiring verification:** "Unifies day-to-day operations," "improves inventory and staff control," "makes branch performance measurable" — category C framing, even though the surrounding facts (branch count, customer count) are closer to category A/B already.
- **Evidence priority:** **Highest**, alongside MediConsult — named client, live production system, existing quantitative claims just need sourcing and dating.

## 13. Apex (`apex`)

- **Evidence available:** Category A only. Status "In Progress," no client named.
- **Evidence missing:** Everything outcome-related — expected given in-progress status.
- **Questions for the owner:** Which academy, if any, is piloting this? Any athlete/coach counts?
- **Current tier support:** Build Snapshot — correct.
- **Evidence priority:** Low until further along.

## 14. Nutrition (`nutrition`)

- **Evidence available:** Category A only. Status "In Progress," no client.
- **Evidence missing:** Adherence data, user counts.
- **Questions for the owner:** Any beta users yet? Any adherence/engagement data collected internally?
- **Current tier support:** Build Snapshot — correct.
- **Evidence priority:** Low until further along.

## 15. Health Activity Dashboard (`health-dashboard`)

- **Evidence available:** Category A only, notably including an honest "Demo Mode" disclosure in the copy itself — the project data already avoids overclaiming ("informational only, not a medical claim").
- **Evidence missing:** No client, no real device-connected usage data (demo-mode fallback is the primary described experience).
- **Questions for the owner:** Is this in use by any real testers with connected health devices, or is it currently demo-only?
- **Current tier support:** Build Snapshot — correct, and the existing copy is a good model for honest category-C framing.
- **Evidence priority:** Low — no named client, demo-first framing already set expectations correctly.

---

## Summary: recommended evidence-gathering priority

1. **MediConsult (`doctor-ai`)** and **Saloon Management System (`saloon`)** — named clients, richest evidence, most-cited on service pages. Follow up first.
2. **Legal Assistant (`lawyer-ai`)**, **Kanaka Gold Loan**, **MERIDIAN** — real/plausible businesses behind them, live deployments, worth a direct ask even without an on-file contact.
3. **DesignT** — if Bizzzup owns it directly, usage data may not require external sign-off at all.
4. Everything else (Neura, FlightDeck, OptimaFlow, Void Runner, MediScribe, Apex, Nutrition, Health Activity Dashboard) — lower priority; either in-progress, no client on file, or explicitly a demo/portfolio piece.

No claims were strengthened or evidence fields populated as part of this branch — this document is the input for that follow-up work, not a replacement for it.
