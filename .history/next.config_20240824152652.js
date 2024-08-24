module.exports = {
    // Next.js configuration options
    async rewrites() {
      return [
        {
          source: '/users',
          destination: '/pages/api/users.js',
        },
      ];
    },
  };