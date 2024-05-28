// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ["utfs.io", "nextjs.org"],
    // Add more domains if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "nextjs.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;
