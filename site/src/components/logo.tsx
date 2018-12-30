import React from 'react'

import Link from 'components/link'

import styles from './logo.module.scss'

const Logo = () => {
  return (
    <div className={styles.title}>
      <Link to="/" className={styles.text}>
        Rulebook.io
      </Link>
    </div>
  )
}

export default Logo
