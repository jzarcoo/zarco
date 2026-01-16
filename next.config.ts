import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath: isProd ? "/zarco" : "",
  assetPrefix: isProd ? "/zarco/" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
