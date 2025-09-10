// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // WebP-first optimization
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 600,
    // Local patterns - UPDATED to include root public folder
    localPatterns: [
      {
        pathname: '/new%20images/**', // Your existing pattern for product images
        search: '',
      },
      {
        pathname: '/**', // ADD THIS: Allow all images from public folder
        search: '',
      },
    ],
  },
  // Memory optimization
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
