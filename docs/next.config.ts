import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Remove basePath when using custom domain at root
  // basePath: "/vietnam-map-34-provinces",
  images: {
    unoptimized: true,
  },
  // Disable trailing slash for cleaner URLs
  trailingSlash: false,
};

export default nextConfig;
