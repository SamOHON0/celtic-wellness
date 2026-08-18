import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/woo";
import { ProductCard } from "@/components/product-card";
import { CategoryPills } from "@/components/category-pills";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Browse the full Celtic Wellness range: supplements, Shilajit, water treatment, recovery equipment and more.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  const topLevel = categories.filter((c) => !c.parent);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Shop all
      </h1>
      <p className="mt-2 text-ink-soft">
        {products.length} products, shipped tracked from Sligo.
      </p>

      <CategoryPills categories={topLevel} activeSlug={null} />

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
