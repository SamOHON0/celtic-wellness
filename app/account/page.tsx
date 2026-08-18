import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package } from "@phosphor-icons/react/dist/ssr";
import { SignOutButton } from "@/components/account/signout-button";
import { getAccountProvider } from "@/lib/account/provider";
import { getSessionCustomer } from "@/lib/account/session";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your Celtic Wellness orders and details.",
};

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-pine-100 text-pine-800",
  processing: "bg-amber-accent/20 text-ink",
  refunded: "bg-bone-200 text-ink-soft",
  cancelled: "bg-bone-200 text-ink-soft",
};

export default async function AccountPage() {
  const customer = await getSessionCustomer();
  if (!customer) redirect("/account/login");

  const provider = getAccountProvider();
  const orders = await provider.getOrders(customer);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Hi{customer.firstName ? ` ${customer.firstName}` : ""}
          </h1>
          <p className="mt-1 text-sm text-ink-soft">{customer.email}</p>
        </div>
        <SignOutButton />
      </div>

      {provider.mode === "demo" && (
        <p className="mt-6 rounded-xl bg-pine-100 px-4 py-3 text-sm text-pine-800">
          Preview mode: these are sample orders. Once the store connection is
          switched on, your real order history appears here.
        </p>
      )}

      <h2 className="mt-10 text-xl font-semibold">Your orders</h2>

      {orders.length === 0 ? (
        <div className="mt-6 rounded-card border border-bone-200 p-8 text-center">
          <Package size={32} className="mx-auto text-pine-300" />
          <p className="mt-3 text-ink-soft">No orders yet.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-pine-800 px-6 py-3 text-sm font-semibold text-bone-50"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-card border border-bone-200 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <p className="font-semibold">Order #{order.number}</p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                      STATUS_STYLES[order.status] ?? "bg-bone-200 text-ink-soft"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-ink-soft">
                  {new Date(order.date).toLocaleDateString("en-IE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <ul className="mt-4 space-y-1.5 border-t border-bone-200 pt-4 text-sm text-ink-soft">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between gap-4">
                    <span>
                      {item.name}
                      {item.quantity > 1 && ` × ${item.quantity}`}
                    </span>
                    <span>{formatPrice(item.total)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-bone-200 pt-3 text-sm font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-10 text-sm text-ink-soft">
        Need help with an order?{" "}
        <Link
          href="/contact"
          className="text-pine-700 underline underline-offset-2"
        >
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
