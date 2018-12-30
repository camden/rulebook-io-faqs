import React from 'react'
import Layout from 'components/layout'
import Link from 'components/link'

const AddFaqPage = () => (
  <Layout title={'How to Add New Content'}>
    <h1>How to Add New Content</h1>
    <p>
      There's no formal process in place (yet) to easily add new rulebooks/FAQs.
    </p>
    <p>
      In the meantime, reach out to me on Twitter at{' '}
      <Link openInNewTab={true} to="https://twitter.com/camdenbickel">
        @camdenbickel
      </Link>{' '}
      with any ideas for new games/rulebooks/FAQs (or any other suggestions).
    </p>
  </Layout>
)

export default AddFaqPage
