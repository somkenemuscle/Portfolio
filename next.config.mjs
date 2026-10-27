/** @type {import('next').NextConfig} */
const nextConfig = {
    // Old addresses: the Highlights page used to be the Logbook, and the
    // Journal used to live at /blog.
    async redirects() {
        return [
            { source: '/logbook', destination: '/highlights', permanent: true },
            { source: '/blog', destination: '/journal', permanent: true },
            { source: '/blog/:slug', destination: '/journal/:slug', permanent: true },
        ];
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
