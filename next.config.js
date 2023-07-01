/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: [ "mongoose" ]
  },
  async headers () {
    return [
      {
        source: '/api/quotes/all',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
