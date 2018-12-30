import React, { SFC } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from 'components/header'
import Footer from 'components/footer'

import styles from './layout.module.scss'

type LayoutProps = {
  title?: string
  description?: string
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
          <Helmet title={pageTitle}>
            <html lang="en" />
            <meta
              id="vp"
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} />
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
