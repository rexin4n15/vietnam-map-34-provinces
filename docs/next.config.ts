import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/vietnam-map-34-provinces",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
