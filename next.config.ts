import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "celticwellness.ie" },
      { protocol: "https", hostname: "*.celticwellness.ie" },
    ],
  },
};

export default nextConfig;
