# Entity consistency audit

Internal document. Not published on the website. Audits every visible
company fact across the repository as of the `fix/geo-content-authority`
branch, to catch inconsistencies before they confuse either users or AI
answer engines building an entity profile of Bizzzup AI Labs.

**No fact below was changed as part of this audit.** Where a conflict exists,
it's recorded, not resolved — resolving it requires owner confirmation of
which value is correct.

## Company name

| Value | Source file(s) | Consistent? |
|---|---|---|
| "Bizzzup AI Labs" | `src/app/layout.tsx` (SITE_NAME, JSON-LD), `src/lib/site.ts`, `src/data/chatContext.ts`, `src/data/services.ts`, footer copyright, page titles | Yes — used consistently as the full brand name everywhere checked. |
| "Bizzzup" (short form) | Social handles (`@bizzzup`), GitHub org references, casual copy ("Talk to Bizzzup") | Used only as a short reference in URLs/handles, not as a competing brand name. No conflict. |

No alternate/legacy brand name found anywhere in the codebase.

## Address

| Value | Source | Consistent? |
|---|---|---|
| "Chennai, India" (city/country only, no street address) | `layout.tsx` JSON-LD (`foundingLocation`, `PostalAddress`: locality "Chennai", region "Tamil Nadu", country "IN") | Yes, consistently just city/state/country — no street-level address is published anywhere, so there's nothing to conflict. |

**Owner verification needed:** confirm whether a full street address should ever be published (e.g. for a physical `LocalBusiness` Google Business Profile match) — currently `LocalBusiness` schema has no `streetAddress`, which is valid but limits local-pack SEO eligibility.

## Phone

| Value | Source | Consistent? |
|---|---|---|
| `+919003020030` (JSON-LD, tel: link) | `layout.tsx`, `Contact.tsx` `href="tel:+919003020030"` | Yes |
| `+91 9003 020 030` (display format) | `Contact.tsx` display text, `chatContext.ts` | Yes — same number, just formatted with spaces for display vs. compact for the `tel:` URI. Not a conflict. |

## Email

| Value | Source | Consistent? |
|---|---|---|
| `hello@bizzzup.com` | `layout.tsx` JSON-LD, `Contact.tsx`, `content-rights/page.tsx`, `privacy-policy/page.tsx`, `chatContext.ts`, `api/contact/route.ts` (`TO_EMAIL`) | Yes — single consistent primary contact address. |
| `contact@bizzzup.com` | `api/contact/route.ts` — used only as the `from:` address on outbound contact-form emails | Distinct purpose (sender address, not a public contact point), not a conflict with `hello@bizzzup.com`. |

## Founding statements

| Value | Source | Consistent? |
|---|---|---|
| "Founded by Suhail (Founder, Principal Design) and Edwin Swanith (Co-Founder, AI/ML)" | `chatContext.ts` | — |
| Team.tsx: Suhail — "Founder · Principal Design"; Edwin Swanith — "Co-Founder · AI/ML" | `Team.tsx`, `TeamPreview.tsx` | Matches `chatContext.ts` exactly. **Consistent.** |
| Footer copyright: "© 2024 – 2026 Bizzzup AI Labs" | `Footer.tsx` | This implies a founding year of 2024, but no page states "founded in 2024" explicitly — it's only implied by the copyright range start. **No explicit founding-year statement exists to conflict with, but this is the only place a year appears at all — worth confirming 2024 is correct before treating it as a citable founding year.** |

**Owner verification needed:** is 2024 the correct founding year? If yes, consider whether to state it explicitly in the Organization JSON-LD (`foundingDate`) for stronger entity clarity — currently absent.

## Team roles

| Person | Role stated | Source(s) | Consistent? |
|---|---|---|---|
| Suhail | Founder · Principal Design | `Team.tsx`, `TeamPreview.tsx`, `chatContext.ts` | Yes, identical across all three. |
| Edwin Swanith | Co-Founder · AI/ML | `Team.tsx`, `TeamPreview.tsx`, `chatContext.ts` | Yes, identical across all three. |
| Kishore | AI Engineer | `Team.tsx` only (not in `chatContext.ts`, not in `TeamPreview.tsx` — preview likely only shows founders) | Not a conflict — `TeamPreview` intentionally shows a subset; `chatContext.ts` only names the two founders by design (per its own comment scope). Confirm this is intentional, not an oversight. |
| Vikram | AI Engineer | `Team.tsx` only | Same note as Kishore. |

No JSON-LD `Person` entities exist for any team member — Organization JSON-LD only. This is consistent with the instruction not to add `Person` entities beyond what's visibly published with verification; adding them is a candidate for a future change once each person's public profile info is confirmed.

## Project count

| Value | Source | Consistent? |
|---|---|---|
| "15" (`selected builds`) | `work/page.tsx` `PROOF` array | Matches `PROJECTS.length` (15 entries in `src/data/projects.ts`) exactly. |
| "15" (`shipped projects`) | `ProofAndTrust.tsx` | Same value, same source of truth. **Consistent.** |

Both counts are hardcoded literals, not computed from `PROJECTS.length` — if a project is added or removed from `projects.ts`, these two numbers must be updated by hand or they will silently drift out of sync. **Flagging as a latent consistency risk**, not a current inconsistency.

## Production-project count

