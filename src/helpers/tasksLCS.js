const defTasks = {
  tag1: [
    {
      id: 'wefef23f23f',
      name: 'efw',
      tag: 'tag1',
      description: 'ewfwfwe',
    },
    {
      id: 'wefefe23f23f',
      name: 'efew',
      tag: 'tag1',
      description: 'ewfwfwe',
    },
  ],
  tag2: [
    {
      id: 'wefef23f2ew3f',
      name: 'efw',
      tag: 'tag2',
      description: 'ewfwfwe',
    },
    {
      id: 'wefeefefe23f23f',
      name: 'efew',
      tag: 'tag2',
      description: 'ewfwfwe',
    },
  ],
}

export const getStore = () => {
  const lcs = JSON.parse(localStorage.getItem('tasks'))
  return lcs !== null ? lcs : []
}

export const setStore = (newStore) =>
  localStorage.setItem('tasks', JSON.stringify(newStore))

export const add = (task, tag = 'untagged') => {
  const store = getStore()
  if (!store[tag]) store[tag] = []
  store[tag].push(task)
  setStore(store)
  return store
}

export const update = (id, tag, newBody) => {
  const allTasks = getStore()
  let task = allTasks[tag].find((t) => t.id === id)
  task = newBody
  setStore(allTasks)
}

export const remove = (id, tag) => {
  const allTasks = getStore()
  let tasks = allTasks[tag]
  tasks = tasks.filter((t) => t.id !== id)
  setStore(allTasks)
}

export const findTask = (keyword) => {
  let res = []
  const rx = new RegExp(keyword + 'gi')
  const store = getStore()
  for (let tag in store) {
    for (let i = 0; i < tag.length; i++) {
      if (tag[i].name.match(rx)) res.push(tag[i].name)
      if (tag[i].description.match(rx)) res.push(tag[i].description)
    }
  }
  return res
}
