export const getStore = () => {
  const lcs = JSON.parse(localStorage.getItem('tags'))
  return lcs !== null ? lcs : {}
}

export const setStore = (n) => {
  localStorage.setItem('tags', JSON.stringify(n))
}
