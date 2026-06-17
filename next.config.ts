import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blanchedalmond-bison-874584.hostingersite.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
