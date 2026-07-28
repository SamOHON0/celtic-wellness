"use client";

import { useState } from "react";

/**
 * Email capture strip. Currently stores intent client-side only; wire the
 * submit handler to Klaviyo/Mailchimp or the Woo newsletter endpoint when the
 * ESP is chosen.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    // TODO: POST to email provider once selected.
    setStatus("done");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="rounded-card bg-pine-900 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight text-bone-50 md:text-3xl">
          10% off your first order
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-bone-300">
          Join the list for practical wellness guides and early access to new
          products. No noise, unsubscribe anytime.
        </p>
        {status === "done" ? (
          <p className="mt-6 font-medium text-pine-300">
            You&apos;re in. Keep an eye on your inbox.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatus("idle");
              }}
              placeholder="you@example.com"
              className="w-full rounded-full border border-pine-700 bg-pine-800 px-5 py-3 text-sm text-bone-50 placeholder:text-bone-300/70 focus:border-pine-300 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-bone-50 px-7 py-3 text-sm font-semibold text-pine-900 transition-all hover:bg-bone-100 active:scale-[0.98]"
            >
              Sign up
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-amber-accent">
            That email doesn&apos;t look right. Check it and try again.
          </p>
        )}
      </div>
    </section>
  );
}
