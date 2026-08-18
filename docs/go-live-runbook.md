# Go-live runbook: celticwellness.ie

Switchover from WordPress-on-apex to Next.js-on-apex with WordPress on a
subdomain. Written so cutover day is execution, not decisions. Total apex
downtime if followed in order: none (DNS propagation is the only wait).

## Blocked until we have access

Everything in phases 1 to 4 needs credentials we do not have yet:

1. WordPress admin (celticwellness.ie/wp-admin)
2. Hosting control panel (find out host: check DNS/whois when we get access,
   likely where the subdomain and any server-side redirects get configured)
3. Domain registrar / DNS management
4. Payment gateway dashboards (Stripe and/or PayPal, whatever is live in Woo)

Phase 0 can happen any time.

## Phase 0: prep (no access needed, do now)

- [x] Variation selection built into the storefront (variation-picker.tsx)
- [x] Redirect rules written (next.config.ts + docs/redirect-map.md)
- [ ] Run `node scripts/test-checkout-replay.mjs` from a machine with normal
      internet to confirm cart replay works against the live site, including
      the variation ID case. One open question this answers: whether Woo
      accepts `?add-to-cart=<variation_id>` on this install (standard Woo
      does; verify before cutover day).
- [ ] Run `node scripts/refresh-catalog.mjs` so the offline fallback snapshot
      is current.
- [ ] Deploy latest to Vercel preview (celtic-wellness.vercel.app) and click
      through: variable product PDPs, search, cart, checkout handoff.

## Phase 1: WordPress to subdomain (needs hosting + WP admin)

1. In hosting panel, add subdomain wp.celticwellness.ie pointing at the same
   WordPress install (or add it as an alias/vhost).
2. Issue/confirm TLS cert for wp.celticwellness.ie.
3. In WP admin, Settings > General: set WordPress Address and Site Address to
   https://wp.celticwellness.ie. (Do this last in this phase; it logs you out.)
4. Search-replace celticwellness.ie -> wp.celticwellness.ie in the DB for
   internal links (WP-CLI `wp search-replace` or Better Search Replace
   plugin). Product image URLs change with it; that is fine, the storefront
   reads image URLs live from the API.
5. Re-save permalinks (Settings > Permalinks > Save) to flush rewrite rules.
6. Verify: wp.celticwellness.ie/wp-admin loads, Store API responds at
   wp.celticwellness.ie/wp-json/wc/store/v1/products, checkout page renders.

At this point the OLD site is still serving the apex from the same install.
WordPress multisite-style domain juggling can be fiddly; if the host supports
it, a lower-risk alternative is: leave WP answering on both hostnames until
DNS flips, then finalize the URL settings.

## Phase 2: payment gateways (needs gateway dashboards)

1. Stripe: add wp.celticwellness.ie to allowed domains (Apple Pay / Google
   Pay domain verification if enabled), check webhook endpoint URLs still
   resolve (they will if they use the site URL; update to the subdomain).
2. PayPal (if live): update return URLs / webhook URLs to the subdomain.
3. Any other gateway or service pinned to the domain (Klarna, Revolut Pay):
   same treatment.
4. Woo emails: send a test order email, confirm links in it point at the
   subdomain (they follow the Site Address set in phase 1).

## Phase 3: point the apex at Vercel (needs DNS)

1. In Vercel project settings, add celticwellness.ie as the production
   domain. Set env var NEXT_PUBLIC_WOO_URL=https://wp.celticwellness.ie and
   redeploy. This one env var flips the checkout handoff, account links, and
   activates the WP-page redirects in next.config.ts.
2. In DNS: apex A record to 76.76.21.21 (Vercel), or ALIAS/ANAME to
   cname.vercel-dns.com per Vercel's instructions. www CNAME to
   cname.vercel-dns.com.
3. Keep the old apex records noted somewhere before changing them (instant
   rollback = restore old records).
4. Wait for propagation, verify celticwellness.ie serves the Next.js site
   with a valid cert.

## Phase 4: WordPress-side redirects (needs WP admin or hosting)

Once the apex serves the new site, stop the old theme being browsable:

1. On wp.celticwellness.ie, 301 every front-of-house path to the apex EXCEPT:
   /cart, /checkout, /order-received, /my-account, /order-tracking,
   /wp-admin, /wp-login.php, /wp-json, /wp-content, /wp-includes.
   Redirection plugin or .htaccess, whichever the host makes easy.
2. Set wp.celticwellness.ie pages to noindex where they remain reachable
   (checkout, account). Yoast: Site Basics > discourage indexing is too
   blunt; use per-page noindex or X-Robots-Tag on the subdomain instead,
   because /wp-json must stay functional.

## Phase 5: verify (cutover day, in order)

- [ ] Place a REAL test order end to end on celticwellness.ie: browse, add a
      simple product AND a variation to cart, checkout, pay (then refund it).
- [ ] Order confirmation email arrives, links work.
- [ ] Stock decremented in Woo admin.
- [ ] My Account login works via header link.
- [ ] Spot-check every row of docs/redirect-map.md, including the three old
      blog URLs and the policy pages.
- [ ] Empty-category check from the redirect map (water-bottles,
      infrared-saunas, ripple-zero-nicotine-diffusers).
- [ ] robots.txt and sitemap.xml on the apex are the Next.js ones; submit the
      new sitemap in Search Console.
- [ ] Search Console: verify the property still resolves; watch coverage for
      a week for 404 spikes.
- [ ] PageSpeed run on the live apex for the before/after we promised Patrick.

## Rollback

Any failure in phase 5 that cannot be fixed forward within the hour: restore
the old apex DNS records (from phase 3 step 3). WordPress still holds all
orders, stock and checkout; nothing in this migration deletes or alters
commerce data. The only state to unwind is DNS plus, if phase 1 finalized
URLs, setting Site Address back to the apex.

## After go-live (backlog)

- Rebuild the info pages natively (contact, delivery, returns, terms,
  privacy, wholesale) and delete the corresponding 302 rules.
- My Account natively (currently links to Woo-hosted).
- Delete lib/copy-overrides.ts entries once the rewritten copy is pasted into
  Woo admin (docs/product-copy-rewrites.md).
- Consider moving product images to Vercel/next-image optimization fully
  (currently hotlinked from the WP origin, which is fine).
