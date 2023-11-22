/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:4200",
    },
    basePath: "/food-shop",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
