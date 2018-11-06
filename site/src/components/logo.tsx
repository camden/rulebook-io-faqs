import React from 'react'

import Link from 'components/link'

import styles from './logo.module.scss'

const Logo = ({ title }) => {
  return (
    <div className={styles.title}>
      <Link to="/" className={styles.text}>
        {title}
      </Link>
    </div>
  )
}

export default Logo
