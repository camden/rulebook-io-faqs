import React from 'react'

import styles from './header.module.scss'

const Header = ({ siteTitle }) => {
  return (
    <header className={styles.container}>
      <div className={styles.title}>{siteTitle}</div>
      <div className={styles.search}>Search</div>
    </header>
  )
}

export default Header
