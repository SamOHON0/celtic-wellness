import Link from "next/link";
import { WOO_URL } from "@/lib/config";

const SHOP_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Supplements", href: "/product-category/wellness-supplements" },
  { label: "Shilajit", href: "/product-category/shilajit" },
  { label: "Water Treatment", href: "/product-category/water-treatment" },
  { label: "Ice Tubs", href: "/product-category/ice-tubs" },
  { label: "Infrared Saunas", href: "/product-category/infrared-saunas" },
];

const HELP_LINKS = [
  { label: "Contact Us", href: `${WOO_URL}/contact/` },
  { label: "Delivery Information", href: `${WOO_URL}/delivery-information/` },
  { label: "Returns Policy", href: `${WOO_URL}/refund-returns/` },
  { label: "Track My Order", href: `${WOO_URL}/order-tracking/` },
  { label: "Wholesale", href: `${WOO_URL}/wholesale/` },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: `${WOO_URL}/terms/` },
  { label: "Privacy Policy", href: `${WOO_URL}/privacy/` },
  { label: "Cookie Policy", href: `${WOO_URL}/cookies/` },
];

export function Footer() {
  return (
    <footer className="bg-pine-950 text-bone-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="text-lg font-bold text-bone-50">Celtic Wellness</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone-300">
              Premium supplements and wellness equipment, shipped fast and
              tracked from our door in Sligo to yours, anywhere in Ireland.
            </p>
            <div className="mt-5 flex gap-4 text-sm">
              <a
                href="https://www.instagram.com/celticwellness.ireland/"
                className="transition-colors hover:text-bone-50"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@celticwellnessirl"
                className="transition-colors hover:text-bone-50"
              >
                TikTok
              </a>
              <a
                href="https://www.facebook.com/p/Celtic-Wellness-61567784737725/"
                className="transition-colors hover:text-bone-50"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-bone-50">Shop</p>
            <ul className="mt-4 space-y-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-bone-300 transition-colors hover:text-bone-50"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-bone-50">Help</p>
            <ul className="mt-4 space-y-2.5">
              {HELP_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-bone-300 transition-colors hover:text-bone-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-bone-50">Company</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-bone-300 transition-colors hover:text-bone-50"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-bone-300 transition-colors hover:text-bone-50"
                >
                  Blog
                </Link>
              </li>
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-bone-300 transition-colors hover:text-bone-50"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-pine-800 pt-6 text-xs text-bone-300">
          Copyright © {new Date().getFullYear()} Celtic Wellness LTD. Sligo,
          Ireland.
        </div>
      </div>
    </footer>
  );
}
