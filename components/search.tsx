"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import type { SearchItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";

/**
 * Client-side product search over a slim index serialized by the layout.
 * With ~56 products a simple token match beats shipping a search library.
 */
export function Search({ index }: { index: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];
    return index
      .filter((item) => {
        const haystack = `${item.name} ${item.category}`.toLowerCase();
        return tokens.every((t) => haystack.includes(t));
      })
      .slice(0, 8);
  }, [index, query]);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function go(slug: string) {
    close();
    router.push(`/product/${slug}`);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className="rounded-full p-2.5 transition-colors hover:bg-bone-200"
      >
        <MagnifyingGlass size={22} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            aria-label="Close search"
            onClick={close}
            className="absolute inset-0 bg-ink/40"
          />
          <div className="absolute left-1/2 top-20 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-card bg-bone-50 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-bone-200 px-4">
              <MagnifyingGlass size={20} className="shrink-0 text-ink-soft" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results[0]) go(results[0].slug);
                }}
                placeholder="Search shilajit, creatine, sea moss..."
                aria-label="Search products"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-ink-soft/60"
              />
              <button
                onClick={close}
                aria-label="Close"
                className="rounded-full p-1.5 transition-colors hover:bg-bone-200"
              >
                <X size={18} />
              </button>
            </div>

            {query && (
              <ul className="max-h-[60vh] overflow-y-auto py-2">
                {results.length === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-ink-soft">
                    No products match &ldquo;{query}&rdquo;
                  </li>
                ) : (
                  results.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => go(item.slug)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-bone-100"
                      >
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bone-100">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.name}
                          </p>
                          {item.category && (
                            <p className="text-xs text-ink-soft">
                              {item.category}
                            </p>
                          )}
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-pine-800">
                          {formatPrice(item.price)}
                        </p>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
