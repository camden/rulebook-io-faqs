const truncateTitle = (title: string) => {
  const WORD_LIMIT = 10
  const smallerTitle = title
    .split(' ')
    .slice(0, WORD_LIMIT)
    .join(' ')

  if (smallerTitle === title) {
    return title
  } else {
    return smallerTitle + '...'
  }
}

export default truncateTitle
