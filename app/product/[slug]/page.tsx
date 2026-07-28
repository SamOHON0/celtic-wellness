import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, ShieldCheck, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getProduct, getProductsByCategory } from "@/lib/woo";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { JsonLd } from "@/components/json-ld";
import { productSchema, breadcrumbSchema } from "@/lib/schema";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.shortDescription.slice(0, 160),
    openGraph: { images: product.images[0] ? [product.images[0].src] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const primaryCategory = product.categories[0];
  const related = primaryCategory
    ? (await getProductsByCategory(primaryCategory.slug))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    ...(primaryCategory
      ? [
          {
            name: primaryCategory.name,
            path: `/product-category/${primaryCategory.slug}`,
          },
        ]
      : []),
    { name: product.name, path: `/product/${product.slug}` },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd data={productSchema(product)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Link
        href="/shop"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-pine-700"
      >
        <ArrowLeft size={16} /> Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div>
          {primaryCategory && (
            <Link
              href={`/product-category/${primaryCategory.slug}`}
              className="text-sm font-medium text-pine-600 hover:underline"
            >
              {primaryCategory.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-2xl font-semibold text-pine-800">
              {formatPrice(product.price)}
            </p>
            {product.onSale && (
              <p className="text-lg text-ink-soft line-through">
                {formatPrice(product.regularPrice)}
              </p>
            )}
          </div>

          {product.shortDescription && (
            <p className="mt-5 leading-relaxed text-ink-soft">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-8 max-w-sm">
            <AddToCartButton product={product} />
          </div>

          <div className="mt-8 space-y-3 border-t border-bone-200 pt-6 text-sm text-ink-soft">
            <p className="flex items-center gap-2.5">
              <Truck size={18} className="text-pine-600" />
              Free delivery over €50, tracked to your door in 2 to 3 days
            </p>
            <p className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-pine-600" />
              Secure checkout and easy returns
            </p>
          </div>

          {product.description &&
            product.description !== product.shortDescription && (
              <div className="mt-8 border-t border-bone-200 pt-6">
                <h2 className="font-semibold">About this product</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
                  {product.description}
                </p>
              </div>
            )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight">
            You might also like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
