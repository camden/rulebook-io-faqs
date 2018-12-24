import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/layout'
import Link from 'components/link'

const alphabeticalSort = (_a, _b) => {
  const a = _a.node
  const b = _b.node
  return a.name.localeCompare(b.name)
}

const IndexPage = ({ data }) => (
  <Layout>
    <h2>All Games:</h2>
    {data.allGamesHJson.edges.sort(alphabeticalSort).map(({ node }) => {
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
