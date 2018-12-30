import React from 'react'

import styles from './table-of-contents.module.scss'
import Link from './link'
import generateId from 'utils/generate-id'

type Heading = {
  depth: number
  value: string
}

const PADDING_PER_DEPTH = 30

const TableOfContents = ({
  headings,
  rootSlug,
}: {
  headings: Heading[]
  rootSlug: string
}) => {
  return (
    <div className={styles.tableOfContents}>
      <h3>Quick Links</h3>
      <ol>
        {headings.filter(h => h.depth == 1).map(heading => (
          <li key={heading.value}>
            <Link
              to={rootSlug + '#' + generateId(heading.value)}
              style={{
                marginLeft: (heading.depth - 1) * PADDING_PER_DEPTH,
                display: 'block',
              }}
            >
              {heading.value}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default TableOfContents
