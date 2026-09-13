import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Official Hack Club logos and flags
    remotePatterns: [new URL("https://assets.hackclub.com/**")],
  },
};

export default nextConfig;
