/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.dev.hellobot.co', 'media.hellobot.co', 'picsum.photos'],
  },
};

module.exports = nextConfig;
