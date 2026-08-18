# Account area: how the real WooCommerce hookup works

The /account section ships in **preview mode**: any email and password signs
in and the dashboard shows sample orders, clearly labelled. This lets the UI
exist and be shown to Patrick before we have WordPress access. Flipping it to
real accounts is configuration, not code.

## Architecture

Browser -> Next.js route handlers (/api/account/*) -> WordPress/Woo REST.

- Session: signed HTTP-only cookie issued by our own API (lib/account/session.ts).
- Data: lib/account/provider.ts picks a backend at runtime:
  - demo (default): no WP dependency, sample data.
  - woo: real customers and orders, activates when the env vars below exist.
- Customer passwords only ever transit our own server-side handlers to
  WordPress; nothing is stored by the frontend.

## WP-side setup (needs admin access, ~15 minutes)

1. **Woo REST keys**: WP admin -> WooCommerce -> Settings -> Advanced ->
   REST API -> Add key, Read/Write. This gives the consumer key/secret used
   for customer lookup, registration and order history.
2. **Credential check for login**: install the "JWT Authentication for
   WP REST API" plugin (or equivalent) so the frontend can verify a
   customer's email + password server-side. Add the secret it needs to
   wp-config.php per its docs.
3. **HTTPS only**: both endpoints are credentialed; the WP origin must be
   https (it already is).

## Vercel env vars to flip it on

```
WOO_REST_CONSUMER_KEY=ck_xxx
WOO_REST_CONSUMER_SECRET=cs_xxx
WP_JWT_AUTH=1
ACCOUNT_SESSION_SECRET=<long random string>
```

Redeploy after setting them. The preview-mode banners disappear automatically
and /account runs against real data.

## Notes and limits

- Woo REST order lookup is by customer id, so guest orders (no account) do
  not appear in the dashboard. Same behaviour as Woo's own My Account.
- Password reset still points at WordPress for v1; add a native flow later
  via the JWT plugin's reset endpoints or a mailer.
- If the JWT plugin is a blocker, alternative: WordPress Application
  Passwords (core, no plugin) work for API auth but are wrong for customer
  login UX; the JWT plugin remains the recommended path.
- Once real mode is on, delete nothing: demo mode simply never triggers while
  the env vars exist.
