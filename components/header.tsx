"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { List, X, Tote, User } from "@phosphor-icons/react";
import { useCart } from "./cart";
import { Search } from "./search";
import type { SearchItem } from "@/lib/types";

const NAV = [
  { label: "Shop All", href: "/shop" },
  { label: "Shilajit", href: "/product-category/shilajit" },
  { label: "Supplements", href: "/product-category/wellness-supplements" },
  { label: "Water", href: "/product-category/water-treatment" },
  { label: "Recovery", href: "/product-category/ice-tubs" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header({ searchIndex = [] }: { searchIndex?: SearchItem[] }) {
  const cart = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-bone-200 bg-bone-50/90 backdrop-blur">
      <div className="bg-pine-900 py-1.5 text-center text-xs font-medium tracking-wide text-bone-100">
        Free delivery across Ireland on orders over €50
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Celtic Wellness home">
          <Image
            src="/logo.webp"
            alt="Celtic Wellness"
            width={176}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
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
          <Search index={searchIndex} />
          <Link
            href="/account"
            aria-label="My account"
            className="hidden rounded-full p-2.5 transition-colors hover:bg-bone-200 sm:block"
          >
            <User size={22} />
          </Link>
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
          <Link
            href="/account"
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-2 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-bone-100"
          >
            My Account
          </Link>
        </nav>
      )}
    </header>
  );
}
