# GEO and conversion measurement

Internal document. Not published on the website.

## 1. Analytics provider status

**No analytics provider is currently installed in this repository.** Checked
`package.json` and every source file for gtag/Google Analytics, PostHog,
Mixpanel, Segment, Plausible, Umami, Amplitude, and `@vercel/analytics` — none
present.

Per instructions, **no analytics vendor was installed as part of this
branch.** Below is (a) what installing one would require, and (b) a
vendor-neutral event specification so that whichever provider gets approved
later, the event names and payloads are already defined and consistent.

### What installing an analytics provider would require

- **Decision needed from the owner:** which provider (e.g. GA4, Plausible,
  PostHog) — each has different privacy/cost/self-hosting tradeoffs worth a
  deliberate choice, not a default.
- A `<Script>` or provider SDK added to `src/app/layout.tsx` (the one place
  that already renders on every route).
- An environment variable for the tracking ID (e.g. `NEXT_PUBLIC_GA_ID`),
  following the existing lazy/optional-env-var pattern already used for
  `GOOGLE_API_KEY`/`RESEND_API_KEY` so local dev and CI builds don't require
  it.
- A cookie-consent decision if the chosen provider sets tracking cookies —
  relevant given `privacy-policy/page.tsx` already describes "essential
  cookies... for basic functionality" but doesn't yet cover third-party
  analytics cookies.
- Update to `privacy-policy/page.tsx`'s "Cookies and local storage" section
  to disclose the specific provider, once chosen.

## 2. Vendor-neutral event specification

Event names and payload shapes below are provider-agnostic — implement them
as whatever the chosen provider's SDK calls them (`gtag('event', ...)`,
`posthog.capture(...)`, etc.) once one is approved and installed. **Do not
fire any of these yet — this is a specification, not a live integration.**

Rules for implementation, whenever it happens:
- No duplicate firing — each user action fires its event exactly once (e.g. debounce/guard against React re-renders or effect re-runs).
- Never record form message contents, email addresses, phone numbers, or any other PII in event payloads — only structural/contextual metadata.
- Every event name is prefixed to make provider dashboards filterable.

| Event name | Fires when | Suggested payload (no PII) |
|---|---|---|
| `contact_form_submitted` | `Contact.tsx` form successfully posts to `/api/contact` and receives a non-error response | `{ help_type, stage, budget_range }` — the categorical dropdown selections already collected by the form, not free-text fields |
| `calendly_click` | A user clicks a Calendly/scheduling link, if one is added to the site (none found in the current codebase — spec is forward-looking) | `{ source_page }` |
| `email_click` | Any `mailto:hello@bizzzup.com` link is clicked (`Contact.tsx`, `Footer.tsx` if added there) | `{ source_page, link_location }` (e.g. "contact-section", "footer") |
| `phone_click` | The `tel:+919003020030` link is clicked (`Contact.tsx`) | `{ source_page }` |
| `homepage_service_click` | A `FeatureCards.tsx` capability card is clicked, navigating to `/services` or a `/services/[slug]` page | `{ card_title, destination_href }` |
| `service_page_cta_click` | The "Book an AI audit" CTA inside `ServicePageTemplate.tsx` is clicked | `{ service_slug }` |
| `case_study_cta_click` | The "Discuss a similar project" or "View full case study" links on `/work/[slug]` or the homepage carousel/modal are clicked | `{ project_slug, source }` (e.g. "carousel", "modal", "case-study-page") |
| `work_index_case_study_click` | A project card link is clicked from `/work` (`WorkExplorer.tsx`) | `{ project_slug, active_filter }` |

### Where each event would be wired in (for future implementation)

- `contact_form_submitted` → `src/components/sections/Contact.tsx`, in the success branch of the submit handler.
- `email_click` / `phone_click` → the existing `href="mailto:..."` / `href="tel:..."` anchors in `Contact.tsx`.
- `homepage_service_click` → the `Link` wrapping each card in `src/components/sections/FeatureCards.tsx` (added this branch).
- `service_page_cta_click` → the "Book an AI audit" `Link` in `src/components/services/ServicePageTemplate.tsx` (added this branch).
- `case_study_cta_click` → `src/components/ui/ProjectDetailModal.tsx`'s "View full case study" link, `src/components/sections/Projects.tsx`'s "View full case study" link, and `src/app/work/[slug]/page.tsx`'s "Discuss a similar project" link.
- `work_index_case_study_click` → `src/components/work/WorkExplorer.tsx`'s project card links.

## 3. Weekly AI-visibility prompt tracking

A manual tracking framework — run these prompts against each AI platform on a
regular cadence (weekly is a reasonable starting cadence; adjust once you see
how often results actually change) and log the results in a spreadsheet or
table using these fields.

### Fields

| Field | What to record |
|---|---|
| Test date | The date the prompt was actually run |
| Platform | ChatGPT / Perplexity / Gemini / Copilot / etc. |
| Exact prompt | The literal text sent — no paraphrasing, so results are reproducible |
| Bizzzup mentioned | Yes/No — was Bizzzup AI Labs named anywhere in the answer |
| Bizzzup page cited | Yes/No — did the answer link to or cite a specific page, vs. just naming the company with no source |
| Exact URL cited | The literal URL, if one was cited |
| Position in the answer | e.g. "first result," "third of five," "only mention," "footnote/citation only" |
| Description accurate | Yes/No/Partial — does the AI's description of what Bizzzup does match reality |
| Competitors mentioned | List any other companies named in the same answer |
| Referral visit observed | Yes/No — cross-check against analytics referral data (once an analytics provider exists) for a visit matching that platform's referrer pattern, within a reasonable window after the test |
| Lead generated | Yes/No — did a contact-form submission or inbound email reference finding Bizzzup via AI search, within a reasonable window |
| Notes | Anything else — answer tone, whether the citation is stale, whether competitors are more prominently placed, etc. |

### Starting prompt set

Run each of these on every tracked platform, every cycle:

1. "AI agent development company in Chennai"
2. "AI agent development company in India"
3. "Voice AI development company for healthcare"
4. "RAG development company for internal knowledge search"
5. "AI MVP development agency"
6. "Workflow automation company for multi-location operations"
7. "Custom business software company in Chennai"
8. "Tamil-English subtitle AI development"
9. "Healthcare voice assistant development"
10. "AI product engineering studio in India"

### Interpreting results — cautions

- **A single test of a single prompt on a single platform proves nothing.**
  AI answer engines are non-deterministic and change their retrieval index
  over time; one favorable or unfavorable result is noise, not signal.
- Track trend across multiple weeks before concluding anything changed
  because of a specific site fix.
- "Bizzzup mentioned" without "page cited" is weaker evidence than a real
  citation — a mention with no source may just be model training-data
  recall, not live retrieval from the site.
- Referral-visit and lead-generation correlation requires an analytics
  provider (see §1) to be meaningful — until then, those two fields will
  stay unfillable, which is itself useful information (it shows what's
  blocked on the analytics decision).
