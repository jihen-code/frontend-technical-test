/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15 now uses app directory by default
  // We're keeping pages directory for backward compatibility
  // but can migrate to app directory later
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Modern i18n config
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/conversations",
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
