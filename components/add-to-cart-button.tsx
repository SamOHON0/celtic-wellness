"use client";

import { useCart } from "./cart";
import type { Product } from "@/lib/types";
import { WOO_URL } from "@/lib/config";

export function AddToCartButton({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md";
}) {
  const cart = useCart();

  const base =
    "rounded-full font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";
  const sizing =
    size === "sm"
      ? "px-4 py-2 text-xs"
      : "w-full px-6 py-3.5 text-sm";

  // Variable products need option selection, which lives on the Woo product
  // page until variations are built into this frontend.
  if (product.type === "variable") {
    return (
      <a
        href={`${WOO_URL}/product/${product.slug}/`}
        className={`${base} ${sizing} inline-block bg-pine-100 text-center text-pine-800 hover:bg-pine-200`}
      >
        Choose options
      </a>
    );
  }

  if (!product.inStock) {
    return (
      <button disabled className={`${base} ${sizing} bg-bone-200 text-ink-soft`}>
        Out of stock
      </button>
    );
  }

  return (
    <button
      onClick={() =>
        cart.addItem({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0]?.thumbnail ?? "",
        })
      }
      className={`${base} ${sizing} bg-pine-800 text-bone-50 hover:bg-pine-700`}
    >
      Add to cart
    </button>
  );
}
