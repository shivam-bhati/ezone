const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 600,
    localPatterns: [
      {
        pathname: '/new%20images/**',
        search: '',
      },
      {
        pathname: '/**',
        search: '',
      },
    ],
    domains: ['images.unsplash.com'],  // Add this line here
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
