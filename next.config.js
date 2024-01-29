/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'lh3.googleusercontent.com' } // Added comma here
        ]
    },
    experimental:{
        serverActions:{
            allowedOrigins:['my-proxy.com', '*my-proxy.com']
        }
    }

}

module.exports = nextConfig;
