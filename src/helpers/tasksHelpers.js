import { objSort } from '.'

export const sortTasks = (list = [], type = 'none', tags) => {
  switch (type) {
    case 'alphabetically':
      return objSort(list, 'name')
    case 'tag':
      let res = []
      Object.keys(tags).forEach((tag) => {
        res = [...res, ...list.filter((t) => t.tag === tag)]
      })
      return res
    case 'due_date':
    case 'creation_date':
    case 'importance':
    default:
      return list
  }
}
