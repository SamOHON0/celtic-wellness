import { WOO_URL } from "@/lib/config";
import type { AccountOrder, Customer, LoginResult } from "./types";

/**
 * Account data layer with two backends:
 *
 * - "woo": the real thing, against WordPress/WooCommerce. Activates when the
 *   env vars below are set. Requires one-time WP-side setup we can't do until
 *   we have admin access; see docs/account-plumbing.md.
 *     WOO_REST_CONSUMER_KEY / WOO_REST_CONSUMER_SECRET  (Woo REST v3 keys)
 *     WP_JWT_AUTH=1  (JWT Authentication plugin installed on WP)
 *
 * - "demo": no WP dependency. Any email + password signs in, orders are
 *   sample data. Lets the account UI ship and be shown to the client today.
 */

export type AccountProvider = {
  mode: "demo" | "woo";
  login(email: string, password: string): Promise<LoginResult>;
  register(
    email: string,
    password: string,
    firstName: string,
  ): Promise<LoginResult>;
  getOrders(customer: Customer): Promise<AccountOrder[]>;
};

/* ------------------------------ demo backend ------------------------------ */

const demoProvider: AccountProvider = {
  mode: "demo",

  async login(email, password) {
    if (!email.includes("@")) {
      return { ok: false, error: "Enter a valid email address." };
    }
    if (password.length < 4) {
      return { ok: false, error: "Password must be at least 4 characters." };
    }
    const name = email.split("@")[0];
    return {
      ok: true,
      customer: {
        id: 0,
        email,
        firstName: name.charAt(0).toUpperCase() + name.slice(1),
        lastName: "",
      },
    };
  },

  async register(email, password, firstName) {
    const result = await demoProvider.login(email, password);
    if (!result.ok) return result;
    return {
      ok: true,
      customer: { ...result.customer, firstName: firstName || result.customer.firstName },
    };
  },

  async getOrders() {
    return [
      {
        id: 1041,
        number: "1041",
        date: "2026-08-02T10:14:00Z",
        status: "completed",
        total: "6490",
        items: [
          { name: "Organic Himalayan Shilajit 20g", quantity: 2, total: "5000" },
          { name: "Electrolyte Drink Mix Single Sachet", quantity: 3, total: "895" },
        ],
      },
      {
        id: 1067,
        number: "1067",
        date: "2026-08-14T18:40:00Z",
        status: "processing",
        total: "3500",
        items: [
          { name: "Irish Sea Moss Supplement", quantity: 1, total: "2500" },
          { name: "Herbal Function Sticks (Calm)", quantity: 1, total: "1500" },
        ],
      },
    ];
  },
};

/* ------------------------------ woo backend ------------------------------- */

const CK = process.env.WOO_REST_CONSUMER_KEY;
const CS = process.env.WOO_REST_CONSUMER_SECRET;
const JWT_ENABLED = process.env.WP_JWT_AUTH === "1";

function restAuth(): string {
  return "Basic " + Buffer.from(`${CK}:${CS}`).toString("base64");
}

function toMinor(decimal: string): string {
  return String(Math.round(parseFloat(decimal || "0") * 100));
}

type WooRestCustomer = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

async function findCustomerByEmail(email: string): Promise<WooRestCustomer | null> {
  const res = await fetch(
    `${WOO_URL}/wp-json/wc/v3/customers?email=${encodeURIComponent(email)}`,
    { headers: { Authorization: restAuth() }, cache: "no-store" },
  );
  if (!res.ok) return null;
  const list = (await res.json()) as WooRestCustomer[];
  return list[0] ?? null;
}

const wooProvider: AccountProvider = {
  mode: "woo",

  async login(email, password) {
    // Validate the customer's credentials against WordPress via the JWT
    // Authentication plugin, then load their Woo customer record.
    const tokenRes = await fetch(`${WOO_URL}/wp-json/jwt-auth/v1/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
      cache: "no-store",
    });
    if (!tokenRes.ok) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    const record = await findCustomerByEmail(email);
    if (!record) {
      return { ok: false, error: "No customer account found for this email." };
    }
    return {
      ok: true,
      customer: {
        id: record.id,
        email: record.email,
        firstName: record.first_name,
        lastName: record.last_name,
      },
    };
  },

  async register(email, password, firstName) {
    const res = await fetch(`${WOO_URL}/wp-json/wc/v3/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: restAuth() },
      body: JSON.stringify({ email, password, first_name: firstName }),
      cache: "no-store",
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as {
        message?: string;
      } | null;
      return {
        ok: false,
        error: body?.message ?? "Could not create the account.",
      };
    }
    const record = (await res.json()) as WooRestCustomer;
    return {
      ok: true,
      customer: {
        id: record.id,
        email: record.email,
        firstName: record.first_name,
        lastName: record.last_name,
      },
    };
  },

  async getOrders(customer) {
    const res = await fetch(
      `${WOO_URL}/wp-json/wc/v3/orders?customer=${customer.id}&per_page=20`,
      { headers: { Authorization: restAuth() }, cache: "no-store" },
    );
    if (!res.ok) return [];
    const raw = (await res.json()) as {
      id: number;
      number: string;
      date_created_gmt: string;
      status: string;
      total: string;
      line_items: { name: string; quantity: number; total: string }[];
    }[];
    return raw.map((o) => ({
      id: o.id,
      number: o.number,
      date: `${o.date_created_gmt}Z`,
      status: o.status,
      total: toMinor(o.total),
      items: (o.line_items ?? []).map((i) => ({
        name: i.name,
        quantity: i.quantity,
        total: toMinor(i.total),
      })),
    }));
  },
};

/* -------------------------------- selector -------------------------------- */

export function getAccountProvider(): AccountProvider {
  if (CK && CS && JWT_ENABLED) return wooProvider;
  return demoProvider;
}
