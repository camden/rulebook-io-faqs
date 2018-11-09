import React, { SFC } from 'react'

import Link from 'components/link'

import styles from './search-result.module.scss'

type SearchResultProps = {
  linkTo: string
  onClick?: () => void
  title: string
  gameTitle: string
}

const SearchResult: SFC<SearchResultProps> = props => {
  return (
    <Link
      className={styles.searchResultLink}
      to={props.linkTo}
      onClick={props.onClick}
    >
      <div className={styles.title}>{props.title}</div>
      <small className={styles.subtitle}>{props.gameTitle}</small>
    </Link>
  )
}

export default SearchResult
