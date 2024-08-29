/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com'
            },
            {
                protocol: 'https',
                hostname: 'framerusercontent.com'
            }
        ],
    },
};

export default nextConfig;
