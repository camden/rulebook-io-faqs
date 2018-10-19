import React from 'react'
import { graphql } from 'gatsby'
import FAQ from '../components/faq'

const FAQPage = ({ data }) => {
  const page = data.faqsHJson

  return (
    <>
      <h1>{page.name}</h1>
      {page.faqs.map(faq => {
        return <FAQ {...faq} />
      })}
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    faqsHJson(fields: { slug: { eq: $slug } }) {
      name
      faqs {
        question
        answer
      }
    }
  }
`

export default FAQPage
