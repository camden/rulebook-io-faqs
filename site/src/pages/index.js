import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Link from 'components/link'

const IndexPage = ({ data }) => (
  <Layout>
    <h2>FAQs:</h2>
    {data.allGamesHJson.edges.map(({ node }) => {
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
    allGamesHJson {
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
