import type { ReactNode } from "react";

/** Shared shell for policy/info pages so they all read as one site. */
export function InfoPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {intro && (
        <p className="mt-3 leading-relaxed text-ink-soft">{intro}</p>
      )}
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}

export function InfoSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
