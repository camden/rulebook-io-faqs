import React from 'react'
import { graphql } from 'gatsby'

import generateSlug from 'utils/generate-slug'
import FAQItem from 'components/faq-item'
import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

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
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($gamePath: String!) {
    markdownRemark(frontmatter: { gamePath: { eq: $gamePath } }) {
      html
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
