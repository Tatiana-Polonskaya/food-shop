/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:4200",
    },

    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
