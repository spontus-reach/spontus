import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
