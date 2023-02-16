/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    externalResolver: true,
  },
  env: {
    NEXT_PUBLIC_BACK_URI: process.env.BASE_URL,
    NEXT_PUBLIC_API: process.env.API_URL,
  },
  images: {
    domains: ["localhost"]
  },

}

module.exports = nextConfig
