import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arbiscan.io',
      },
      {
        protocol: 'https',
        hostname: 'sepolia.arbiscan.io',
      },
    ],
  },
  
  // Webpack configuration for Web3
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Exclude test files and non-source files from bundling
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /node_modules\/thread-stream\/(test|bench\.js|LICENSE)/,
      use: 'null-loader',
    });
    
    return config;
  },
  
  // Turbopack configuration (for dev and build)
  experimental: {
    turbo: {
      rules: {
        '*.test.{js,ts,mjs}': {
          loaders: [],
          as: '*.js',
        },
      },
      resolveAlias: {
        // Prevent Turbopack from processing test utilities
        'tap': false,
        'tape': false,
        'desm': false,
        'fastbench': false,
        'pino-elasticsearch': false,
        'why-is-node-running': false,
      },
    },
  },
};

export default withNextIntl(nextConfig);