No sitewide stat currently claims a specific count of "production" projects. Underlying data: 1 project has `status: "Production"` (Saloon Management System), 1 has `status: "Launched"` (MERIDIAN), 2 have `status: "Production-ready MVP"` (Caption CC, MediConsult). Nothing to reconcile since no aggregate claim exists yet — flagging only so a future "X production systems shipped" stat is built from this real breakdown rather than invented.

## Average launch-time claim

| Value | Source | Consistent? |
|---|---|---|
| "45 days" (`average time to launch`) | `ProofAndTrust.tsx` | This is stated as an *average*, which implies it's derived from multiple measured project timelines. No `evidence.projectPeriod` data exists in `projects.ts` to support an actual computed average — "45 days" matches the *Core MVP engagement model's target duration* (`EngagementModels.tsx`, `FlagshipProcess.tsx`), not a measured historical average. |
| "45 days" duration on the Core MVP tier | `EngagementModels.tsx` | Consistent as an engagement-model target. |
| "live in 45 days" | Hero.tsx headline, `chatContext.ts`, `opengraph-image.tsx` | Consistent as the flagship offer's promised timeline. |

**This is the one genuine inconsistency-of-framing found in the audit**: "45 days" is accurate and consistent as the *fixed-scope engagement target*, but `ProofAndTrust.tsx` frames it as an *average* (a backward-looking, measured statistic) rather than a *target* (a forward-looking commitment). These are different claims. **Recommend the owner either (a) confirm 45 days is genuinely the measured average across delivered projects and can stay labeled "average," or (b) relabel it as "target launch time" or "delivery commitment" to match what's actually verifiable from the current data.** Not changed in this branch — flagging per the "do not change... without a verified source" instruction.

## Service categories

| Value | Source | Consistent? |
|---|---|---|
| "AI Agents & Automation," "AI Product MVPs," "Custom Business Software," "Voice & RAG Platforms" | `FeatureCards.tsx` (4 homepage cards) | These 4 map onto the 6 new `/services/[slug]` pages: the first 3 map 1:1 (`ai-agent-development`, `ai-mvp-development`, `custom-business-software`); "Voice & RAG Platforms" splits into 2 separate pages (`voice-ai-development`, `rag-development`) since they're distinct disciplines with distinct evidence bases. `workflow-automation` is the 6th category — present in `chatContext.ts`'s capability list but was not previously a standalone homepage card. All 6 are internally consistent with each other and with `chatContext.ts`'s "We build AI agents, voice systems, RAG platforms, workflow automation, custom business software" sentence — no category invented that wasn't already asserted somewhere in the repo. |

## Social profile URLs

| Platform | URL | Source(s) | Consistent? |
|---|---|---|---|
| LinkedIn | `https://www.linkedin.com/in/edwinswanith` (JSON-LD, no trailing slash) vs. `https://www.linkedin.com/in/edwinswanith/` (Footer.tsx, Team.tsx, with trailing slash) | `layout.tsx` JSON-LD vs. `Footer.tsx`/`Team.tsx` | **Trailing-slash mismatch** — functionally the same URL (LinkedIn normalizes it), but not byte-identical across sources. Low-impact, but worth a single fix to standardize on one form site-wide. Also worth flagging: this is a *personal* LinkedIn profile (Edwin's), used as the company's `sameAs` entity link — confirm that's intentional rather than a company LinkedIn Page being preferred for entity purposes. |
| X / Twitter | `https://x.com/bizzzup` | `layout.tsx` JSON-LD, `Footer.tsx` | Consistent, identical. |
| GitHub | `https://github.com/Edwinswanith` (JSON-LD) vs. `https://github.com/Edwinswanith?tab=repositories` (Footer.tsx, Team.tsx) | `layout.tsx` vs. `Footer.tsx`/`Team.tsx` | Same underlying profile, different query string. Not a real conflict, but JSON-LD `sameAs` values are conventionally the canonical bare URL — the `?tab=repositories` variant is fine for a human-facing link, less ideal for a `sameAs` machine reference (JSON-LD doesn't use the `?tab=` version anywhere, so this is actually already correct — noted here only for completeness). |

## Organization JSON-LD vs. visible content

Cross-checked `layout.tsx`'s `Organization`/`LocalBusiness`/`WebSite` graph against the facts above: name, email, phone, address (city/region/country), and social URLs all match their respective visible-page counterparts. No fabricated field (no `aggregateRating`, no `award`, no `numberOfEmployees`) — consistent with the instruction not to add unsupported structured data.

---

## Summary of items requiring owner verification

1. **"45 days average time to launch"** (`ProofAndTrust.tsx`) — confirm this is a measured average, or relabel as a target/commitment.
2. **Founding year (2024)** — only implied via copyright range; confirm before treating as citable, and consider adding `foundingDate` to JSON-LD if confirmed.
3. **LinkedIn URL trailing-slash mismatch** between JSON-LD and Footer/Team — cosmetic, safe to standardize once confirmed which form is preferred.
4. **Project/customer counts on Saloon Management System** ("7 branches," "600+ customers," "1,000+ transactions") — see `docs/case-study-evidence-needed.md` item 12 for the same finding from the evidence side; these numbers appear nowhere else so there's no cross-page inconsistency, but they currently have no stated as-of date.
5. **Physical street address** — not published; confirm whether it should be for local-SEO purposes.

No values were changed. This document is input for an owner decision, not a resolution.
