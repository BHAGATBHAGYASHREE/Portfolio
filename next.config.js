/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false ,
  // Disable development indicators
  
  // Allow CORS for development
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  // Configure allowed dev origins
  allowedDevOrigins: ['http://127.0.0.1:*', 'http://localhost:*'],
  // Configure static file serving
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/static/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/static/media/**',
      },
    ],
  },
  // Handle video files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][ext]'
      }
    });
    return config;
  },
}

module.exports = nextConfig
