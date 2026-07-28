import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog: Wellness Guides from Sligo",
  description:
    "Practical guides on shilajit, sea moss, creatine, hydration and recovery from the Celtic Wellness team in Sligo, Ireland.",
};

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        The Journal
      </h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Practical, hype-free guides on supplements, hydration and recovery,
        written from Sligo.
      </p>

      {/* Lead article */}
      <Link
        href={`/blog/${lead.slug}`}
        className="group mt-10 grid gap-8 rounded-card bg-bone-100 p-5 lg:grid-cols-2 lg:p-8"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
          <Image
            src={lead.image}
            alt={lead.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-pine-600">{lead.category}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight transition-colors group-hover:text-pine-700 md:text-3xl">
            {lead.title}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {lead.description}
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            {new Date(lead.date).toLocaleDateString("en-IE", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" · "}
            {lead.readingMinutes} min read
          </p>
        </div>
      </Link>

      {/* Rest */}
      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-bone-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 text-sm font-medium text-pine-600">
              {post.category}
            </p>
            <h2 className="mt-1 font-semibold leading-snug transition-colors group-hover:text-pine-700">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
