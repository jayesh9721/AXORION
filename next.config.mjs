// Plain JavaScript on purpose: some hosts (e.g. Hostinger shared servers) cannot run the TypeScript
// compiler that Next.js 16 needs to read a next.config.ts, so this file loads without it.

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // The server image optimiser needs a native program that old hosts may lack. The logo is tiny, so serve it as-is.
  images: { unoptimized: true },
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
