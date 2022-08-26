/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config){
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    return config
  },
  swcMinify: true,
  images: {
    domains: ["media.rawg.io"],
  },
}

module.exports = nextConfig
