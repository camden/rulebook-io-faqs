import React from 'react'
import { graphql } from 'gatsby'

import generateSlug from 'utils/generate-slug'
import FAQItem from 'components/faq-item'
import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

const RulebookPage = ({ data }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($gamePath: String!) {
    markdownRemark(frontmatter: { gamePath: { eq: $gamePath } }) {
      html
    }
  }
`

export default RulebookPage
