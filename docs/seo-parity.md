# SEO parity: keeping rankings through the migration

What the new site does to prevent an SEO dip at cutover, and the few things
that still need a human or access.

## Content parity (done, in code)

- Product descriptions render the ORIGINAL structure from Woo: spec tables
  (dimensions, weight, power), measurement lists, headings. Sanitized
  allowlist rendering in lib/sanitize.ts, styled via .product-prose. The old
  ChatGPT HTML artifacts are scrubbed by attribute-stripping.
- "Additional information" (non-variation attributes like colour options)
  renders as a table on PDPs, mirroring the old Woo tab.
- The 8 rewritten product descriptions (docs/product-copy-rewrites.md) render
  from lib/copy-overrides.ts and are intentionally DIFFERENT from the old
  site: the old copy had non-compliant claims. This is an improvement, not
  drift.
- All 56 product URLs, category URLs (including nested), /shop, /about and
  /blog match the old structure exactly. Old blog posts 301 to the new guide.
  Full inventory: docs/redirect-map.md.

## Technical signals (done, in code)

- Canonicals on products, categories (canonicalized to the old nested shape
  so flat/nested duplicates consolidate), shop and blog posts.
- Product, Breadcrumb, Article, FAQ, Organization structured data (lib/schema.ts).
- Sitemap at /sitemap.xml covering products, categories, blog and info pages;
  robots.txt allows everything that should be crawled.
- Old WP trailing-slash URLs 308 to the non-slash form automatically (one
  hop, fine for Google).
- Titles use "%s | Celtic Wellness" vs the old "%s - Celtic Wellness LTD".
  Cosmetic difference, not a ranking factor; brand consistency is preserved.

## Known gaps (acceptable or needs access)

1. **Yoast meta descriptions**: the old site has hand-written Yoast meta
   descriptions per product; the Store API does not expose them, so the new
   site generates descriptions from the product short description. Similar
   quality, slightly different text. If we want exact parity after getting WP
   admin, export Yoast meta and add an overrides map (same pattern as
   copy-overrides).
2. **Reviews**: old PDPs have a Reviews tab (all products currently at zero
   reviews, so nothing is lost today). If reviews accumulate before cutover,
   add Store API review fetch + Review schema.
3. **Wholesale, order tracking, cookie policy pages** stay on WP and redirect;
   they carry little to no search equity.

## Cutover-day protections (in docs/go-live-runbook.md)

- WP-side 301s from wp.celticwellness.ie to the apex for every front-of-house
  URL, so old-site links and Google's index transfer to the new pages.
- noindex on what remains reachable on the subdomain (checkout, account).
- Search Console (needs Patrick's Google account, see access list): verify
  property, submit the new sitemap immediately after DNS flip, watch Coverage
  for 404 spikes for 2 weeks.
- Empty-category check so no indexed category 404s (redirect-map.md).

## Why a dip is unlikely if the runbook is followed

Same URLs, same (or better) content, same structured data, faster pages
(PageSpeed 71 -> 100, CLS 0.846 -> 0), proper 301 coverage for everything
that moved. Google treats this as a redesign, not a migration, because URLs
do not change. The main dip risk is skipping the WP-side redirects or the
Search Console checks, both are runbook steps.
