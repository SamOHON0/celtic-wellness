import { NextResponse } from "next/server";
import { getAccountProvider } from "@/lib/account/provider";
import {
  SESSION_COOKIE,
  createSessionValue,
  sessionCookieOptions,
} from "@/lib/account/session";

export async function POST(request: Request) {
  let body: {
    email?: string;
    password?: string;
    firstName?: string;
    mode?: "login" | "register";
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  const provider = getAccountProvider();
  const result =
    body.mode === "register"
      ? await provider.register(email, password, (body.firstName ?? "").trim())
      : await provider.login(email, password);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(
    SESSION_COOKIE,
    createSessionValue(result.customer),
    sessionCookieOptions,
  );
  return response;
}
