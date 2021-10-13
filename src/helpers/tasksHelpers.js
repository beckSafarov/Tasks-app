import { groupByBinaryProp as group, objSort } from '.'

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
    case 'importance':
      const { positives, negatives } = group(list, 'starred')
      positives.sort((x, y) => y.starred.date > x.starred.date)
      return [...positives, ...negatives]
    case 'due_date':
    case 'creation_date':
    default:
      return list
  }
}
