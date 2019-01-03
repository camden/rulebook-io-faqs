import React from 'react'
import Helmet from 'react-helmet'

const SEOFaqPage = ({
  question,
  answer,
  slug,
}: {
  question: string
  answer: string
  slug: string
}) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {getJSONLDContent({ question, answer, slug })}
      </script>
    </Helmet>
  )
}

const getJSONLDContent = ({
  question,
  answer,
  slug,
}: {
  question: string
  answer: string
  slug: string
}) => {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: question,
      answerCount: 1,
      dateCreated: '2016-07-23T21:11Z',
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
        url: `https://rulebook.io${slug}`,
      },
    },
  }

  return JSON.stringify(data)
}

export default SEOFaqPage
