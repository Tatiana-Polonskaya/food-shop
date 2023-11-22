/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:4200",
    },
    output: "export",
    basePath: "/food-shop",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
