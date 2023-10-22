/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === "production" ? "/give-me-password.vercel.app" : "",
};

module.exports = nextConfig;
