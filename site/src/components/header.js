import React from 'react'
import Link from 'components/link'

import styles from './header.module.scss'

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Link to="/">{siteTitle}</Link>
      </div>

      <div className={styles.search}>Search</div>
    </header>
  )
}

export default Header
