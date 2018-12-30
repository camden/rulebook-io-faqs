import React from 'react'
import { graphql } from 'gatsby'
import QueryString from 'query-string'

import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'

import styles from './game-page.module.scss'
import FAQList from 'components/faq-list'
import { FAQ } from 'src/types'
import capitalize from 'utils/capitalize'

type FAQTagPageProps = {
  data: {
    gamesHJson: {
      name: string
      description: string
      faqs: FAQ[]
      fields: {
        slug: string
      }
    }
    markdownRemark: any
  }
}

class FAQTagPage extends React.Component<FAQTagPageProps> {
  getSearchTag(options?: { capitalize: boolean }) {
    const searchQuery = this.props.location.search
    const parsedQuery = QueryString.parse(searchQuery)
    const searchTag = parsedQuery && parsedQuery.tag

    if (options && options.capitalize) {
      return capitalize(searchTag)
    }

    return searchTag
  }

  getFilteredFaqs() {
    const allFaqs = this.props.data.gamesHJson.faqs
    const searchTag = this.getSearchTag()
    if (!searchTag) {
      return allFaqs
    }

    return allFaqs.filter(f => f.tags && f.tags.indexOf(searchTag) !== -1)
  }

  render() {
    const { data } = this.props
    const game = data.gamesHJson

    let pageTitle = 'FAQs'
    if (this.getSearchTag()) {
      pageTitle = `${this.getSearchTag({ capitalize: true })} FAQs`
    }

    let description = `FAQs for ${game.name}.`

    if (this.getSearchTag()) {
      description = `FAQs related to ${this.getSearchTag({
        capitalize: true,
      })} for ${game.name}.`
    }

    return (
      <Layout title={game.name + ' — ' + pageTitle} description={description}>
        <Breadcrumbs
          path={[
            {
              title: game.name,
              link: game.fields.slug,
            },
            {
              title: pageTitle,
            },
          ]}
        />
        <h1>{game.name}</h1>
        {this.getFilteredFaqs().length > 0 ? (
          <FAQList
            faqs={this.getFilteredFaqs()}
            slug={game.fields.slug}
            title={pageTitle}
          />
        ) : (
          <p>No tags found</p>
        )}
      </Layout>
    )
  }
}

export const query = graphql`
  query($shortSlug: String!) {
    markdownRemark(fields: { gameSlug: { eq: $shortSlug } }) {
      fileAbsolutePath
    }

    gamesHJson(fields: { shortSlug: { eq: $shortSlug } }) {
      name
      description
      fields {
        slug
      }
      faqs {
        tags
        question
        answer
      }
    }
  }
`

export default FAQTagPage
