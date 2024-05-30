/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        has: [
          {
            type: 'cookie',
            key: 'auth',
            value: '(?<auth>.+)',
          },
        ],
        permanent: false,
        destination: '/login',
      },
    ];
  },
};

export default nextConfig;
