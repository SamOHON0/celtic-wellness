import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { Customer } from "./types";

/**
 * Minimal signed-cookie session, no dependencies. The cookie value is
 * base64url(payload).base64url(hmac-sha256(payload)). Payload is the
 * customer object plus an expiry timestamp.
 */

export const SESSION_COOKIE = "cw-session";
const MAX_AGE_S = 60 * 60 * 24 * 14; // 14 days

function secret(): string {
  // Set ACCOUNT_SESSION_SECRET in production. The fallback keeps demo mode
  // working out of the box but is not for real accounts.
  return process.env.ACCOUNT_SESSION_SECRET ?? "cw-demo-secret-not-for-prod";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionValue(customer: Customer): string {
  const payload = Buffer.from(
    JSON.stringify({ c: customer, exp: Date.now() + MAX_AGE_S * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function parseSessionValue(value: string): Customer | null {
  const dot = value.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = value.slice(0, dot);
  const mac = value.slice(dot + 1);
  const expected = sign(payload);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      c: Customer;
      exp: number;
    };
    if (data.exp < Date.now()) return null;
    return data.c;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_S,
};

/** For server components / route handlers. */
export async function getSessionCustomer(): Promise<Customer | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  return raw ? parseSessionValue(raw) : null;
}
