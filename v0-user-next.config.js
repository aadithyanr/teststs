/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.firecrawl.dev",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  // Force the App Router to use the filesystem-based routing
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig

