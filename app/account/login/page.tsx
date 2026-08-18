import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/account/login-form";
import { getAccountProvider } from "@/lib/account/provider";
import { getSessionCustomer } from "@/lib/account/session";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Celtic Wellness account.",
};

export default async function LoginPage() {
  const customer = await getSessionCustomer();
  if (customer) redirect("/account");

  const demo = getAccountProvider().mode === "demo";

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Your account</h1>
      <p className="mt-2 text-ink-soft">
        Sign in to see your orders and details.
      </p>

      {demo && (
        <p className="mt-6 rounded-xl bg-pine-100 px-4 py-3 text-sm text-pine-800">
          Preview mode: accounts aren&rsquo;t connected to the store yet, so
          any email and password will sign you in with sample data.
        </p>
      )}

      <div className="mt-8">
        <LoginForm />
      </div>
    </div>
  );
}
