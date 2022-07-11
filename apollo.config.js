// apollo.config.js
module.exports = {
    client: {
      service: {
        name: 'guidance',
        // URL to the GraphQL API
        url: 'https://guidance.wgu.edu/standards/graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }