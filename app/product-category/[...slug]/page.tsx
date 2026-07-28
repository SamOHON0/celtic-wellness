import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductsByCategory, getCategories } from "@/lib/woo";
import { ProductCard } from "@/components/product-card";
import { CategoryPills } from "@/components/category-pills";

export const revalidate = 300;

type Props = {
  // Catch-all mirrors WordPress URLs, including nested paths like
  // /product-category/wellness-supplements/shilajit
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leaf = slug[slug.length - 1];
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === leaf);
  return {
    title: category ? category.name : "Category",
    description: category
      ? `Shop ${category.name} at Celtic Wellness with fast tracked delivery across Ireland.`
      : undefined,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const leaf = slug[slug.length - 1];
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(leaf),
  ]);
  const category = categories.find((c) => c.slug === leaf);
  if (!category) notFound();

  const topLevel = categories.filter((c) => !c.parent);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {category.name}
      </h1>
      <p className="mt-2 text-ink-soft">
        {products.length} {products.length === 1 ? "product" : "products"}
      </p>

      <CategoryPills categories={topLevel} activeSlug={category.slug} />

      {products.length === 0 ? (
        <p className="mt-16 text-ink-soft">
          Nothing in this category right now. Check back soon.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
