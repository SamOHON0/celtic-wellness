import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const category = product.categories.find(
    (c) => c.slug !== "wellness-supplements",
  ) ?? product.categories[0];

  return (
    <div className="group flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-card bg-bone-100"
      >
        {image ? (
          <Image
            src={image.src}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-soft">
            Image coming soon
          </div>
        )}
        {product.onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-accent px-3 py-1 text-xs font-semibold text-ink">
            Sale
          </span>
        )}
        {!product.inStock && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-bone-50">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        {category && (
          <p className="text-xs text-ink-soft">{category.name}</p>
        )}
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 line-clamp-2 font-medium leading-snug transition-colors hover:text-pine-700"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center justify-between gap-3 pt-1">
          <p className="font-semibold text-pine-800">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </div>
  );
}
