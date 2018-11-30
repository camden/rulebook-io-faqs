const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const generateSlug = require('./src/utils/_generate-slug')
const config = require('./config')

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

  if (node.internal.type === `GamesHJson`) {
    const fileNode = getNode(node.parent)
    const filePath = createFilePath({
      node,
      getNode,
      trailingSlash: false,
    })

    const slug = '/' + config.gamesPrefix + filePath

    if (node.faqs) {
      node.faqs.forEach(faq => {
        createFaqItemNode(
          props,
          Object.assign({}, faq, {
            game: node.name,
            gameSlug: slug,
          }),
          node.id
        )
      })
    }

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // remove the leading slash
    const shortSlug = filePath.slice(1)

    createNodeField({
      node,
      name: `shortSlug`,
      value: shortSlug,
    })
  }
}

function createFaqItemNode(
  { actions, createNodeId, createContentDigest },
  data,
  parentId
) {
  const { createNode } = actions

  const faqSlug = generateSlug(data)

  createNode({
    id: createNodeId(`${data.game}-${data.question}-${data.answer}`),
    parent: parentId,
    children: [],
    question: data.question,
    answer: data.answer,
    game: data.game,
    gameSlug: data.gameSlug,
    discussion: data.discussion,
    slug: `${data.gameSlug}/${faqSlug}`,
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
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    gamePath
                  }
                }
              }
            }
            allGamesHJson {
              edges {
                node {
                  faqs {
                    question
                    answer
                  }
                  fields {
                    slug
                    shortSlug
                  }
                }
              }
            }
            allFaqItem {
              edges {
                node {
                  question
                  answer
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          return reject(result.errors)
        }

        const gamePageTemplate = path.resolve(`src/templates/game-page.tsx`)
        const faqPageTemplate = path.resolve(`src/templates/faq-page.tsx`)
        const rulebookPageTemplate = path.resolve(
          `src/templates/rulebook-page.tsx`
        )

        const { allGamesHJson, allFaqItem, allMarkdownRemark } = result.data
        const games = allGamesHJson.edges

        games.forEach(({ node }) => {
          const slug = node.fields.slug
          const shortSlug = node.fields.shortSlug

          createPage({
            path: slug,
            component: gamePageTemplate,
            context: {
              shortSlug,
            },
          })
        })

        const faqs = allFaqItem.edges

        faqs.forEach(({ node: faq }) => {
          createPage({
            path: faq.slug,
            component: faqPageTemplate,
            context: {
              slug: faq.slug,
            },
          })
        })

        const markdownPages = allMarkdownRemark.edges

        markdownPages.forEach(({ node: rulebookPage }) => {
          const gamePath = rulebookPage.frontmatter.gamePath
          createPage({
            path:
              config.gamesPrefix + '/' + gamePath + '/' + config.rulesSuffix,
            component: rulebookPageTemplate,
            context: {
              gamePath: gamePath,
            },
          })
        })
      })
    )
  })
}
