import React from 'react'

import styles from './header.module.scss'

const Header = ({ siteTitle }) => {
  return <div className={styles.main}>{siteTitle}</div>
}

export default Header
