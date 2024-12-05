import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/zarco',
  assetPrefix: isProd ? '/zarco' : ''
};

export default nextConfig;
