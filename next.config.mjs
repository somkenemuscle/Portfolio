/** @type {import('next').NextConfig} */
const nextConfig = {
    // The Highlights page used to be called the Logbook.
    async redirects() {
        return [{ source: '/logbook', destination: '/highlights', permanent: true }];
    },
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
