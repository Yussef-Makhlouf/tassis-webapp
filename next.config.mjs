import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ik.imagekit.io'],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
  webpack: (config) => {
    config.optimization.moduleIds = 'deterministic';
    return config;
  },
};

// Analyze bundle if ANALYZE is set
const analyzeBundleConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

// Export the final config with all enhancements
export default withNextIntl(analyzeBundleConfig);
