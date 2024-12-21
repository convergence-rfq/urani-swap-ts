/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'gateway.irys.xyz',
      'raw.githubusercontent.com',
      'coin-images.coingecko.com'
    ],
    unoptimized: true,
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https: http:; frame-src 'self' https: http:;"
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig 