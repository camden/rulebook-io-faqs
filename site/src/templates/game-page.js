import React from 'react'
import { graphql } from 'gatsby'

import generateSlug from 'utils/generate-slug'
import FAQItem from 'components/faq-item'
import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

const GamePage = ({ data }) => {
  const game = data.gamesHJson

  return (
    <Layout>
      <Breadcrumbs />
      <h1>{game.name}</h1>
      <p>{game.description}</p>
      {game.faqs.map(faq => {
        const slug = `${game.fields.slug}/${generateSlug(faq)}`

        return (
          <div key={slug}>
            <FAQItem faq={faq} slug={slug} />
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    gamesHJson(fields: { slug: { eq: $slug } }) {
      name
      description
      fields {
        slug
      }
      faqs {
        question
        answer
      }
    }
  }
`

export default GamePage
