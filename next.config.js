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
  
  // Webpack configuration for better code splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Framework chunk (React, Next.js core)
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            
            // Separate chunk for Plate editor (very large)
            plate: {
              name: 'plate',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@udecode[\\/]/,
              priority: 35,
              enforce: true,
            },
            
            // Separate chunk for Material UI
            mui: {
              name: 'mui',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@mui[\\/]/,
              priority: 35,
              enforce: true,
            },
            
            // Separate chunk for Radix UI
            radix: {
              name: 'radix',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              priority: 35,
              enforce: true,
            },
            
            // Separate chunk for Stripe
            stripe: {
              name: 'stripe',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@stripe[\\/]/,
              priority: 35,
              enforce: true,
            },
            
            // Large libraries chunk
            lib: {
              name: 'lib',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@tanstack|axios|lodash|moment|date-fns|zod)[\\/]/,
              priority: 30,
              enforce: true,
            },
            
            // Vendor chunk for remaining node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              minChunks: 1,
            },
            
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  
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
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
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
