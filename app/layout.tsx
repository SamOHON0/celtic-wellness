import type { Metadata } from "next";
import "@fontsource-variable/outfit";
import "./globals.css";
import { CartProvider, CartDrawer } from "@/components/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema } from "@/lib/schema";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationSchema()} />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
