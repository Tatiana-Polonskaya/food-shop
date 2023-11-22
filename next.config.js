/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "https://json-server-snowy-beta.vercel.app",
    },
    output: "standalone",
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
