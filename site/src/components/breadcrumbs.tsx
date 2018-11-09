import React, { SFC } from 'react'
import Link from 'components/link'

import styles from './breadcrumbs.module.scss'

type BreadcrumbsProps = {
  path: [
    {
      title: string
      link?: string
    }
  ]
}

const Breadcrumbs: SFC<BreadcrumbsProps> = props => {
  return (
    <small className={styles.breadcrumbs}>
      <Link to={'/'} className={styles.breadcrumbLink}>
        All games
      </Link>
      {props.path &&
        props.path.map(breadcrumbItem => (
          <span key={breadcrumbItem.title + ' ' + breadcrumbItem.link}>
            <span className={styles.separator}>›</span>
            {breadcrumbItem.link ? (
              <Link to={breadcrumbItem.link} className={styles.breadcrumbLink}>
                {truncateTitle(breadcrumbItem.title)}
              </Link>
            ) : (
              <span className={styles.breadcrumbLink}>
                {truncateTitle(breadcrumbItem.title)}
              </span>
            )}
          </span>
        ))}
    </small>
  )
}

const truncateTitle = title => {
  const WORD_LIMIT = 10
  const smallerTitle = title
    .split(' ')
    .slice(0, WORD_LIMIT)
    .join(' ')

  if (smallerTitle === title) {
    return title
  } else {
    return smallerTitle + '...'
  }
}

export default Breadcrumbs
