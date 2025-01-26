/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/woorden",
        destination: "/woorden", // Dit verwijst automatisch naar app/woorden
      },
    ];
  },
};

export default nextConfig;
