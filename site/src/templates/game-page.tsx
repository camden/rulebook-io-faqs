import React from 'react'
import { graphql } from 'gatsby'

import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'
import Link from 'components/link'
import config from '../../config'

import styles from './game-page.module.scss'
import FAQList from 'components/faq-list'

const GamePage = ({ data }) => {
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
            <Link to={game.fields.slug + '/' + config.rulesSuffix}>
              {game.name} Rulebook
            </Link>
          </div>
        ) : null}
        {/* <div className={styles.infoItem}>
          <Link to="/">BoardGameGeek</Link>
        </div> */}
        {/* <div className={styles.infoItem}>
          <Link to="https://amazon.com" openInNewTab={true}>
            Buy {game.name} on Amazon
          </Link>
        </div> */}
      </div>
      <p className={styles.description}>{game.description}</p>
      <FAQList faqs={game.faqs} slug={game.fields.slug} title={'FAQs'} />
    </Layout>
  )
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
        question
        answer
      }
    }
  }
`

export default GamePage
