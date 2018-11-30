import React, { createElement } from 'react'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'
import Link from 'components/link'

const HeadingButSmallerByOne = ({ level, children }) => {
  const newLevel = Math.min(6, level + 1)
  return createElement(`h${newLevel}`, null, children)
}

const generateHeading = level => ({ children }) => (
  <HeadingButSmallerByOne level={level} children={children} />
)

const renderAst = new rehypeReact({
  createElement,
  components: {
    h1: generateHeading(1),
    h2: generateHeading(2),
    h3: generateHeading(3),
    h4: generateHeading(4),
    h5: generateHeading(5),
    h6: generateHeading(6),
    a: Link,
  },
}).Compiler

const RulebookPage = ({ data }) => {
  const game = data.gamesHJson
  const htmlAst = data.markdownRemark.htmlAst
  const renderedMarkdown = renderAst(htmlAst)
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
      {renderedMarkdown}
    </Layout>
  )
}

export const query = graphql`
  query($gamePath: String!) {
    markdownRemark(frontmatter: { gamePath: { eq: $gamePath } }) {
      htmlAst
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
