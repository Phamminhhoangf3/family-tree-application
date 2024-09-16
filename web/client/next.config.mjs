/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/family-tree-c5d56.appspot.com/**",
      },
    ],
  },
};

export default nextConfig;
