import React, { StatelessComponent } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import styles from './link.module.scss'

type LinkProps = {
  className?: string
  to: string
}

const Link: StatelessComponent<LinkProps> = props => {
  let classNamesMerged = `${styles.link} ${props.className}`

  return <GatsbyLink {...props} className={classNamesMerged} />
}

export default Link
