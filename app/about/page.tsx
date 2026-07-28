import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Flask,
  Truck,
  HandHeart,
  Leaf,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Our Story & Mission",
  description:
    "Celtic Wellness is a Sligo-based wellness retailer with one standard: only stock what we would take ourselves. Our story, mission and testing standards.",
};

const STANDARDS = [
  {
    icon: <Flask size={26} />,
    title: "Tested, not trending",
    body: "Every supplement we stock is chosen for proven ingredients and lab-tested batches. If a product can't show its testing, it doesn't make the shelf, no matter how loud the trend.",
  },
  {
    icon: <Leaf size={26} />,
    title: "Sourced with care",
    body: "Himalayan shilajit from established high-altitude sources. Sea moss from Atlantic waters. We work with suppliers who can prove where things come from.",
  },
  {
    icon: <Truck size={26} />,
    title: "Fast from Sligo",
    body: "Every order ships tracked from our base in Sligo and typically lands in 2 to 3 working days, anywhere in Ireland. Free over €50.",
  },
  {
    icon: <HandHeart size={26} />,
    title: "Support that answers",
    body: "Questions about a product, a dose, or which format suits you? A real person from our team replies. Before and after you buy.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Full-bleed hero */}
      <section className="relative flex min-h-[62dvh] items-end">
        <Image
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=2400&q=80"
          alt="An Atlantic wave breaking off the Irish coast"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/30 to-pine-950/20" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6">
          <h1 className="hero-enter max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-bone-50 md:text-6xl">
            Practical wellness, from Ireland&apos;s Atlantic coast
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            How it started
          </h2>
          <p className="mt-6 leading-relaxed text-ink-soft">
            Celtic Wellness started in Sligo with a frustration you might
            recognise: a supplement industry full of noise, overclaiming and
            underdelivering. We wanted a shop with one simple standard: only
            stock what we would take ourselves.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            That standard still decides everything on our shelves, from
            Himalayan shilajit and Irish sea moss to creatine, hydrogen water
            systems and recovery gear. Fewer products, better ones, honestly
            described.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-pine-100">
          <Image
            src="https://celticwellness.ie/wp-content/uploads/2026/03/CelticW_012JC-scaled-1.webp"
            alt="Celtic Wellness Himalayan Shilajit resin"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Mission statement band */}
      <section className="bg-pine-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="max-w-3xl text-2xl font-semibold leading-snug text-bone-50 md:text-3xl">
            Our mission is to make proven, honestly described wellness products
            available to everyone in Ireland, delivered fast and backed by real
            support.
          </p>
        </div>
      </section>

      {/* Standards */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            What we hold ourselves to
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {STANDARDS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 80}>
              <div className="flex gap-5">
                <div className="mt-1 shrink-0 text-pine-600">{s.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sligo band */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-pine-100">
            <Image
              src="https://celticwellness.ie/wp-content/uploads/2026/03/seamoss_capsules-scaled-1.webp"
              alt="Irish sea moss capsules by Celtic Wellness"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Why Sligo matters
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">
            We operate from Sligo, on the Wild Atlantic Way, where sea moss has
            been gathered for generations and cold-water swimming never needed
            a rebrand. That coastline shapes how we think about wellness:
            practical, consistent, no shortcuts.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Being here also means every order, from Donegal to Cork, ships from
            the same place with the same care, usually landing within 2 to 3
            working days.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-pine-800 px-8 py-3.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98]"
            >
              Shop the range
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-pine-800 px-8 py-3.5 text-sm font-semibold text-pine-800 transition-colors hover:bg-pine-50"
            >
              Read the journal
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
