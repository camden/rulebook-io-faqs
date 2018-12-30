import React from 'react'
import { FAQ } from '../types'
import Link from 'components/link'

const FAQItem = ({ faq, slug }: { faq: FAQ; slug: string }) => {
  return (
    <div>
      <span>
        <Link to={slug}>{faq.question}</Link>
      </span>
      <p>{faq.answer}</p>
    </div>
  )
}

export default FAQItem
