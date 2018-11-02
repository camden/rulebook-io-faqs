import React from 'react'
import { graphql } from 'gatsby'

import Link from 'components/link'
import Layout from 'components/layout'

import styles from './faq-page.module.scss'

const FAQPage = ({ data, pageContext }) => {
  const faq = data.faqItem

  return (
    <Layout>
      <Link to={faq.gameSlug} className={styles.gameLink}>
        ← {faq.game}
      </Link>
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
