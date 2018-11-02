import React from 'react'

import Layout from 'components/layout'

const FAQPage = ({ data, pageContext }) => {
  const faq = pageContext.faq

  return (
    <Layout>
      <h1>{faq.game}</h1>
      <h2>{faq.question}</h2>
      <p>{faq.answer}</p>
    </Layout>
  )
}

export default FAQPage
