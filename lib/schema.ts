import type { Product } from "./types";
import { SITE_NAME } from "./config";

const SITE_URL = "https://celticwellness.ie";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "Celtic Wellness LTD",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sligo",
      addressCountry: "IE",
    },
    sameAs: [
      "https://www.instagram.com/celticwellness.ireland/",
      "https://www.tiktok.com/@celticwellnessirl",
      "https://www.facebook.com/p/Celtic-Wellness-61567784737725/",
    ],
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((i) => i.src),
    sku: product.sku || String(product.id),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "EUR",
      price: (Number(product.price) / 100).toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IE",
        },
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.webp` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
