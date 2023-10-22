/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? process.env.VERCEL_URL : "",
};

module.exports = nextConfig;
