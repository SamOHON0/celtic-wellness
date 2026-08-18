"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBagOpen } from "@phosphor-icons/react";
import { WOO_URL, FREE_DELIVERY_THRESHOLD } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export type CartItem = {
  id: number; // product ID, or variation ID for variable products
  name: string;
  slug: string;
  price: string; // minor units
  image: string;
  qty: number;
  variant?: string; // e.g. "Calm", shown under the name in the drawer
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number; // minor units
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  open: () => void;
  close: () => void;
  checkingOut: boolean;
  checkout: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

const STORAGE_KEY = "cw-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  /**
   * Checkout handoff: replays the local cart into the WooCommerce session
   * (same-site cookie carries it), then sends the shopper to Woo checkout.
   * Payments, VAT, shipping and order emails all stay on WooCommerce.
   */
  const checkout = useCallback(async () => {
    if (items.length === 0) return;
    setCheckingOut(true);
    try {
      for (const item of items) {
        await fetch(
          `${WOO_URL}/?add-to-cart=${item.id}&quantity=${item.qty}`,
          { mode: "no-cors", credentials: "include" },
        );
      }
    } catch {
      /* if replay fails we still land on Woo cart where they can re-add */
    }
    window.location.href = `${WOO_URL}/checkout/`;
  }, [items]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + Number(i.price) * i.qty, 0);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQty,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      checkingOut,
      checkout,
    }),
    [items, count, subtotal, isOpen, addItem, removeItem, setQty, checkingOut, checkout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function CartDrawer() {
  const cart = useCart();
  const remaining = FREE_DELIVERY_THRESHOLD * 100 - cart.subtotal;

  return (
    <div
      className={`fixed inset-0 z-50 ${cart.isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cart.isOpen}
    >
      <button
        aria-label="Close cart"
        onClick={cart.close}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          cart.isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-bone-50 shadow-2xl transition-transform duration-300 ease-out ${
          cart.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-bone-200 px-6 py-4">
          <h2 className="text-lg font-semibold">
            Your cart {cart.count > 0 && `(${cart.count})`}
          </h2>
          <button
            onClick={cart.close}
            aria-label="Close"
            className="rounded-full p-2 transition-colors hover:bg-bone-200"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBagOpen size={44} className="text-pine-300" />
            <p className="text-ink-soft">
              Your cart is empty. Browse the shop to find something that works
              for you.
            </p>
            <button
              onClick={cart.close}
              className="rounded-full bg-pine-800 px-6 py-3 text-sm font-semibold text-bone-50 transition-transform active:scale-[0.98]"
            >
              Keep shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-bone-200 overflow-y-auto px-6">
              {cart.items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-bone-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-medium leading-snug">
                      {item.name}
                    </p>
                    {item.variant && (
                      <p className="mt-0.5 text-xs text-ink-soft">
                        {item.variant}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-ink-soft">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-bone-300">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => cart.setQty(item.id, item.qty - 1)}
                          className="p-1.5"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm">
                          {item.qty}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => cart.setQty(item.id, item.qty + 1)}
                          className="p-1.5"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.removeItem(item.id)}
                        className="text-xs text-ink-soft underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-bone-200 px-6 py-5">
              {remaining > 0 ? (
                <p className="mb-3 text-sm text-ink-soft">
                  {formatPrice(remaining)} away from free delivery
                </p>
              ) : (
                <p className="mb-3 text-sm font-medium text-pine-600">
                  You have free delivery
                </p>
              )}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-ink-soft">Subtotal</span>
                <span className="text-lg font-semibold">
                  {formatPrice(cart.subtotal)}
                </span>
              </div>
              <button
                onClick={cart.checkout}
                disabled={cart.checkingOut}
                className="w-full rounded-full bg-pine-800 py-3.5 text-sm font-semibold text-bone-50 transition-all hover:bg-pine-700 active:scale-[0.98] disabled:opacity-60"
              >
                {cart.checkingOut ? "Preparing checkout..." : "Checkout"}
              </button>
              <p className="mt-3 text-center text-xs text-ink-soft">
                Secure checkout powered by our store
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
