import { WOO_URL } from "./config";
import type { Product, Category, Variation } from "./types";
import { COPY_OVERRIDES } from "./copy-overrides";
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
  attributes?: {
    name: string;
    has_variations: boolean;
    terms: { name: string; slug: string }[];
  }[];
  variations?: {
    id: number;
    attributes: { name: string; value: string }[];
  }[];
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
    attributes: (p.attributes ?? [])
      .filter((a) => a.has_variations)
      .map((a) => ({
        name: a.name,
        terms: (a.terms ?? []).map((t) => ({ name: t.name, slug: t.slug })),
      })),
    variationRefs: (p.variations ?? []).map((v) => ({
      id: v.id,
      attributes: (v.attributes ?? []).map((a) => ({
        name: a.name,
        value: a.value,
      })),
    })),
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

/** Frontend copy overrides win over whatever WordPress currently holds. */
function applyCopyOverride(p: Product): Product {
  const override = COPY_OVERRIDES[p.id];
  if (!override) return p;
  return {
    ...p,
    shortDescription: override.shortDescription,
    description: override.description,
  };
}

export async function getProducts(): Promise<Product[]> {
  const live = await fetchLiveProducts();
  const products =
    live && live.length > 0 ? live : (fallback.products as Product[]);
  return products.map(applyCopyOverride);
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

const MAX_VARIATIONS = 25;

/**
 * Resolves a variable product's variations (price, stock, image) by fetching
 * each variation the parent lists. Returns null when live data is unavailable
 * so callers can fall back to linking the Woo-hosted product page.
 */
export async function getVariations(
  product: Product,
): Promise<Variation[] | null> {
  const refs = (product.variationRefs ?? []).slice(0, MAX_VARIATIONS);
  if (refs.length === 0) return null;
  try {
    const results = await Promise.all(
      refs.map(async (ref) => {
        const res = await fetch(
          `${WOO_URL}/wp-json/wc/store/v1/products/${ref.id}`,
          { next: { revalidate: REVALIDATE } },
        );
        if (!res.ok) return null;
        const raw = (await res.json()) as StoreApiProduct;
        const image = (raw.images ?? [])[0];
        const variation: Variation = {
          id: ref.id,
          attributes: ref.attributes,
          price: raw.prices.price,
          regularPrice: raw.prices.regular_price,
          salePrice: raw.prices.sale_price,
          onSale: raw.on_sale,
          inStock: raw.is_in_stock,
          image: image
            ? { src: image.src, thumbnail: image.thumbnail ?? image.src }
            : undefined,
        };
        return variation;
      }),
    );
    const variations = results.filter((v): v is Variation => v !== null);
    return variations.length > 0 ? variations : null;
  } catch {
    return null;
  }
}
