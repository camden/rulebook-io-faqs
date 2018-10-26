import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const FAQPage = ({ data, pageContext }) => {
  const page = data.faqsHJson
  const faq = pageContext.faq

  return (
    <Layout>
      <h1>{page.name}</h1>
      <h2>{faq.question}</h2>
      <p>{faq.answer}</p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    faqsHJson(fields: { slug: { eq: $slug } }) {
      name
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

export default FAQPage
