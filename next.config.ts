import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: { unoptimized: true }, // derivatives are pre-built by `npm run media`
};

export default config;
