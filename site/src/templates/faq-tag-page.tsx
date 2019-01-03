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
    const searchTag = this.getSearchTag()
    const searchTagCapitalized = this.getSearchTag({ capitalize: true })
    if (searchTag) {
      pageTitle = `${searchTagCapitalized} FAQs`
    }

    let description = `FAQs for ${game.name}.`

    if (searchTag) {
      description = `FAQs related to ${searchTagCapitalized} for ${game.name}.`
    }

    const query = searchTag ? `?tag=${searchTag}` : ''
    const currentPageSlug = `${game.fields.slug}/tags${query}`

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
              link: currentPageSlug,
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
