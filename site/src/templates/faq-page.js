import React from 'react'
import { graphql } from 'gatsby'

import Link from 'components/link'
import Layout from 'components/layout'

const FAQPage = ({ data, pageContext }) => {
  const faq = data.faqItem

  return (
    <Layout>
      <h3>
        <Link to={faq.gameSlug}>← {faq.game}</Link>
      </h3>
      <h1>{faq.question}</h1>
      <p>{faq.answer}</p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    faqItem(slug: { eq: $slug }) {
      game
      gameSlug
      question
      answer
      discussion
    }
  }
`

export default FAQPage
