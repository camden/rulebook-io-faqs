import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from 'components/header'
import Footer from 'components/footer'

import styles from './layout.module.scss'

const Layout = ({ children }) => (
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
    render={data => (
      <div className={styles.container}>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang="en" />
          <meta
            id="vp"
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
        </Helmet>
        <div className={styles.header}>
          <Header siteTitle={data.site.siteMetadata.title} />
        </div>
        <div className={styles.children}>{children}</div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
