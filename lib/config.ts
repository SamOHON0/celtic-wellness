/**
 * The WordPress/WooCommerce origin. Cart and checkout hand off here.
 *
 * Today this is the live site. When the Next.js frontend takes over the apex
 * domain, move WordPress to a subdomain (e.g. wp.celticwellness.ie) and set
 * NEXT_PUBLIC_WOO_URL accordingly. Keeping both on the same registrable
 * domain means Woo session cookies survive the handoff.
 */
export const WOO_URL =
  process.env.NEXT_PUBLIC_WOO_URL ?? "https://celticwellness.ie";

export const SITE_NAME = "Celtic Wellness";
export const FREE_DELIVERY_THRESHOLD = 50;
