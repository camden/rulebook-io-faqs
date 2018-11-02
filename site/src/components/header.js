import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'components/link'
import Search from 'components/search'

import styles from './header.module.scss'

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Link to="/">{siteTitle}</Link>
      </div>

      <StaticQuery
        query={graphql`
          query SearchIndexQuery {
            siteSearchIndex {
              index
            }
          }
        `}
        render={data => <Search searchIndex={data.siteSearchIndex.index} />}
      />
    </header>
  )
}

export default Header
