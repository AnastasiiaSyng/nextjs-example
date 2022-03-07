module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/:path*',
       destination: 'http://10.211.55.3:5000/:path*',
      },
    ];
  },
}
