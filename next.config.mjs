/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["watbetekent.vercel.app"],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/woorden",
        destination: "/woorden",
      },
    ];
  },
};

export default nextConfig;
