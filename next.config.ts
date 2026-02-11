import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/ttg-ui-deployment";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // for github pages
  output: "export",
  basePath,
  assetPrefix: basePath,
  // ensure exported pages generate folder-based output
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
