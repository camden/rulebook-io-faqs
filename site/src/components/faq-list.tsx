import React from 'react'
import { FAQ } from '../types'
import generateSlug from 'utils/generate-slug'
import FAQItem from 'components/faq-item'

import styles from './faq-list.module.scss'

const FAQList = ({
  title,
  faqs,
  slug,
}: {
  title: string
  faqs: FAQ[]
  slug: string
}) => {
  if (faqs.length === 0) {
    return null
  }

  return (
    <>
      <h2>{title}</h2>
      {faqs.map(faq => {
        const faqSlug = `${slug}/${generateSlug(faq)}`

        return (
          <div key={faqSlug} className={styles.faqContainer}>
            <FAQItem faq={faq} slug={faqSlug} />
          </div>
        )
      })}
    </>
  )
}

export default FAQList
