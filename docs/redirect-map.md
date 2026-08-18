# Redirect map: celticwellness.ie cutover

Inventory of every URL in the live WordPress sitemaps (crawled 17 Aug 2026,
Yoast `wp-sitemap.xml` index) and where each lands once the apex points at the
Next.js storefront. Redirect rules live in `next.config.ts`.

Legend: SAME = same path served natively by the new site, no redirect needed.

## Products (product-sitemap.xml, 56 URLs)

All 56 live product URLs use `/product/<slug>/`. The new site mirrors this
structure exactly and builds its pages from the same Woo data, so every
product URL is SAME. No redirects required.

Spot-checked against the Store API catalog: slugs match because they are the
same records.

## Product categories (product_cat-sitemap.xml, 10 URLs)

| Live URL | Action |
|---|---|
| /product-category/uncategorized/ | 301 to /shop (in next.config.ts) |
| /product-category/dietary-supplements/ | SAME (catch-all route) |
| /product-category/ice-tubs/ | SAME |
| /product-category/infrared-saunas/ | SAME |
| /product-category/ripple-zero-nicotine-diffusers/ | SAME |
| /product-category/wellness-supplements/sea-moss-supplements/ | SAME (nested catch-all) |
| /product-category/wellness-supplements/shilajit/ | SAME (nested catch-all) |
| /product-category/water-bottles/ | SAME |
| /product-category/water-treatment/ | SAME |
| /product-category/wellness-supplements/ | SAME |

At go-live: click each category once. Any that come back empty (the new site
hides zero-count categories, so an empty one 404s) should get a 301 to /shop
added in next.config.ts. Candidates to check: water-bottles, infrared-saunas,
ripple-zero-nicotine-diffusers.

## Blog posts (post-sitemap.xml, 3 URLs)

| Live URL | Action |
|---|---|
| /blog/what-is-shilajit/ | 301 to /blog/shilajit-ireland-complete-guide (in next.config.ts) |
| /blog/shilajit-benefits-for-men/ | 301 to /blog/shilajit-ireland-complete-guide (in next.config.ts) |
| /blog/shilajit-benefits-for-women/ | 301 to /blog/shilajit-ireland-complete-guide (in next.config.ts) |

The three old posts do not exist on the new blog. All three are shilajit
topics, so they consolidate into the new complete guide. /blog itself is SAME.

## Pages (page-sitemap.xml, 17 URLs)

| Live URL | Action |
|---|---|
| / | SAME |
| /shop/ | SAME |
| /blog/ | SAME |
| /about/ | SAME |
| /cart/ | 302 to WP subdomain (env-guarded rule in next.config.ts) |
| /checkout/ | 302 to WP subdomain |
| /my-account/ | 302 to WP subdomain |
| /order-tracking/ | 302 to WP subdomain |
| /orders-tracking/ | 302 to WP subdomain |
| /contact/ | 302 to WP subdomain, until built natively |
| /wholesale/ | 302 to WP subdomain, until built natively |
| /delivery-information/ | 302 to WP subdomain, until built natively |
| /refund-returns/ | 302 to WP subdomain, until built natively |
| /terms/ | 302 to WP subdomain, until built natively |
| /privacy/ | 302 to WP subdomain, until built natively |
| /cookies/ | 302 to WP subdomain, until built natively |
| /discount-codes/ | 302 to WP subdomain, until built natively |

These fire only when `NEXT_PUBLIC_WOO_URL` is set (cutover config), so a
deploy with default config can never redirect the apex to itself. They are
302s deliberately: the info pages should eventually be rebuilt natively on
the new site, at which point each rule is deleted.

Note: /terms, /privacy, /refund-returns and /delivery-information are legally
load-bearing for an ecommerce site. Keep them reachable at all times.

## Other (not migrating)

- /elementor-hf-sitemap.xml, /author-sitemap.xml: theme and author archives,
  no equivalent needed. WordPress-side robots/noindex handles them after the
  move to the subdomain.
- Old WP assets under /wp-content/uploads/ keep working because product images
  are still served from the WordPress origin.

## WordPress-side redirects (after WP moves to wp.celticwellness.ie)

The reverse direction, configured in WordPress (plugin or .htaccess) on
switchover day: every front-of-house URL on wp.celticwellness.ie except
/cart, /checkout, /my-account, /order-tracking, /wp-admin, /wp-json and
/wp-content should 301 to the same path on celticwellness.ie, so nobody
browses the old Elementor theme and search engines transfer authority to the
apex. Details in docs/go-live-runbook.md.
