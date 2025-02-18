/** @type {import('next').NextConfig} */
import path from 'path'
const nextConfig = {
  reactStrictMode: true,
  webpack: (config: { resolve: { alias: any } }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    }
    return config
  }
}

export default nextConfig