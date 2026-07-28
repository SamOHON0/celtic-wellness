import Image from "next/image";
import Link from "next/link";
import { Truck, Flask, ChatCircleText, Medal } from "@phosphor-icons/react/dist/ssr";
import { getProducts } from "@/lib/woo";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";

export const revalidate = 300;

const CATEGORY_TILES = [
  {
    name: "Wellness Supplements",
    slug: "wellness-supplements",
    blurb: "Daily foundations, from magnesium to marine collagen",
  },
  {
    name: "Shilajit",
    slug: "shilajit",
    blurb: "Pure Himalayan resin, capsules, drops and gummies",
  },
  {
    name: "Water Treatment",
    slug: "water-treatment",
    blurb: "Hydrogen and alkaline water systems for the home",
  },
  {
    name: "Recovery",
    slug: "ice-tubs",
    blurb: "Ice tubs, saunas and recovery equipment",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((p) => p.inStock && p.images.length > 0).slice(0, 8);

  const tileImage = (slug: string) =>
    products.find((p) => p.categories.some((c) => c.slug === slug) && p.images[0])
      ?.images[0]?.src;

  return (
    <>
      {/* Hero: asymmetric split */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine-600">
            Sligo, Ireland
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
            Wellness that
            <br />
            actually works
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Premium supplements and recovery gear, tested for purity and
            delivered tracked across Ireland in 2 to 3 days.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-pine-800 px-8 py-3.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98]"
            >
              Shop now
            </Link>
            <Link
              href="/product-category/shilajit"
              className="rounded-full border border-pine-800 px-8 py-3.5 text-sm font-semibold text-pine-800 transition-colors hover:bg-pine-50"
            >
              Explore Shilajit
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-pine-100 lg:aspect-[5/6]">
          <Image
            src="https://celticwellness.ie/wp-content/uploads/2026/03/CelticW_012JC-scaled-1.webp"
            alt="Celtic Wellness Organic Himalayan Shilajit"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Shop by category
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_TILES.map((tile, i) => {
            const img = tileImage(tile.slug);
            return (
              <Reveal key={tile.slug} delay={i * 60}>
                <Link
                  href={`/product-category/${tile.slug}`}
                  className="group block overflow-hidden rounded-card bg-bone-100"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {img && (
                      <Image
                        src={img}
                        alt={tile.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-semibold transition-colors group-hover:text-pine-700">
                      {tile.name}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {tile.blurb}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-bone-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Bestsellers
              </h2>
            </Reveal>
            <Link
              href="/shop"
              className="text-sm font-semibold text-pine-700 underline-offset-4 hover:underline"
            >
              View all products
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-pine-100">
            <Image
              src="https://celticwellness.ie/wp-content/uploads/2026/03/seamoss_capsules-scaled-1.webp"
              alt="Celtic Wellness Irish Sea Moss"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            From the Atlantic coast, made for real routines
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            Celtic Wellness started in Sligo with a simple standard: only stock
            products we would take ourselves. Every supplement is sourced for
            proven ingredients and tested for purity, whether it is Himalayan
            Shilajit, Irish sea moss or creatine for the gym.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Whether you want to feel sharper at work or push further in
            training, we ship what works, fast, to every county in Ireland.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-block rounded-full border border-pine-800 px-7 py-3 text-sm font-semibold text-pine-800 transition-colors hover:bg-pine-50"
          >
            Our story
          </Link>
        </Reveal>
      </section>

      {/* Trust band */}
      <section className="bg-pine-900 py-16 text-bone-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            {
              icon: <Truck size={28} />,
              title: "Fast, tracked delivery",
              body: "2 to 3 day shipping across Ireland with tracking on every order.",
            },
            {
              icon: <Flask size={28} />,
              title: "Tested for purity",
              body: "Proven ingredients, lab-tested batches, no filler formulas.",
            },
            {
              icon: <ChatCircleText size={28} />,
              title: "Real support",
              body: "Questions about a product? Our team actually answers.",
            },
            {
              icon: <Medal size={28} />,
              title: "Results you can feel",
              body: "At work or in the gym, our range is built to deliver.",
            },
          ].map((f) => (
            <div key={f.title}>
              <div className="text-pine-300">{f.icon}</div>
              <p className="mt-4 font-semibold text-bone-50">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-bone-300">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
