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
  searchRef: any
  searchResultsRef: any

  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }

    this.searchRef = React.createRef()
    this.searchResultsRef = React.createRef()
    this.handleSearchResultClick = this.handleSearchResultClick.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick, false)
  }

  handleDocumentClick(e) {
    const mouseNotInSearch = !(
      this.searchRef.current.contains(e.target) ||
      this.searchResultsRef.current.contains(e.target)
    )

    if (mouseNotInSearch) {
      this.setState({
        results: [],
      })
    }
  }

  handleFocus(e) {
    e.target.select()
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.search}
          onClick={this.search}
          onFocus={this.handleFocus}
          className={styles.searchInput}
          ref={this.searchRef}
          placeholder={'Search...'}
        />
        <ol className={styles.searchResultsBox} ref={this.searchResultsRef}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link
                to={'/' + page.path}
                className={styles.searchResultLink}
                onClick={this.handleSearchResultClick}
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
