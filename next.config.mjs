/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Suppress development mode warnings and Turbopack suggestion
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  experimental: {
    // Disable Turbopack suggestion
    turbotrace: false,
    turbo: {
      enabled: false
    }
  },
  // Hide Next.js logo
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: "bottom-right"
  },
  swcMinify: true,
}

export default nextConfig
