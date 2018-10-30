import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import styles from './link.module.scss'

const Link = props => {
  return <GatsbyLink {...props} className={styles.link} />
}

export default Link
