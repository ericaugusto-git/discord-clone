/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: false,
    async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/directs',
            permanent: true,
          },
        ]
    },
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'uploadthing.com',
            pathname: '**'
        },
            {
            protocol: 'https',
            hostname: 'img.clerk.com',
            pathname: '**'
        },
            {
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '**'
        }
    ]
    }
}

module.exports = nextConfig
