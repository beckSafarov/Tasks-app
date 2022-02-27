export const capitalize = (w) => w.charAt(0).toUpperCase() + w.slice(1)

export const isEmpty = (obj) => Object.keys(obj).length < 1

export const objSize = (obj) => Object.keys(obj).length

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

/**
 * @desc groups an array of objects with a binary property
 * @param Array containing objects
 * @param String optional, property to group by
 * @returns Object {positives: [], negatives: []}
 */
export const groupByBinaryProp = (arr = [], prop = 'done') => {
  const res = { positives: [], negatives: [] }
  arr.forEach((elem) => {
    res[elem[prop] ? 'positives' : 'negatives'].push(elem)
  })
  return res
}

export const rgxSearch = (arr = [], keyword, prop = 'name') => {
  let res = []
  const rx = new RegExp(keyword, 'gi')
  arr.forEach((elem) => {
    if (elem[prop].match(rx)) res.push(elem)
  })
  return res
}

export const objSort = (arr, prop) =>
  typeof arr[0][prop] === 'number'
    ? arr.concat().sort((x, y) => x[prop] - y[prop])
    : arr.concat().sort((x, y) => x[prop] > y[prop])

export const sort = (arr = [], prop) => {
  const ObjSort = (arr, prop) => arr.concat().sort((x, y) => x[prop] - y[prop])
  const numbSort = (arr) => arr.concat().sort((x, y) => x - y)
  return typeof arr[0] === 'object' ? ObjSort(arr, prop) : numbSort(arr)
}

export const collect = (arr = [], prop = 'id') => arr.map((v) => v[prop])

export const pluralize = (word = '', n = 0) =>
  n === 0 ? `No ${word}s` : n === 1 ? `1 ${word}` : `${n} ${word}s`

/**
 * @param sizes:Array, e.g. [1, 2, 3]
 * @returns Array
 */
export const getScreenWidths = (sizes = []) => {
  const width = window?.screen?.availWidth || 1440
  const sum = sizes.reduce((a, c) => (a += c), 0)
  const div = width / sum
  return sizes.map((s) => Math.floor(div * s))
}
