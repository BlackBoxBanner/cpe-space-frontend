/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				hostname: process.env.NEXT_PUBLIC_BACKEND_HOSTNAME,
			},
		],
	},
};

export default nextConfig;
