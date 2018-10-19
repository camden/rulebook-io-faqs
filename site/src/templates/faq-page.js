import React from 'react'
import { graphql } from 'gatsby'

const FAQPage = ({ data }) => {
  const page = data.faqsHJson

  return <div>This is a faq page for {page.name}!</div>
}

export const query = graphql`
  query($slug: String!) {
    faqsHJson(fields: { slug: { eq: $slug } }) {
      name
    }
  }
`

export default FAQPage
