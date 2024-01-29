/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'lh3.googleusercontent.com' } // Added comma here
        ]
    },

}

module.exports = nextConfig;
