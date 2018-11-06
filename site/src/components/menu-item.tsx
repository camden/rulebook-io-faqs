import React from 'react'

import Link from 'components/link'

import styles from './menu-item.module.scss'

const MenuItem = ({ name, to }) => {
  return (
    <div className={styles.container}>
      <Link to={to} className={styles.text}>
        {name}
      </Link>
    </div>
  )
}

export default MenuItem
