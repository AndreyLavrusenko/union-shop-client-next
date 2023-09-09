/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config.js')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  api: {
    externalResolver: true,
  },
  env: {
    NEXT_PUBLIC_BACK_URI: process.env.BASE_URL,
    NEXT_PUBLIC_API: process.env.API_URL,
    NEXT_S3_LINK: process.env.NEXT_S3_LINK,
  },
  images: {
    domains: ["localhost", 'unionshop-api.onrender.com', 's3.timeweb.com']
  },
  async headers() {
    return [
      {
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
