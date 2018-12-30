const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Rulebook.io',
  },
  pathPrefix: `/rulebook-faqs`,
  plugins: [
    'gatsby-transformer-hjson',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-71680879-5',
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ['src'],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `games`,
        path: path.resolve(`/${__dirname}/../data/rulebooks`),
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rulebooks`,
        path: path.resolve(`/${__dirname}/../data/games`),
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
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: ['title', 'question'],
        resolvers: {
          GamesHJson: {
            title: node => node.name,
            path: node => node.fields.slug,
          },
          FaqItem: {
            title: node => node.question,
            question: node => node.question,
            answer: node => node.answer,
            path: node => node.slug,
            game: node => node.game,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Rulebook.io',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-offline',
  ],
}
