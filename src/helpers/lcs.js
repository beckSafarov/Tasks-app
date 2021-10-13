export const getStore = (fallBack = [], store = 'tasks') => {
  const lcs = JSON.parse(localStorage.getItem(store))
  return lcs !== null ? lcs : fallBack
}

export const setStore = (n, store = 'tasks') => {
  localStorage.setItem(store, JSON.stringify(n))
}
