import React, { SFC } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from 'components/header'
import Footer from 'components/footer'

import styles from './layout.module.scss'
import { Redirect, Match } from '@reach/router'

type LayoutProps = {
  title?: string
  description?: string
}

const ConditionalRedirect = () => {
  return (
    <>
      <Match path="/rules/:game">
        {props =>
          props.match ? (
            <>
              <Helmet>
                <link
                  rel="canonical"
                  href={`https://rulebook.io/games/${props.match.game}/rules`}
                />
              </Helmet>
              <Redirect to={`/games/${props.match.game}/rules`} noThrow />
            </>
          ) : null
        }
      </Match>
      <Match path="/browse">
        {props => (props.match ? <Redirect to={`/`} noThrow /> : null)}
      </Match>
    </>
  )
}

const Layout: SFC<LayoutProps> = ({ children, title, description }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      const baseTitle = data.site.siteMetadata.title
      let pageTitle = baseTitle

      if (title) {
        pageTitle = title + ' — ' + baseTitle
      }

      return (
        <div className={styles.container}>
          <ConditionalRedirect />
          <Helmet title={pageTitle}>
            <html lang="en" />
            <meta
              id="vp"
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} />
            <meta name="google-site-verification" content="PTj25G7uAzvoa3ocORIUcIMlVOG_uwk5uq4ktI6ahHY" />
          </Helmet>
          <div className={styles.header}>
            <Header siteTitle={data.site.siteMetadata.title} />
          </div>
          <div className={styles.children}>{children}</div>
          <div className={styles.footer}>
            <Footer />
          </div>
        </div>
      )
    }}
  />
)

export default Layout
