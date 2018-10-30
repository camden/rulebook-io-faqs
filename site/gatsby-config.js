const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Rulebook.io FAQs',
  },
  plugins: [
    'gatsby-transformer-hjson',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['src'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: path.resolve(`/${__dirname}/../data/`),
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Rulebook.io FAQs',
        start_url: '/',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-offline',
  ],
}
