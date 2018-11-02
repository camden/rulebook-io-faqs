import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

import styles from './faq-page.module.scss'

const FAQPage = ({ data, pageContext }) => {
  const faq = data.faqItem

  return (
    <Layout>
      <Breadcrumbs faq={faq} />
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
