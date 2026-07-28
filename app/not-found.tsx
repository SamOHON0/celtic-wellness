import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        That page does not exist or may have moved. The full range is still in
        the shop.
      </p>
      <Link
        href="/shop"
        className="mt-8 rounded-full bg-pine-800 px-8 py-3.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98]"
      >
        Go to the shop
      </Link>
    </div>
  );
}
