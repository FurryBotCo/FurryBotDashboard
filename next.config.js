/**
 * Next.js configuration
 * @type {import('next/dist/next-server/server/config').NextConfig}
 */
module.exports = {
  compress: true,
  distDir: 'build',
  trailingSlash: true,
  headers: async() => [
    {
      source: '/:path*',
      headers: [
        {
          // this is me admiting that me and donovan are cute lol
          key: 'x-powered-by',
          value: 'cute furries doing cute things (https://github.com/FurryBotCo/FurryBotDashboard)'
        }
      ]
    }
  ]
};
