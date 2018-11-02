import React from 'react'
import Link from 'components/link'

import styles from './breadcrumbs.module.scss'

const Breadcrumbs = props => {
  const { faq } = props
  return (
    <div className={styles.breadcrumbs}>
      <Link to={'/'} className={styles.breadcrumbLink}>
        ← All games
      </Link>
      {faq && (
        <Link to={faq.gameSlug} className={styles.breadcrumbLink}>
          ← {faq.game}
        </Link>
      )}
    </div>
  )
}

export default Breadcrumbs
