import React, { Component } from 'react'
import { Index } from 'elasticlunr'
import Link from 'components/link'

import styles from './search.module.scss'

type SearchProps = {
  searchIndex: any
}

type SearchState = {
  query: string
  results: [
    {
      id: string
      title: string
      path: string
    }?
  ]
}

export default class Search extends Component<SearchProps, SearchState> {
  index: any

  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.search}
          className={styles.searchInput}
        />
        <ol className={styles.searchResultsBox}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link
                to={'/' + page.path}
                className={styles.searchResultLink}
                onClick={this.handleSearchResultClick.bind(this)}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  handleSearchResultClick() {
    this.setState({ results: [] })
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true })
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
