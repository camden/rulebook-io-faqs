import React from 'react'

import Link from 'components/link'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <small>
          Rulebook.io FAQs ‒ A website by{' '}
          <Link to="https://cambickel.com" openInNewTab={true}>
            Cam Bickel
          </Link>
          .
        </small>
      </div>
    </footer>
  )
}

export default Footer
