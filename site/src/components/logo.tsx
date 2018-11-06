import React from 'react'

import Link from 'components/link'

import styles from './logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.title}>
      <Link to="/" className={styles.text}>
        Rulebook.io <span className={styles.emphasis}>FAQs</span>
      </Link>
    </div>
  )
}

export default Logo
