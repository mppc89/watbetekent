/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["watbetekent.vercel.app"],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "production"
        ? "https://watbetekent.vercel.app/api"
        : "http://localhost:3000/api",
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://watbetekent.vercel.app"
        : "http://localhost:3000",
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
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
