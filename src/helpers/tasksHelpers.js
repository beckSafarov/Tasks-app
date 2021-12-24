import { groupByBinaryProp as group, objSort } from '.'
import { getDueDate } from './dateHelpers'

export const sortTasks = (list = [], type = 'none', tags) => {
  if (list.length < 1) return list
  switch (type) {
    case 'alphabetically':
      return objSort(list, 'name')
    case 'tag':
      let res = []
      tags.forEach((tag) => {
        res = [...res, ...list.filter((t) => t.tag === tag)]
      })
      return res
    case 'starred':
      const { positives, negatives } = group(list, 'starred')
      positives.sort((x, y) => y.starred.date > x.starred.date)
      return [...positives, ...negatives]
    case 'dueDate':
      const { positives: p, negatives: n } = group(list, 'dueDate')
      p.sort((x, y) => new Date(getDueDate(x)) - new Date(getDueDate(y)))
      return [...p, ...n]
    case 'creationDate':
    default:
      return list
  }
}
