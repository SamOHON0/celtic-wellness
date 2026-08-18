/**
 * Refreshes data/catalog.json, the offline fallback snapshot the storefront
 * uses when the Woo Store API is unreachable.
 *
 * Run from the project root:
 *   node scripts/refresh-catalog.mjs
 *
 * Mirrors the normalization in lib/woo.ts (copy overrides are applied at
 * runtime, not baked into the snapshot).
 */

import { writeFile } from "node:fs/promises";

const WOO_URL = process.env.NEXT_PUBLIC_WOO_URL ?? "https://celticwellness.ie";

function decode(text) {
  return text
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "’")
    .replace(/&amp;/g, "&")
    .replace(/&#8220;|&#8221;/g, '"');
}

function stripHtml(html) {
  return decode(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(p) {
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

async function main() {
  const products = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `${WOO_URL}/wp-json/wc/store/v1/products?per_page=100&page=${page}`,
    );
    if (!res.ok) throw new Error(`Products fetch failed: HTTP ${res.status}`);
    const batch = await res.json();
    products.push(...batch.map(normalize));
    if (batch.length < 100) break;
  }

  const catRes = await fetch(
    `${WOO_URL}/wp-json/wc/store/v1/products/categories?per_page=50`,
  );
  if (!catRes.ok) throw new Error(`Categories fetch failed: HTTP ${catRes.status}`);
  const rawCats = await catRes.json();
  const byId = new Map(rawCats.map((c) => [c.id, c.slug]));
  const categories = rawCats
    .filter((c) => c.slug !== "uncategorized" && c.count > 0)
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      count: c.count,
      parent: c.parent ? byId.get(c.parent) : undefined,
    }));

  await writeFile(
    new URL("../data/catalog.json", import.meta.url),
    JSON.stringify({ products, categories }, null, 2) + "\n",
  );
  console.log(
    `Snapshot written: ${products.length} products, ${categories.length} categories.`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
