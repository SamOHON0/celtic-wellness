import type { NextConfig } from "next";

const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL;

/**
 * Redirects for go-live SEO preservation. See docs/redirect-map.md for the
 * full inventory of live WordPress URLs and where each one lands.
 *
 * The WordPress-hosted pages (checkout, account, policies, contact...) only
 * redirect when NEXT_PUBLIC_WOO_URL is explicitly set. That env var is part of
 * the cutover checklist (pointing at wp.celticwellness.ie); guarding on it
 * means a misconfigured deploy can never redirect celticwellness.ie/checkout
 * to itself in a loop.
 */
const WP_PAGES = [
  "/cart",
  "/checkout",
  "/my-account",
  "/order-tracking",
  "/orders-tracking",
  "/contact",
  "/wholesale",
  "/delivery-information",
  "/refund-returns",
  "/terms",
  "/privacy",
  "/cookies",
  "/discount-codes",
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "celticwellness.ie" },
      { protocol: "https", hostname: "*.celticwellness.ie" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    const rules = [
      // Old WordPress blog posts -> closest new guide (301s preserve link equity)
      {
        source: "/blog/what-is-shilajit",
        destination: "/blog/shilajit-ireland-complete-guide",
        permanent: true,
      },
      {
        source: "/blog/shilajit-benefits-for-men",
        destination: "/blog/shilajit-ireland-complete-guide",
        permanent: true,
      },
      {
        source: "/blog/shilajit-benefits-for-women",
        destination: "/blog/shilajit-ireland-complete-guide",
        permanent: true,
      },
      // Housekeeping
      {
        source: "/product-category/uncategorized",
        destination: "/shop",
        permanent: true,
      },
    ];

    if (WOO_URL) {
      for (const path of WP_PAGES) {
        rules.push({
          source: path,
          destination: `${WOO_URL}${path}/`,
          permanent: false,
        });
      }
    }

    return rules;
  },
};

export default nextConfig;
