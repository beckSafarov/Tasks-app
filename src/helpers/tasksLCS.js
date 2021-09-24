import { updateArr } from '.'

export const getStore = () => {
  const lcs = JSON.parse(localStorage.getItem('tasks'))
  return lcs !== null ? lcs : []
}

export const setStore = (n) => {
  localStorage.setItem('tasks', JSON.stringify(n))
}

export const add = (t) => {
  let store = getStore()
  store.push(t)
  setStore(store)
}

export const update = (n) => setStore(updateArr(getStore(), n))

export const remove = (id) => {
  let store = getStore()
  store = store.filter((t) => t.id !== id)
  setStore(store)
}

// export const findTask = (keyword) => {
//   let res = []
//   const rx = new RegExp(keyword + 'gi')
//   const store = getStore()
//   for (let tag in store) {
//     for (let i = 0; i < tag.length; i++) {
//       if (tag[i].name.match(rx)) res.push(tag[i].name)
//       if (tag[i].description.match(rx)) res.push(tag[i].description)
//     }
//   }
//   return res
// }
