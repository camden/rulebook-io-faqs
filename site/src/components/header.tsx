import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Search from 'components/search'
import Logo from 'components/logo'
import MenuItem from 'components/menu-item'

import styles from './header.module.scss'

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Logo title={siteTitle} />
      </div>

      <div className={styles.search}>
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
      </div>

      <div className={styles.menuItems}>
        <MenuItem name="Add a FAQ" to="/add-new-faq" />
      </div>
    </header>
  )
}

export default Header
