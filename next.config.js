/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    productionBrowserSourceMaps: false,
    async headers() {
      return [
        {
          source: "/(.*)", // Apply to all routes
          headers: [
            {
              key: "Content-Security-Policy",
              value: "frame-ancestors 'self' https://kashi-os.pages.dev;",
            },
          ],
        },
      ];
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/directs",
          permanent: true,
        },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "uploadthing.com",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "img.clerk.com",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "utfs.io",
          pathname: "**",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
  