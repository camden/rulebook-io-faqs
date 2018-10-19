import { FAQ } from '../types'
import slug from 'slug'
import config from 'config'

export default (faq: FAQ) => {
  return slug(faq.question.toLowerCase()).substring(0, config.slugLength)
}
