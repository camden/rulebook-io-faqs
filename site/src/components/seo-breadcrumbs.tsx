import React from 'react'
import Helmet from 'react-helmet'

export type PathItem = {
  title: string
  link?: string
}

const SEOBreadcrumbs = ({ items }: { items: PathItem[] }) => {
  return (
    <Helmet>
      <script type="application/ld+json">{getJSONLDContent({ items })}</script>
    </Helmet>
  )
}

const getJSONLDContent = ({ items }: { items: PathItem[] }) => {
  const data = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      item: `https://rulebook.io${item.link}`,
    })),
  }

  return JSON.stringify(data)
}

export default SEOBreadcrumbs
