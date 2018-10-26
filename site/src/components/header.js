import React from 'react'

import styles from './header.module.scss'

const Header = ({ siteTitle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{siteTitle}</div>
      <div className={styles.search}>Search</div>
    </div>
  )
}

export default Header
