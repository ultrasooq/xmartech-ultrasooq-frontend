/**
 * @file next.config.js — Next.js configuration for the Ultrasooq frontend.
 *
 * @intent
 *   Configures the Next.js build and runtime for a B2B/B2C marketplace frontend
 *   with internationalization (next-intl), S3 image hosting, and permissive CORS.
 *
 * @idea
 *   Wraps the Next.js config with the next-intl plugin for i18n support.
 *   Disables ESLint and TypeScript errors during builds (ignoreDuringBuilds /
 *   ignoreBuildErrors) to allow deployment despite warnings.
 *
 * @usage
 *   Loaded automatically by Next.js at build/dev time.
 *
 * @depends
 *   - next-intl/plugin — i18n middleware integration.
 *   - Next.js image optimization — configured for AWS S3 and Amazon media CDN.
 *
 * @notes
 *   - CORS headers are set to allow all origins ("*") on all paths — wide open.
 *   - Image optimization is disabled (unoptimized: true) — images served as-is.
 *   - Remote patterns allow AWS S3 buckets and Amazon media CDN for product images.
 *   - allowedDevOrigins includes a specific local IP for development.
 *   - Both ESLint and TypeScript build errors are suppressed.
 */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ["192.168.29.205"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "puremoon.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.media-amazon.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});

module.exports = nextConfig;
