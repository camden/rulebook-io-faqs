import React, { SFC } from 'react'

import Link from 'components/link'
import SEOBreadcrumbs from 'components/seo-breadcrumbs'
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
  const pathWithAllGames = [
    {
      title: 'All games',
      link: '/',
    },
    ...props.path,
  ]
  return (
    <small className={styles.breadcrumbs}>
      <SEOBreadcrumbs items={pathWithAllGames} />
      <Link to={'/'} className={styles.breadcrumbLink}>
        All games
      </Link>
      {props.path &&
        props.path.map((breadcrumbItem, idx, arr) => (
          <span key={breadcrumbItem.title + ' ' + breadcrumbItem.link}>
            <span className={styles.separator}>›</span>
            {breadcrumbItem.link && idx != arr.length - 1 ? (
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
