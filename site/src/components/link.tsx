import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

import styles from './link.module.scss'

const Link = props => {
  let classNamesMerged = `${styles.link} ${props.className}`

  return <GatsbyLink {...props} className={classNamesMerged} />
}

export default Link
