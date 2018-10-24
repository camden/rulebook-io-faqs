import { FAQ } from '../types'
import generateSlug from './_generate-slug'

export default (faq: FAQ): string => {
  return generateSlug(faq)
}
