import type { Metadata } from "next";
import "@fontsource-variable/outfit";
import "./globals.css";
import { CartProvider, CartDrawer } from "@/components/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema } from "@/lib/schema";
import { getProducts } from "@/lib/woo";
import type { SearchItem } from "@/lib/types";

export const metadata: Metadata = {
  metadataBase: new URL("https://celticwellness.ie"),
  title: {
    default: "Celtic Wellness | Ireland's Supplement & Fitness Retailer",
    template: "%s | Celtic Wellness",
  },
  description:
    "Premium supplements and wellness equipment from Sligo, Ireland. Shilajit, sea moss, creatine, water treatment and recovery gear with fast nationwide delivery.",
  openGraph: {
    siteName: "Celtic Wellness LTD",
    locale: "en_IE",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Slim index for client-side search; ~56 products keeps this tiny.
  const searchIndex: SearchItem[] = (await getProducts()).map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    image: p.images[0]?.thumbnail ?? "",
    category:
      p.categories.find((c) => c.slug !== "wellness-supplements")?.name ??
      p.categories[0]?.name ??
      "",
  }));

  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationSchema()} />
        <CartProvider>
          <Header searchIndex={searchIndex} />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
