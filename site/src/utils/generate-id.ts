import slug from 'slug'

const generateId = (str: string) => {
  return slug(str.toLowerCase())
}
export default generateId
