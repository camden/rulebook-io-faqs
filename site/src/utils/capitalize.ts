const capitalizeWord = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const capitalize = (str: string) => {
  return str
    .split(' ')
    .map(capitalizeWord)
    .join(' ')
}

export default capitalize
