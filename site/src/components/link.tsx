import React, { StatelessComponent } from 'react'
import { Link as GatsbyLink } from 'gatsby'

import styles from './link.module.scss'

type LinkProps = {
  onClick?: () => void
  className?: string
  to: string
}

const Link: StatelessComponent<LinkProps> = props => {
  let classNamesMerged = `${styles.link} ${props.className}`

  const internal = /^\/(?!\/)/.test(props.to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return <GatsbyLink {...props} className={classNamesMerged} />
  }

  return (
    <a href={props.to} {...props} className={classNamesMerged}>
      {props.children}
    </a>
  )
}

export default Link
