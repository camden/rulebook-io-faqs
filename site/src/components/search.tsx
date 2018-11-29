import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { Index } from 'elasticlunr'
import { FaSearch } from 'react-icons/fa'

import SearchResult from 'components/search-result'

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
      game: string
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
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentWillMount() {
    typeof document !== 'undefined' &&
      document.addEventListener('mousedown', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    typeof document !== 'undefined' &&
      document.removeEventListener('mousedown', this.handleDocumentClick, false)
  }

  handleDocumentClick(e) {
    if (!this.searchRef.current || !this.searchResultsRef.current) {
      return
    }

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

  handleSearchResultClick() {
    this.setState({ results: [] })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.results.length > 0) {
      navigate(this.state.results[0].path)
    }
  }

  render() {
    return (
      <div className={styles.searchContainer}>
        <div className={styles.searchInputContainer}>
          <label className={styles.searchIcon} htmlFor="search-input">
            <FaSearch />
          </label>
          <input
            id="search-input"
            type="text"
            value={this.state.query}
            onChange={this.search}
            onClick={this.search}
            onKeyPress={this.handleKeyPress}
            onFocus={this.handleFocus}
            className={styles.searchInput}
            ref={this.searchRef}
            placeholder={'Find games, questions, answers...'}
          />
        </div>
        <ol className={styles.searchResultsBox} ref={this.searchResultsRef}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <SearchResult
                linkTo={page.path}
                onClick={this.handleSearchResultClick}
                title={page.title}
                gameTitle={page.game}
              />
            </li>
          ))}
        </ol>
      </div>
    )
  }

  getOrCreateIndex = () =>
    this.index ? this.index : Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      results: this.index
        .search(query, { expand: true, bool: 'AND' })
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}
