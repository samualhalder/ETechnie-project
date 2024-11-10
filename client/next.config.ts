import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["example.com", "another-example.com"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;