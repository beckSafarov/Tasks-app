const sampleTasks = [
  { id: 1, done: true, tag: 'untagged' },
  { id: 2, done: false, tag: 'untagged' },
  { id: 3, done: true, tag: 'untagged' },
  { id: 4, done: false, tag: 'untagged' },
  { id: 5, done: true, tag: 'work' },
  { id: 6, done: false, tag: 'work' },
  { id: 7, done: true, tag: 'work' },
  { id: 8, done: false, tag: 'work' },
  { id: 9, done: true, tag: 'work' },
]

export const capitalize = (w) => w.charAt(0).toUpperCase() + w.slice(1)

// console.log(capitalize('ewfew'))
export const isEmpty = (obj) => Object.keys(obj).length < 1

export const objSize = (obj) => Object.keys(obj).length

export const objToArr = (obj) => {
  let res = []
  Object.keys(obj).map((tag) => res.push(...obj[tag]))

  return res
}

export const groupByTag = (arr = []) => {
  let res = {}
  arr.forEach((curr) => {
    if (!res[curr.tag]) res[curr.tag] = []
    res[curr.tag].push(curr)
  })
  return res
}

export const categorize = (arr = []) => {
  let res = {}
  arr.forEach((curr) => {
    if (!res[curr.tag]) {
      res[curr.tag] = {
        dones: [],
        undones: [],
      }
    }
    res[curr.tag][curr.done ? 'dones' : 'undones'].push(curr)
  })
  return res
}

const arr1 = [
  { tag: 'a', id: 1 },
  { tag: 'a', id: 2 },
  { tag: 'b', id: 3 },
  { tag: 'b', id: 4 },
]

const arr2 = [{ done: false }, { done: false }, { done: false }]

// console.log(categorize(sampleTasks))
