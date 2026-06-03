import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.goldenlink.moltaqadev.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "api.iga.sa",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
