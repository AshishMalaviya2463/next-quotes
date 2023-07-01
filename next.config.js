/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [ "mongoose" ]
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: [ "default", "en", "nl", "fr" ],
    defaultLocale: "default",
    localeDetection: false,
  },
  trailingSlash: true,
}

module.exports = nextConfig
