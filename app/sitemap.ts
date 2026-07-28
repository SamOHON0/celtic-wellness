import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/woo";
import { posts } from "@/lib/posts";

const SITE_URL = "https://celticwellness.ie";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...categories.map((c) => ({
      url: `${SITE_URL}/product-category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/product/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
