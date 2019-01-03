import React, { createElement } from 'react'
import { graphql } from 'gatsby'
import rehypeReact from 'rehype-react'

import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'
import Link from 'components/link'

import styles from './rulebook-page.module.scss'
import TableOfContents from 'components/table-of-contents'
import generateId from 'utils/generate-id'

const HeadingButSmallerByOne = ({ level, children }) => {
  const newLevel = Math.min(6, level + 1)
  const id = generateId(String(children))
  return createElement(`h${newLevel}`, { id }, children)
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
  const headings = data.markdownRemark.headings
  const renderedMarkdown = renderAst(htmlAst)

  return (
    <Layout title={game.name + ' Rules'} description={game.description}>
      <Breadcrumbs
        path={[
          {
            title: game.name,
            link: game.fields.slug,
          },
          {
            title: 'Rulebook',
            link: game.fields.slug + '/rules',
          },
        ]}
      />
      <div>
        <h1>{game.name} Rulebook</h1>
        <TableOfContents
          headings={headings}
          rootSlug={game.fields.slug + '/rules'}
        />
        {renderedMarkdown}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($gameSlug: String!) {
    markdownRemark(fields: { gameSlug: { eq: $gameSlug } }) {
      htmlAst
      headings {
        depth
        value
      }
    }

    gamesHJson(fields: { shortSlug: { eq: $gameSlug } }) {
      name
      description
      fields {
        slug
      }
    }
  }
`

export default RulebookPage
