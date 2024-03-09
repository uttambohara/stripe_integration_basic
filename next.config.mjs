/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sothebys-md.brightspotcdn.com",
      },
    ],
  },
};

export default nextConfig;
