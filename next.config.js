/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['secure.gravatar.com', 'gitlab.lnu.se'],
  },
}

module.exports = nextConfig
