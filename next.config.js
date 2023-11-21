/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:4200",
    },
    output: "standalone",
};

module.exports = nextConfig;
