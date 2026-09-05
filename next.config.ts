import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "export",

  // basePath alone prefixes routes and asset URLs for the GitHub Pages project
  // site (jzarcoo.github.io/zarco). A separate assetPrefix added a duplicate
  // slash to next/image src URLs, so it is intentionally omitted.
  basePath: isProd ? "/zarco" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
