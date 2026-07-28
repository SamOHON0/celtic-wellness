import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  Flask,
  ChatCircleText,
  Medal,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProducts } from "@/lib/woo";
import { posts } from "@/lib/posts";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { Newsletter } from "@/components/newsletter";
import { JsonLd } from "@/components/json-ld";
import { faqSchema } from "@/lib/schema";

export const revalidate = 300;

const IMAGES = {
  heroOcean:
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2400&q=80",
  mountains:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
  training:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80",
};

const HOME_FAQS = [
  {
    q: "How fast is delivery in Ireland?",
    a: "Orders ship tracked from Sligo and typically arrive within 2 to 3 working days anywhere in Ireland. Delivery is free on orders over €50.",
  },
  {
    q: "Which shilajit format should I start with?",
    a: "Resin is the traditional format and best value; capsules and gummies are easier to take daily. If you're new to shilajit, capsules are the simplest starting point.",
  },
  {
    q: "Are your products tested?",
    a: "Yes. We stock products with proven ingredients and lab-tested batches, including purity testing on all shilajit.",
  },
  {
    q: "Do you supply shops and gyms?",
    a: "We do. Wholesale enquiries are welcome through our wholesale page and we ship trade orders nationwide.",
  },
];

const CATEGORY_TILES = [
  {
    name: "Shilajit",
    slug: "shilajit",
    blurb: "Resin, capsules, drops, gummies",
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/30g-Shilajit-Celtic.webp",
    span: "lg:col-span-7",
    aspect: "aspect-[4/3] lg:aspect-[16/10]",
  },
  {
    name: "Wellness Supplements",
    slug: "wellness-supplements",
    blurb: "Daily foundations that earn their place",
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/04/Magnesium_12_in_1_complex.webp",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3] lg:aspect-[16/13]",
  },
  {
    name: "Water Treatment",
    slug: "water-treatment",
    blurb: "Hydrogen and alkaline systems",
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/water-bottle-celtic.webp",
    span: "lg:col-span-5",
    aspect: "aspect-[4/3] lg:aspect-[16/13]",
  },
  {
    name: "Recovery",
    slug: "ice-tubs",
    blurb: "Ice tubs, saunas, compression",
    image:
      "https://celticwellness.ie/wp-content/uploads/2026/03/INFRARED-SAUNA-atlantic-ways-celtic-wellness-sligo-health-shop-health-store.png",
    span: "lg:col-span-7",
    aspect: "aspect-[4/3] lg:aspect-[16/10]",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const shilajit = products.filter(
    (p) =>
      p.categories.some((c) => c.slug === "shilajit") && p.images.length > 0,
  );
  const featured = products
    .filter(
      (p) =>
        p.inStock &&
        p.images.length > 0 &&
        !p.categories.some((c) => c.slug === "shilajit"),
    )
    .slice(0, 8);
  const latestPosts = posts.slice(0, 3);
  const heroProduct =
    products.find(
      (p) => p.slug === "organic-himalayan-shilajit-20g" && p.images.length > 0,
    ) ?? shilajit.find((p) => p.inStock);

  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />

      {/* Full-bleed hero */}
      <section className="relative flex min-h-[86dvh] items-center">
        <Image
          src={IMAGES.heroOcean}
          alt="The Atlantic ocean off Ireland's west coast"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950/85 via-pine-950/50 to-pine-950/30" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <div className="hero-enter">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-pine-200">
                Ireland&apos;s shilajit specialists
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight text-bone-50 md:text-7xl">
                Wellness that actually works
              </h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-bone-100/90">
                Lab-tested shilajit and premium supplements, shipped tracked
                from Sligo in 2 to 3 days.
              </p>
            </div>
            <div className="hero-enter-late">
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="rounded-full bg-bone-50 px-8 py-4 text-sm font-semibold text-pine-900 transition-all hover:bg-bone-100 active:scale-[0.98]"
                >
                  Shop now
                </Link>
                <Link
                  href="/product-category/shilajit"
                  className="rounded-full border border-bone-50/60 px-8 py-4 text-sm font-semibold text-bone-50 backdrop-blur-sm transition-colors hover:bg-bone-50/10"
                >
                  Explore Shilajit
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-bone-100/85">
                <li className="flex items-center gap-2">
                  <Truck size={17} className="text-pine-200" /> Free delivery
                  over €50
                </li>
                <li className="flex items-center gap-2">
                  <Flask size={17} className="text-pine-200" /> Lab-tested
                  batches
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-pine-200" /> Secure
                  checkout
                </li>
              </ul>
            </div>
          </div>

          {heroProduct && (
            <div className="hero-enter-late hidden lg:block">
              <div className="ml-auto w-full max-w-sm rounded-card border border-bone-50/20 bg-bone-50/95 p-6 shadow-2xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-pine-600">
                  Customer favourite
                </p>
                <Link
                  href={`/product/${heroProduct.slug}`}
                  className="group mt-4 block"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-bone-100">
                    <Image
                      src={heroProduct.images[0].src}
                      alt={heroProduct.name}
                      fill
                      sizes="384px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 font-semibold leading-snug transition-colors group-hover:text-pine-700">
                    {heroProduct.name}
                  </p>
                </Link>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-lg font-semibold text-pine-800">
                    {formatPrice(heroProduct.price)}
                  </p>
                  <AddToCartButton product={heroProduct} size="sm" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category showcase bento */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Shop by category
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {CATEGORY_TILES.map((tile, i) => (
            <Reveal
              key={tile.slug}
              delay={(i % 2) * 80}
              className={`sm:col-span-1 ${tile.span}`}
            >
              <Link
                href={`/product-category/${tile.slug}`}
                className={`group relative block overflow-hidden rounded-card ${tile.aspect}`}
              >
                <Image
                  src={tile.image}
                  alt={tile.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <h3 className="text-2xl font-bold tracking-tight text-bone-50">
                    {tile.name}
                  </h3>
                  <p className="mt-1 text-sm text-bone-100/85">{tile.blurb}</p>
                  <span className="mt-4 inline-block rounded-full border border-bone-50/50 px-5 py-2 text-xs font-semibold text-bone-50 transition-colors group-hover:bg-bone-50 group-hover:text-pine-900">
                    Shop {tile.name}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Shilajit range */}
      <section className="bg-pine-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.8fr] lg:gap-14">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                The Shilajit range
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                One ingredient, five ways to take it. Pure Himalayan resin for
                purists, capsules and gummies for convenience, drops and honey
                sticks for everything in between. Every batch lab-tested.
              </p>
              <Link
                href="/product-category/shilajit"
                className="mt-6 inline-block rounded-full bg-pine-800 px-7 py-3 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98]"
              >
                Shop all Shilajit
              </Link>
            </div>
          </Reveal>
          <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {shilajit.slice(0, 6).map((product) => (
              <div key={product.id} className="w-56 shrink-0 snap-start sm:w-64">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed narrative band */}
      <section className="relative flex min-h-[70dvh] items-center">
        <Image
          src={IMAGES.mountains}
          alt="High mountains in morning mist"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pine-950/60" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6">
          <Reveal>
            <p className="max-w-3xl text-3xl font-semibold leading-snug text-bone-50 md:text-4xl">
              From Himalayan rock to the Wild Atlantic Way. We stock only what
              we would take ourselves.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border border-bone-50/60 px-8 py-3.5 text-sm font-semibold text-bone-50 transition-colors hover:bg-bone-50 hover:text-pine-900"
            >
              Our story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
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
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Training split */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid overflow-hidden rounded-card bg-pine-900 lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image
              src={IMAGES.training}
              alt="Training with kettlebells in the gym"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-14">
            <h2 className="text-3xl font-bold tracking-tight text-bone-50 md:text-4xl">
              Built for training days
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-bone-300">
              Creatine monohydrate, hydrolysed whey and sugar-free electrolytes.
              The proven basics, without the proprietary-blend nonsense.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/product/creatine-monohydrate-powder-240g"
                className="rounded-full bg-bone-50 px-6 py-3 text-sm font-semibold text-pine-900 transition-all hover:bg-bone-100 active:scale-[0.98]"
              >
                Creatine
              </Link>
              <Link
                href="/product/iso-110-hydrolysed-whey-protein-isolate-chocolate-2300g"
                className="rounded-full border border-bone-50/50 px-6 py-3 text-sm font-semibold text-bone-50 transition-colors hover:bg-bone-50/10"
              >
                Whey isolate
              </Link>
              <Link
                href="/product/celtic-wellness-4-flavor-electrolytes-pack"
                className="rounded-full border border-bone-50/50 px-6 py-3 text-sm font-semibold text-bone-50 transition-colors hover:bg-bone-50/10"
              >
                Electrolytes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="border-y border-bone-200 bg-bone-100 py-16">
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
              <div className="text-pine-600">{f.icon}</div>
              <p className="mt-4 font-semibold">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* From the journal */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              From the journal
            </h2>
          </Reveal>
          <Link
            href="/blog"
            className="text-sm font-semibold text-pine-700 underline-offset-4 hover:underline"
          >
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {latestPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-bone-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-pine-600">
                  {post.category}
                </p>
                <h3 className="mt-1 font-semibold leading-snug transition-colors group-hover:text-pine-700">
                  {post.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone-100 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Common questions
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Can&apos;t find what you need? Our team answers every message.
            </p>
          </div>
          <div className="divide-y divide-bone-300">
            {HOME_FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {f.q}
                  <span className="ml-4 text-pine-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
