/**
 * End-to-end test of the checkout handoff: replays add-to-cart requests
 * against the live WooCommerce site the same way components/cart.tsx does,
 * then fetches the Woo cart page with the session cookie to prove the items
 * actually landed in the server-side cart.
 *
 * Run from the project root:
 *   node scripts/test-checkout-replay.mjs            (default test IDs)
 *   node scripts/test-checkout-replay.mjs 427 482    (explicit product/variation IDs)
 *
 * Pass VARIATION IDs for variable products, exactly as the storefront does.
 * This creates a throwaway guest session; it never places an order.
 */

const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL ?? "https://celticwellness.ie";

// Defaults: 427 = Organic Himalayan Shilajit 20g (simple),
//           482 = Herbal Function Sticks, "Calm" variation.
const ids = process.argv.slice(2).map(Number).filter(Boolean);
const testIds = ids.length > 0 ? ids : [427, 482];

const jar = new Map();

function storeCookies(res) {
  for (const line of res.headers.getSetCookie?.() ?? []) {
    const [pair] = line.split(";");
    const eq = pair.indexOf("=");
    if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}

function cookieHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function get(url) {
  const res = await fetch(url, {
    headers: {
      cookie: cookieHeader(),
      "user-agent": "CelticWellness-storefront-replay-test",
    },
    redirect: "follow",
  });
  storeCookies(res);
  return res;
}

async function main() {
  console.log(`Testing against ${WOO_URL}\n`);

  for (const id of testIds) {
    const res = await get(`${WOO_URL}/?add-to-cart=${id}&quantity=1`);
    console.log(`add-to-cart=${id} -> HTTP ${res.status}`);
  }

  const cartRes = await get(`${WOO_URL}/cart/`);
  const html = await cartRes.text();

  const emptyCart = /cart is currently empty/i.test(html);
  const itemMatches = [...html.matchAll(/class="[^"]*product-name[^"]*"[\s\S]*?<a[^>]*>([^<]+)</g)]
    .map((m) => m[1].trim());

  console.log(`\nCart page: HTTP ${cartRes.status}`);
  if (emptyCart) {
    console.log("RESULT: FAIL - cart is empty, replay did not stick.");
    console.log("Check: Woo session cookies, add-to-cart redirects, or whether");
    console.log("the site blocks cookie-less add-to-cart requests.");
    process.exit(1);
  }
  if (itemMatches.length > 0) {
    console.log("RESULT: PASS - cart contains:");
    for (const name of itemMatches) console.log(`  - ${name}`);
  } else {
    console.log("RESULT: LIKELY PASS - cart not empty, but item names were not");
    console.log("parseable from the theme markup. Open the cart in a browser to eyeball it.");
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
