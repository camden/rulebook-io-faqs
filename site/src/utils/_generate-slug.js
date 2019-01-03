// This file is not using es6 features like "import ... from '...' "
// because it's used in gatsby-node
const slug = require('slug')
const config = require('../../config')

module.exports = function(faq) {
  let question = faq.question
  if (faq.permalinkQuestion) {
    question = faq.permalinkQuestion
  }

  return slug(
    question
      .toLowerCase()
      .split(' ')
      .slice(0, config.slugWordLength)
      .join(' ')
  )
}
