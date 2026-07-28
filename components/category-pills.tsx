import Link from "next/link";
import type { Category } from "@/lib/types";

export function CategoryPills({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug: string | null;
}) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Link
        href="/shop"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          activeSlug === null
            ? "bg-pine-800 text-bone-50"
            : "bg-bone-100 text-ink hover:bg-bone-200"
        }`}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/product-category/${c.slug}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeSlug === c.slug
              ? "bg-pine-800 text-bone-50"
              : "bg-bone-100 text-ink hover:bg-bone-200"
          }`}
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}
