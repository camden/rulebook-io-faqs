import React from 'react'
import { graphql } from 'gatsby'
import FAQItem from '../components/faq-item'
import generateSlug from '../utils/generate-slug'

const GamePage = ({ data }) => {
  const page = data.faqsHJson

  return (
    <>
      <h1>{page.name}</h1>
      {page.faqs.map(faq => {
        const slug = `${page.fields.slug}/${generateSlug(faq)}`

        return (
          <div key={slug}>
            <FAQItem faq={faq} slug={slug} />
          </div>
        )
      })}
    </>
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

export default GamePage
