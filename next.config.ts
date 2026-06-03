import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Pin Turbopack root to this repo (avoids picking up ~/package-lock.json). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/team/listings",
        destination: "/browse",
        permanent: false,
      },
      {
        source: "/for-sponsors",
        destination: "/for-brands",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
