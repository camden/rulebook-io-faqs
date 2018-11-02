import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'

const FAQPage = ({ data, pageContext }) => {
  const faq = data.faqItem

  return (
    <Layout>
      <h1>{faq.game}</h1>
      <h2>{faq.question}</h2>
      <p>{faq.answer}</p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    faqItem(slug: { eq: $slug }) {
      game
      question
      answer
      discussion
    }
  }
`

export default FAQPage
