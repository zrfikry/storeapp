import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://placehold.co/**"),
      new URL("https://cdn.dummyjson.com/**"),
      new URL("https://i.dummyjson.com/**"),
    ],
  },
};

export default nextConfig;
