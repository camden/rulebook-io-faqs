import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = ({ data }) => (
  <Layout>
    <h2>FAQs:</h2>
    {data.allFaqsHJson.edges.map(({ node }) => {
      return (
        <div key={node.id}>
          <Link to={node.fields.slug}>{node.name}</Link>
        </div>
      )
    })}
  </Layout>
)

export const query = graphql`
  query {
    allFaqsHJson {
      edges {
        node {
          name
          id
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
