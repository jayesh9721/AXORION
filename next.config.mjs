// Plain JavaScript on purpose: some hosts (e.g. Hostinger shared servers) cannot run the TypeScript
// compiler that Next.js 16 needs to read a next.config.ts, so this file loads without it.

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Standalone output gives the host a self-contained server (.next/standalone/server.js).
  // Skipped on Vercel, which has its own build output format.
  output: process.env.VERCEL ? undefined : "standalone",
  // The server image optimiser needs a native program that old hosts may lack. The logo is tiny, so serve it as-is.
  images: { unoptimized: true },
  async redirects() {
    return [
      // One address for the site: send www.axorion.in (any path and query) to axorion.in.
      { source: "/:path*", has: [{ type: "host", value: "www.axorion.in" }], destination: "https://axorion.in/:path*", permanent: true },
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
