export const getStore = () => {
  const lcs = JSON.parse(localStorage.getItem('tasks'))
  return lcs !== null ? lcs : []
}

export const setStore = (n) => {
  localStorage.setItem('tasks', JSON.stringify(n))
}
