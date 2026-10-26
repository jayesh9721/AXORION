import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about", destination: "/company", permanent: true },
      { source: "/about-us", destination: "/company", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
