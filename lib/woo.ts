import { WOO_URL } from "./config";
import type { Product, Category } from "./types";
import fallback from "@/data/catalog.json";

/**
 * Data layer for the WooCommerce Store API (public, no keys needed).
 * Fetches live data with ISR; falls back to a bundled snapshot when the
 * API is unreachable (offline dev, CI builds).
 */

const REVALIDATE = 300;

type StoreApiProduct = {
  id: number;
  name: string;
  slug: string;
  type: string;
  on_sale: boolean;
  sku: string;
  short_description: string;
  description: string;
  prices: { price: string; regular_price: string; sale_price: string };
  images: { src: string; thumbnail: string }[];
  categories: { name: string; slug: string }[];
  is_in_stock: boolean;
};

function decode(text: string): string {
  return text
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&#8220;|&#8221;/g, '"');
}

function stripHtml(html: string): string {
  return decode(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(p: StoreApiProduct): Product {
  return {
    id: p.id,
    name: decode(p.name),
    slug: p.slug,
    type: p.type,
    price: p.prices.price,
    regularPrice: p.prices.regular_price,
    salePrice: p.prices.sale_price,
    onSale: p.on_sale,
    sku: p.sku ?? "",
    shortDescription: stripHtml(p.short_description ?? ""),
    description: stripHtml(p.description ?? ""),
    images: (p.images ?? []).slice(0, 4).map((i) => ({
      src: i.src,
      thumbnail: i.thumbnail ?? i.src,
    })),
    categories: (p.categories ?? []).map((c) => ({
      name: c.name,
      slug: c.slug,
    })),
    inStock: p.is_in_stock,
  };
}

async function fetchLiveProducts(): Promise<Product[] | null> {
  try {
    const all: Product[] = [];
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `${WOO_URL}/wp-json/wc/store/v1/products?per_page=100&page=${page}`,
        { next: { revalidate: REVALIDATE } },
      );
      if (!res.ok) return null;
      const batch = (await res.json()) as StoreApiProduct[];
      all.push(...batch.map(normalize));
      if (batch.length < 100) break;
    }
    return all;
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  const live = await fetchLiveProducts();
  if (live && live.length > 0) return live;
  return fallback.products as Product[];
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${WOO_URL}/wp-json/wc/store/v1/products/categories?per_page=50`,
      { next: { revalidate: REVALIDATE } },
    );
    if (res.ok) {
      const raw = (await res.json()) as {
        name: string;
        slug: string;
        count: number;
        parent: number;
        id: number;
      }[];
      const byId = new Map(raw.map((c) => [c.id, c.slug]));
      return raw
        .filter((c) => c.slug !== "uncategorized" && c.count > 0)
        .map((c) => ({
          name: c.name,
          slug: c.slug,
          count: c.count,
          parent: c.parent ? byId.get(c.parent) : undefined,
        }));
    }
  } catch {
    // fall through to snapshot
  }
  return fallback.categories as Category[];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.categories.some((c) => c.slug === slug));
}
