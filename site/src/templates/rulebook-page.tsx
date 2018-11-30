import React, { createElement } from 'react'
import { graphql } from 'gatsby'
import Markdown from 'react-markdown'

import generateSlug from 'utils/generate-slug'
import FAQItem from 'components/faq-item'
import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

const HeadingButSmallerByOne = ({ level, children }) => {
  const newLevel = Math.min(6, level + 1)
  return createElement(`h${newLevel}`, null, children)
}

const rulebookMarkdownRenderers = {
  heading: HeadingButSmallerByOne,
}

const RulebookPage = ({ data }) => {
  const game = data.gamesHJson
  return (
    <Layout>
      <Breadcrumbs
        path={[
          {
            title: game.name,
            link: game.fields.slug,
          },
          {
            title: 'Rulebook',
          },
        ]}
      />
      <h1>{game.name} Rulebook</h1>
      <Markdown
        source={data.markdownRemark.rawMarkdownBody}
        escapeHtml={false}
        renderers={rulebookMarkdownRenderers}
      />
    </Layout>
  )
}

export const query = graphql`
  query($gamePath: String!) {
    markdownRemark(frontmatter: { gamePath: { eq: $gamePath } }) {
      rawMarkdownBody
    }

    gamesHJson(fields: { shortSlug: { eq: $gamePath } }) {
      name
      fields {
        slug
      }
    }
  }
`

export default RulebookPage
