/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'swiperjs.com',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;
