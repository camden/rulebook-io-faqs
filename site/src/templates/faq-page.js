import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'

const FAQPage = ({ data, pageContext }) => {
  const faq = data.faqItem

  return (
    <Layout>
      <h2>{faq.game}</h2>
      <h1>{faq.question}</h1>
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
