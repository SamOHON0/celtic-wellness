"use client";

import { useMemo, useState } from "react";
import { useCart } from "./cart";
import type { Product, Variation } from "@/lib/types";
import { formatPrice } from "@/lib/format";

/**
 * Option selection for variable products. Renders one pill row per
 * variation-defining attribute; once every attribute has a value it resolves
 * the matching variation and hands its ID to the cart, which the checkout
 * replay passes to Woo via ?add-to-cart=<variation_id>.
 */
export function VariationPicker({
  product,
  variations,
}: {
  product: Product;
  variations: Variation[];
}) {
  const cart = useCart();
  const attributes = product.attributes ?? [];

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    // Preselect any attribute that only has one term.
    const initial: Record<string, string> = {};
    for (const attr of attributes) {
      if (attr.terms.length === 1) initial[attr.name] = attr.terms[0].name;
    }
    return initial;
  });

  const match = useMemo(() => {
    if (attributes.some((a) => !selected[a.name])) return undefined;
    return variations.find((v) =>
      v.attributes.every((a) => {
        const chosen = selected[a.name];
        // "Any" variations have empty values; they match whatever is chosen.
        if (!a.value) return Boolean(chosen);
        return chosen?.toLowerCase() === a.value.toLowerCase();
      }),
    );
  }, [attributes, selected, variations]);

  const complete = attributes.every((a) => selected[a.name]);
  const price = match ? match.price : product.price;
  const onSale = match ? match.onSale : product.onSale;
  const regularPrice = match ? match.regularPrice : product.regularPrice;

  const variantLabel = attributes
    .map((a) => selected[a.name])
    .filter(Boolean)
    .join(" / ");

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="text-2xl font-semibold text-pine-800">
          {formatPrice(price)}
        </p>
        {onSale && (
          <p className="text-lg text-ink-soft line-through">
            {formatPrice(regularPrice)}
          </p>
        )}
      </div>

      {attributes.map((attr) => (
        <fieldset key={attr.name} className="mt-6">
          <legend className="text-sm font-medium">
            {attr.name}
            {selected[attr.name] && (
              <span className="ml-2 font-normal text-ink-soft">
                {selected[attr.name]}
              </span>
            )}
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {attr.terms.map((term) => {
              const active = selected[attr.name] === term.name;
              return (
                <button
                  key={term.slug}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setSelected((prev) => ({ ...prev, [attr.name]: term.name }))
                  }
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-pine-800 bg-pine-800 text-bone-50"
                      : "border-bone-300 bg-bone-50 text-ink hover:border-pine-400"
                  }`}
                >
                  {term.name}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="mt-8 max-w-sm">
        <button
          type="button"
          disabled={!match || !match.inStock}
          onClick={() => {
            if (!match) return;
            cart.addItem({
              id: match.id,
              name: product.name,
              variant: variantLabel,
              slug: product.slug,
              price: match.price,
              image:
                match.image?.thumbnail ?? product.images[0]?.thumbnail ?? "",
            });
          }}
          className="w-full rounded-full bg-pine-800 px-6 py-3.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {!complete
            ? "Select options"
            : !match
              ? "Combination unavailable"
              : !match.inStock
                ? "Out of stock"
                : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
