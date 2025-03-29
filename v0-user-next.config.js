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
  // Remove experimental options that might cause issues
  output: "standalone", // Add this for better Vercel deployment
}

module.exports = nextConfig