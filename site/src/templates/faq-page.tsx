import React from 'react'
import parseDomain from 'parse-domain'
import { graphql } from 'gatsby'

import Link from 'components/link'
import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

import styles from './faq-page.module.scss'

const FAQPage = ({ data, pageContext }) => {
  const faq = data.faqItem

  console.log(faq)
  return (
    <Layout>
      <Breadcrumbs
        path={[
          {
            title: faq.game,
            link: faq.gameSlug,
          },
          {
            title: faq.question,
          },
        ]}
      />
      <h1>{faq.question}</h1>
      <p>{faq.answer}</p>
      <p>
        {faq.discussion.map(url => (
          <Link to={url} key={url} target={'_blank'}>
            {formatDiscussionLinkTitle(url)}
          </Link>
        ))}
      </p>
    </Layout>
  )
}

const formatDiscussionLinkTitle = url => {
  const domainInfo = parseDomain(url)
  if (!domainInfo) {
    return 'Discussion'
  } else {
    const site = `${domainInfo.domain}.${domainInfo.tld}`
    return `Discussion (${site})`
  }
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
