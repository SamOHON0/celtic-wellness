import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { posts, getPost } from "@/lib/posts";
import { PostBody } from "@/components/post-body";
import { JsonLd } from "@/components/json-ld";
import { articleSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {post.faqs && <JsonLd data={faqSchema(post.faqs)} />}

      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-pine-700"
      >
        <ArrowLeft size={16} /> All articles
      </Link>

      <div className="mx-auto mt-8 max-w-3xl">
        <p className="text-sm font-medium text-pine-600">{post.category}</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          {new Date(post.date).toLocaleDateString("en-IE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" · "}
          {post.readingMinutes} min read · Celtic Wellness Team
        </p>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card bg-bone-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <div className="mt-10">
          <PostBody blocks={post.body} />
        </div>

        {post.faqs && (
          <section className="mt-12 border-t border-bone-200 pt-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-4 divide-y divide-bone-200">
              {post.faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">
                    {f.q}
                  </summary>
                  <p className="mt-2 leading-relaxed text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-card bg-pine-50 p-6 sm:p-8">
          <p className="font-semibold">Shop the range</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            Everything we write about, we stock: lab-tested and shipped tracked
            from Sligo with free delivery over €50.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-pine-800 px-6 py-2.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98]"
          >
            Browse products
          </Link>
        </div>
      </div>

      <section className="mt-16 border-t border-bone-200 pt-10">
        <h2 className="text-xl font-bold tracking-tight">Keep reading</h2>
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {others.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
              <div className="relative aspect-[16/11] overflow-hidden rounded-card bg-bone-100">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-3 font-semibold leading-snug transition-colors group-hover:text-pine-700">
                {p.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
