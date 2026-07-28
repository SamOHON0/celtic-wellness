"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { List, X, Tote } from "@phosphor-icons/react";
import { useCart } from "./cart";

const NAV = [
  { label: "Shop All", href: "/shop" },
  { label: "Supplements", href: "/product-category/wellness-supplements" },
  { label: "Shilajit", href: "/product-category/shilajit" },
  { label: "Water Treatment", href: "/product-category/water-treatment" },
  { label: "Recovery", href: "/product-category/ice-tubs" },
  { label: "About", href: "/about" },
];

export function Header() {
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-bone-200 bg-bone-50/90 backdrop-blur">
      <div className="bg-pine-900 py-1.5 text-center text-xs font-medium tracking-wide text-bone-100">
        Free delivery across Ireland on orders over €50
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold tracking-tight text-pine-900">
            Celtic
          </span>
          <span className="text-xl font-light tracking-tight text-ink">
            Wellness
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-pine-600 ${
                pathname === item.href ? "text-pine-700" : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={cart.open}
            aria-label="Open cart"
            className="relative rounded-full p-2.5 transition-colors hover:bg-bone-200"
          >
            <Tote size={22} />
            {cart.count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-pine-700 text-[11px] font-semibold text-bone-50">
                {cart.count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full p-2.5 transition-colors hover:bg-bone-200 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-bone-200 bg-bone-50 px-4 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-2 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bone-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
