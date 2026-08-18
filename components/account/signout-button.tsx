"use client";

import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/account/logout", { method: "POST" });
        router.push("/");
        router.refresh();
      }}
      className="rounded-full border border-bone-300 px-5 py-2 text-sm font-medium transition-colors hover:border-pine-400 hover:text-pine-700"
    >
      Sign out
    </button>
  );
}
