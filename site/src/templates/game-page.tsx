import React from 'react'
import { graphql } from 'gatsby'

import generateSlug from 'utils/generate-slug'
import FAQItem from 'components/faq-item'
import Layout from 'components/layout'
import Breadcrumbs from 'components/breadcrumbs'
import Link from 'components/link'
import config from '../../config'

import styles from './game-page.module.scss'

const GamePage = ({ data }) => {
  const game = data.gamesHJson
  const rulebook = data.markdownRemark

  return (
    <Layout title={game.name}>
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
        <div className={styles.infoItem}>
          <Link to="/">BoardGameGeek Page</Link>
        </div>
        <div className={styles.infoItem}>
          <Link to="/">Buy {game.name} on Amazon</Link>
        </div>
      </div>
      <p className={styles.description}>{game.description}</p>
      {game.faqs.map(faq => {
        const slug = `${game.fields.slug}/${generateSlug(faq)}`

        return (
          <div key={slug} className={styles.faqContainer}>
            <FAQItem faq={faq} slug={slug} />
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query($shortSlug: String!) {
    markdownRemark(frontmatter: { gamePath: { eq: $shortSlug } }) {
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
