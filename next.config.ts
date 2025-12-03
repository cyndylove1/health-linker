import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // Experimental features for better hydration handling
  experimental: {
    optimizePackageImports: ['@tanstack/react-query'],
  },

  // Empty turbopack config to allow webpack config (Next.js 16 requirement)
  turbopack: {},

  // Webpack config for better hydration
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Better hydration error reporting in development
      config.optimization = {
        ...config.optimization,
        concatenateModules: false,
      };
    }
    return config;
  },

  // Headers for better browser extension compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
