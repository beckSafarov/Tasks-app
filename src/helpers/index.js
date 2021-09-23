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

const arr1 = [
  { tag: 'a', id: 1 },
  { tag: 'a', id: 2 },
  { tag: 'b', id: 3 },
  { tag: 'b', id: 4 },
]
