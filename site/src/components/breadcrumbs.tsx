import React, { SFC } from 'react'

import Link from 'components/link'
import truncateTitle from 'utils/truncate-title'

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

export default Breadcrumbs
