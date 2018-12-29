import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'
import Link from 'components/link'
import config from '../../config'

import styles from './game-page.module.scss'
import FAQList from 'components/faq-list'
import { FAQ } from 'src/types'
import capitalize from 'utils/capitalize'

type GamePageProps = {
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

class GamePage extends React.Component<GamePageProps> {
  renderLinkToRulebook(title) {
    return (
      <Link
        to={this.props.data.gamesHJson.fields.slug + '/' + config.rulesSuffix}
      >
        {title}
      </Link>
    )
  }

  renderBGGLink() {
    return (
      <div className={styles.infoItem}>
        <Link to="/">View on BoardGameGeek</Link>
      </div>
    )
  }

  renderAmazonLink() {
    return (
      <div className={styles.infoItem}>
        <Link to="https://amazon.com" openInNewTab={true}>
          Buy {this.props.data.gamesHJson.name} on Amazon
        </Link>
      </div>
    )
  }

  renderTags() {
    const faqs = this.props.data.gamesHJson.faqs
    const tagsWithDupes = faqs
      .map(f => f.tags)
      .filter(x => x)
      .reduce((a, b) => a.concat(b), [])
    const tagFrequency = tagsWithDupes.reduce((frq, cur) => {
      const existingFrequency = frq[cur]
      if (existingFrequency) {
        return {
          ...frq,
          [cur]: existingFrequency + 1,
        }
      } else {
        return {
          ...frq,
          [cur]: 1,
        }
      }
    }, {})
    const tags = Array.from(new Set(tagsWithDupes)).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    )

    if (!tags || tags.length === 0) {
      return null
    }

    return (
      <div className={styles.tagList}>
        <h2>FAQs by Tag</h2>
        <ul>
          {tags.map(tag => (
            <li key={tag}>
              <Link
                to={this.props.data.gamesHJson.fields.slug + `/tags?tag=${tag}`}
              >
                {capitalize(tag)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const { data } = this.props
    const game = data.gamesHJson
    const rulebook = data.markdownRemark

    return (
      <Layout title={game.name + ' FAQ and Rules'}>
        <Breadcrumbs
          path={[
            {
              title: game.name,
              link: game.fields.slug,
            },
          ]}
        />
        <h1>{game.name}</h1>
        <div className={styles.info}>
          {rulebook ? (
            <div className={styles.infoItem}>
              {this.renderLinkToRulebook(`${game.name} Rulebook`)}
            </div>
          ) : null}
        </div>
        <div className={styles.summary}>
          <h2>Summary</h2>
          <p className={styles.description}>{game.description}</p>
          {rulebook ? (
            <>{this.renderLinkToRulebook('View full rules')}</>
          ) : null}
        </div>
        {this.renderTags()}
        <FAQList faqs={game.faqs} slug={game.fields.slug} title={'All FAQs'} />
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

export default GamePage
