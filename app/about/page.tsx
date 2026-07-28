import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Celtic Wellness is a Sligo-based supplement and wellness retailer shipping premium, tested products across Ireland.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Ireland&apos;s home of practical wellness
          </h1>
          <p className="mt-6 leading-relaxed text-ink-soft">
            Celtic Wellness is based in Sligo, on Ireland&apos;s Atlantic
            coast. Our mission is simple: provide high-quality, innovative
            health products that meet your needs and exceed your expectations,
            without the noise.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Every product in our range is chosen for proven ingredients and
            tested quality, from Himalayan Shilajit and Irish sea moss to
            hydrogen water systems and recovery equipment. If we would not use
            it ourselves, we do not stock it.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Orders ship fast and tracked nationwide, usually landing at your
            door within 2 to 3 days.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-pine-800 px-8 py-3.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98]"
          >
            Shop the range
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-pine-100">
          <Image
            src="https://celticwellness.ie/wp-content/uploads/2026/03/CelticW_004JC-scaled-1.jpg"
            alt="Celtic Wellness Shilajit Capsules"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
