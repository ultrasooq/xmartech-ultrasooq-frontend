/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["puremoon.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
