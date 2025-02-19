import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: "/strategy-works-task/",
  basePath: "/strategy-works-task",
  output: "export",
};

export default nextConfig;
