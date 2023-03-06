/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    externalResolver: true,
  },
  env: {
    NEXT_PUBLIC_BACK_URI: process.env.BASE_URL,
    NEXT_PUBLIC_API: process.env.API_URL,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
  },
  images: {
    domains: ["localhost", 'unionshop-api.onrender.com']
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://unionshop-git-main-sn1pexx.vercel.app/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ]
  },

}

module.exports = nextConfig
