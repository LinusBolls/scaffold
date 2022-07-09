/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL
  },
  experimental: {
    outputStandalone: true,
  },
};
