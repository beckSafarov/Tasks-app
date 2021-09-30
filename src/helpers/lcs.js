const getStore = (fallBack = [], store = 'tasks') => {
  const lcs = JSON.parse(localStorage.getItem(store))
  return lcs !== null ? lcs : fallBack
}

const setStore = (n, store = 'tasks') => {
  localStorage.setItem(store, JSON.stringify(n))
}

const defaultPrefs = {
  showCompletedTasks: false,
  sortType: 'none',
  sidebarTagsToggle: false,
}

export const getTasks = () => getStore()
export const setTasks = (n) => setStore(n)
export const getTags = () => getStore({}, 'tags')
export const setTags = (n) => setStore(n, 'tags')
export const getPreferences = () => getStore(defaultPrefs, 'preferences')
export const setPreferences = (n) => setStore(n, 'preferences')

// export default lcs = {
//   getTasks: () => getStore(),
//   setTasks: (n) => setStore(n),
//   getTags: () => getStore(false, 'tags'),
//   setTags: (n) => setStore(n, 'tags'),
//   getPreferences: () => getStore(false, 'preferences'),
//   setPreferences: (n) => setStore(n, 'preferences'),
// }
