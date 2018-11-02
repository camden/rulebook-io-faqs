const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const generateSlug = require('./src/utils/_generate-slug')

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

exports.onCreateNode = props => {
  const { node, getNode, actions, createContentDigest, createNodeId } = props
  const { createNodeField } = actions

  if (node.internal.type === `FaqsHJson`) {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({
      node,
      getNode,
      basePath: `faqs`,
      trailingSlash: false,
    })

    node.faqs.forEach(faq => {
      createFaqItemNode(
        props,
        Object.assign({}, faq, {
          game: node.name,
        })
      )
    })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

function createFaqItemNode(
  { actions, createNodeId, createContentDigest },
  data
) {
  const { createNode } = actions

  createNode({
    id: createNodeId(`${data.game}-${data.question}`),
    parent: null,
    children: [],
    question: data.question,
    answer: data.answer,
    game: data.game,
    internal: {
      type: `FaqItem`,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  })
}

exports.createPages = ({
  graphql,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createPage, createNode } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allFaqsHJson {
              edges {
                node {
                  faqs {
                    question
                    answer
                  }
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

        const gamePageTemplate = path.resolve(`src/templates/game-page.js`)
        const faqPageTemplate = path.resolve(`src/templates/faq-page.js`)

        result.data.allFaqsHJson.edges.forEach(({ node }) => {
          const slug = node.fields.slug
          createPage({
            path: slug,
            component: gamePageTemplate,
            context: {
              slug,
            },
          })

          node.faqs.forEach(faq => {
            const faqSlug = generateSlug(faq)
            createPage({
              path: `${slug}/${faqSlug}`,
              component: faqPageTemplate,
              context: {
                slug,
                faq,
              },
            })
          })
        })
      })
    )
  })
}
