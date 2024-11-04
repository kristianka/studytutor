/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://ui-avatars.com/api/"
            },
            {
                protocol: "http",
                hostname: "https://ui-avatars.com/api/"
            }
        ]
    }
};

export default nextConfig;
