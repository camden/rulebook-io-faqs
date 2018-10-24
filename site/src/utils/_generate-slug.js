// This file is not using es6 features like "import ... from '...' "
// because it's used in gatsby-node
const slug = require('slug')
const config = require('../../config')

module.exports = function(faq) {
  return slug(faq.question.toLowerCase()).substring(0, config.slugLength)
}
