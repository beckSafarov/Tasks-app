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

export const updateArr = (arr = [], newVal, key = 'id') => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === newVal[key]) {
      arr[i] = { ...arr[i], ...newVal }
      break
    }
  }
  return arr
}

const hasProp = (obj = {}, prop) =>
  Object.keys(obj).find((p) => p === prop) ? true : false

const nthProp = (obj = {}, n) => Object.keys(obj)[n]

/**
 * @info: find index of an object with certain attribute in an array
 * @param: arr, object with attribute
 * @return: index of the object in the array
 */
const findIndex = (arr, predicate = {}) => {
  let index = -1
  const prop = Array.from(Object.keys(predicate))[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][prop] === predicate[prop]) {
      index = i
      break
    }
  }
  return index
}

export const without = (arr, val) => {
  const normal = () => {
    let list = arr.concat()
    while (list.indexOf(val) !== -1) {
      list.splice(list.indexOf(val), 1)
    }
    return list
  }

  const obj = () => {
    let list = arr.concat()
    const index = findIndex(list, val)
    list.splice(index, 1)
    return list
  }
  return typeof val === 'object' ? obj() : normal()
}

const withoutFirst = (arr, val) => {
  let res = arr.concat()
  res.splice(arr.indexOf(val), 1)
  return res
}

/**
 * @WARNING: mutates the array
 * @info: removes all the occurrences of a value
 * @param: array of int|string, value to be inserted, position
 * @return: mutated array
 */
const remove = (arr = [], val) => {
  while (arr.indexOf(val) !== -1) {
    arr.splice(arr.indexOf(val), 1)
  }
  return arr
}

/**
 * @info: insert a value to a certain index
 * @param: array of int|string, value to be inserted, position
 * @return: new array with the inserted element
 */
const removeFirst = (arr, val) => {
  arr.splice(arr.indexOf(val), 1)
  return arr
}

/**
 * @info: insert a value to a certain index
 * @param: array, value to be inserted, position
 * @return: new array with the inserted element
 */
const insert = (arr, val = null, pos = 0) => [
  ...arr.slice(0, pos),
  val,
  ...arr.slice(pos),
]

const isUnique = (arr = []) => arr.length === new Set(arr).size

/**
 * @param:
 *  arr: arr of integers|strings|bools|objects,
 *  key (optional): unique key of an object, equal to id by default
 * @return uniqified array
 */
const uniqify = (arr = [], key = 'id') => {
  const arrUniqify = (arr = []) => Array.from(new Set(arr))
  const objUniqify = (arr = [], key = 'id') => {
    let out = []
    let exists = false
    arr.forEach((val) => {
      exists = out.find((v) => v[key] === val[key])
      if (!exists) out.push(val)
    })
    return out
  }
  return typeof arr[0] === 'object' ? objUniqify(arr, key) : arrUniqify(arr)
}

const sum = (arr = [], key = '') => {
  const numbSum = (arr) => arr.reduce((a, c) => (a += c), 0)
  const objSum = (arr, key) => arr.reduce((a, c) => (a += c[key]), 0)

  return typeof arr[0] === 'object'
    ? objSum(arr, key)
    : 'number'
    ? numbSum(arr, key)
    : null
}

const count = (arr = [], val) => {
  const numbCount = (arr, val) => arr.filter((v) => v === val).length
  const objCount = (arr, val) => {
    const prop = Array.from(Object.keys(val))[0]
    return arr.filter((v) => v[prop] === val[prop]).length
  }
  return typeof arr[0] === 'object' ? objCount(arr, val) : numbCount(arr, val)
}

const sort = (arr = [], prop) => {
  const ObjSort = (arr, prop) => arr.sort((x, y) => x[prop] - y[prop])
  const numbSort = (arr) => arr.sort((x, y) => x - y)
  return typeof arr[0] === 'object' ? ObjSort(arr, prop) : numbSort(arr)
}

const average = (arr = []) =>
  (arr.reduce((a, c) => (a += c), 0) / arr.length).toFixed(2)

const min = (arr = []) => sort(arr)[0]
const max = (arr = []) => sort(arr)[arr.length - 1]

const range = (arr = []) => {
  let sorted = sort(arr)
  return sorted[arr.length - 1] - sorted[0]
}

export const collect = (arr = [], prop = 'id') => arr.map((v) => v[prop])

const zipObject = (props = [], vals = []) => {
  let zipObj = {}
  props.forEach((prop, i) => {
    zipObj[prop] = vals[i]
  })
  return zipObj
}

const where = (arr = [], val) => {
  let out = [],
    list = arr.concat(),
    i
  while (list.indexOf(val) !== -1) {
    i = list.indexOf(val)
    out.push(i)
    list[i] = null
  }
  return out
}

const countUnique = (arr = []) => new Set(arr).size

const find = (arr = [], val) => {
  const prop = Array.from(Object.keys(val))[0]
  return arr.find((v) => v[prop] === val[prop])
}

const findAll = (arr = [], val) => {
  const prop = Array.from(Object.keys(val))[0]
  return arr.filter((v) => v[prop] === val[prop])
}

const has = (arr = [], val) => {
  const numbOrString = (arr, val) => arr.indexOf(val) !== -1
  const obj = (arr, val) => {
    const prop = Array.from(Object.keys(val))[0]
    return arr.find((v) => v[prop] === val[prop]) ? true : false
  }
  return typeof arr[0] === 'object' ? obj(arr, val) : numbOrString(arr, val)
}

const pluralize = (word = '', n = 0) =>
  n === 0 ? `No ${word}s` : n === 1 ? `1 ${word}` : `${n} ${word}s`

const withoutProp = (obj, prop) => {
  let out = {}
  for (let currProp in obj) {
    if (currProp !== prop) out[currProp] = obj[currProp]
  }
  return out
}

const toArray = (obj = {}) => Object.keys(obj).map((prop) => obj[prop])
