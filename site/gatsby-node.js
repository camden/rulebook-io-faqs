const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `FaqsHJson`) {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({
      node,
      getNode,
      basePath: `faqs`,
      trailingSlash: false,
    })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allFaqsHJson {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const faqPageTemplate = path.resolve(`src/templates/game-page.js`)

        result.data.allFaqsHJson.edges.forEach(({ node }) => {
          const slug = node.fields.slug
          createPage({
            path: slug,
            component: faqPageTemplate,
            context: {
              slug,
            },
          })
        })
      })
    )
  })
}
