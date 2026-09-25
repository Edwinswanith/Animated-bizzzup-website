# Post-deployment verification checklist

Internal document. Not published on the website. Run through this **after**
this branch is deployed to production — none of it can be completed from the
repository alone; all of it requires external account access.

## Google Search Console

- [ ] Verify the correct property is being used — confirm it's `https://ai.bizzzup.com`, not `https://bizzzup.com` (the two are different origins per the prior technical-discoverability fix; make sure GSC is watching the right one).
- [ ] Submit `sitemap.xml` (now 27 URLs: 7 static + 15 project case studies + 6 service pages, verify this count matches what's live once deployed — see this branch's final regression test output for the authoritative count).
- [ ] Inspect the homepage (`/`).
- [ ] Inspect `/services`.
- [ ] Inspect each of the 6 service pages individually (`/services/ai-agent-development`, `/services/voice-ai-development`, `/services/rag-development`, `/services/ai-mvp-development`, `/services/workflow-automation`, `/services/custom-business-software`).
- [ ] Inspect `/work`.
- [ ] Inspect the strongest case studies first: `/work/doctor-ai` and `/work/saloon` (highest-evidence projects per `docs/case-study-evidence-needed.md`), then `/work/lawyer-ai` and `/work/meridian`.
- [ ] Compare user-declared canonical (what this codebase sets via `<link rel="canonical">`) against Google-selected canonical (shown in URL Inspection) for at least the homepage, `/work`, and `/services` — flag any mismatch immediately, since a Google-selected canonical different from ours means Google disagrees with our canonicalization signal.
- [ ] Confirm pages are indexed — re-check a week after submission, not immediately (indexing isn't instant).
- [ ] Review the **Page Indexing** report for any "Discovered — not indexed," "Crawled — not indexed," or "Excluded" statuses on the new service pages.
- [ ] Review **Crawl Stats** for any spike in errors or drop in crawl requests after this deploy.
- [ ] Review **Manual Actions** — confirm none exist (should be empty, but always verify after a structural change).
- [ ] Review **Security Issues** — confirm none exist.

## Bing Webmaster Tools

- [ ] Verify the site (if not already verified).
- [ ] Submit `sitemap.xml`.
- [ ] Inspect the 6 new service page URLs and the highest-priority case-study URLs individually.
- [ ] Review crawl errors.
- [ ] Review indexing status for the new routes.
- [ ] Configure **IndexNow** only if the owner explicitly approves instant-push indexing — do not enable by default, since it changes how aggressively the site pushes updates to Bing/other IndexNow-participating engines.

## Cloud Run and server logs

- [ ] Check for requests from major crawlers (Googlebot, Bingbot, `GPTBot`, `OAI-SearchBot`, `PerplexityBot`) in Cloud Run request logs — confirm they're actually visiting the new `/services/*` routes, not just the previously-known routes.
- [ ] Investigate any `403`, `429`, `5xx`, timeout, or bot-challenge responses served to those crawler user-agents specifically — a 429 to a legitimate search/AI crawler is a lost-indexing opportunity, not just a rate-limit success.
- [ ] Confirm public HTML, JavaScript, CSS, and images remain accessible (no accidental new auth wall, no new `Disallow` in `robots.txt` beyond the intentional `GPTBot` training block already in place).
- [ ] Confirm no security rule (Cloud Armor, middleware, WAF) depends only on a spoofable `User-Agent` string — user-agent checks are a hint, not a security control, and if one exists it should not be the sole gate for anything.

## AI visibility

- [ ] Run the full prompt set from `docs/geo-measurement.md` §3 on the same weekly cadence, tracking citations (not just mentions) using the fields defined there.
- [ ] Specifically re-check whether the `/work` fix (project links now present in raw HTML) has changed whether AI crawlers can discover individual case studies — compare crawler log hits on `/work/[slug]` routes before vs. after this deploy.
- [ ] Track referral traffic from AI platforms where available (requires the analytics decision in `docs/geo-measurement.md` §1 to be resolved first).
- [ ] Track qualified leads (contact form submissions, inbound email) that reference finding Bizzzup via an AI search tool — not just raw impression/mention counts, which don't indicate business value on their own.

## Explicitly cannot be completed from this repository

- Any actual Search Console / Bing Webmaster Tools verification, submission, or report review — requires live account access this session doesn't have.
- Any Cloud Run log review — requires live GCP Logs Explorer access to the deployed service, not the local repo.
- Confirming AI platforms have actually re-crawled and re-indexed the new pages — this is entirely dependent on external crawl scheduling, not something the repository or a local build can determine.
- Confirming whether `bizzzup.com` (the separate domain referenced throughout the earlier technical-discoverability work) is causing any duplicate-content or entity-confusion issue in practice — requires checking what that domain currently serves, which is outside this repository.
