# Celtic Wellness Storefront

Headless Next.js frontend for celticwellness.ie, using the existing WooCommerce
site as the backend via the public Store API. Option A architecture: Next.js
owns everything customers browse; cart contents replay into the Woo session and
checkout hands off to WooCommerce, so payments, VAT, shipping and order emails
stay untouched.

## Stack

- Next.js 15 (App Router, React 19, TypeScript)
- Tailwind CSS v4
- WooCommerce Store API (public, no keys required)
- Phosphor icons, Outfit variable font (self-hosted via Fontsource)

## Run it

```bash
npm install
npm run dev
```

Product data is fetched live from `https://celticwellness.ie/wp-json/wc/store/v1/`
with 5-minute ISR. If the API is unreachable (offline dev, CI), it falls back to
the snapshot in `data/catalog.json` (49 of ~56 products; a handful of large
water-treatment/diffuser items are only in the live API).

## How checkout works

1. Cart lives client-side (localStorage) for a fast, no-reload experience.
2. On "Checkout", each line item is replayed into the WooCommerce session via
   `?add-to-cart=ID&quantity=N` requests, then the shopper is redirected to the
   Woo checkout page.
3. This is fully reliable once WordPress and the Next.js frontend share a
   registrable domain (see migration below), because the Woo session cookie is
   then same-site. Cross-origin (today's dev setup) it depends on browser
   third-party-cookie policy, so test the handoff on the real domains.

Variable products (Ripple diffusers, Stella systems) link to the Woo product
page for option selection until variations are built into this frontend.

## Config

- `NEXT_PUBLIC_WOO_URL` - the WordPress origin. Defaults to
  `https://celticwellness.ie`. After migration set it to the WP subdomain.

## Go-live migration plan

1. Deploy this repo to Vercel, verify against the live API.
2. Move WordPress to a subdomain, e.g. `wp.celticwellness.ie` (keep it
   noindexed except cart/checkout/account paths, or canonical to the apex).
3. Point the apex `celticwellness.ie` at Vercel, set
   `NEXT_PUBLIC_WOO_URL=https://wp.celticwellness.ie`.
4. In WooCommerce set the cookie domain to `.celticwellness.ie` if needed so
   the session survives the handoff.
5. URL structure (`/product/...`, `/product-category/...`, `/shop`, `/about`)
   mirrors WordPress, so existing rankings carry over. Add 301s for anything
   not rebuilt (blog, wholesale, contact currently link back to WP pages).

## Not built yet (deliberate scope cuts)

- Variation selection on PDPs for variable products
- My Account (links can point at the WP subdomain)
- Blog (WP pages still serve it)
- Search
