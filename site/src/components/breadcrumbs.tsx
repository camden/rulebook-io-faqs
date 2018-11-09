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
                {breadcrumbItem.title}
              </Link>
            ) : (
              <span className={styles.breadcrumbLink}>
                {breadcrumbItem.title}
              </span>
            )}
          </span>
        ))}
    </small>
  )
}

export default Breadcrumbs
