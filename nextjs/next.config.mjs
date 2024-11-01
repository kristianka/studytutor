/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    async redirects() {
        return [
            {
                source: "/rss.xml",
                destination: "/api/rss",
                permanent: true
            }
        ];
    },
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
