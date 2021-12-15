export const getStore = (store, fallBack = []) => {
  const lcs = JSON.parse(localStorage.getItem(store))
  return lcs !== null ? lcs : fallBack
}

export const setStore = (store, n) =>
  localStorage.setItem(store, JSON.stringify(n))
