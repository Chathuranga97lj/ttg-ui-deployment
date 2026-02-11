import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // for github pages
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
