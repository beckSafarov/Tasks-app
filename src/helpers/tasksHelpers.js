import { groupByBinaryProp as group, objSort } from '.'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
dayjs.extend(localizedFormat)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

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
    case 'starred':
      const { positives, negatives } = group(list, 'starred')
      positives.sort((x, y) => y.starred.date > x.starred.date)
      return [...positives, ...negatives]
    case 'dueDate':
      const { positives: p, negatives: n } = group(list, 'dueDate')
      p.sort((x, y) => new Date(x.dueDate) - new Date(y.dueDate))
      return [...p, ...n]
    case 'creationDate':
    default:
      return list
  }
}

// --- DATE RELATED HELPERS ---

const weekList = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
}

const monthList = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
}

/**
 * @param: date: Object
 * @returns: Thu,27 Oct: String
 */
export const humanizeDate = (date) => {
  if (typeof date !== 'object') return null
  const weekDay = weekList[date.getDay()]
  const dayOfMonth = date.getDate()
  const month = monthList[date.getMonth()]
  return `${weekDay}, ${dayOfMonth} ${month}`
}

/**
 * @param: p:Object
 * @returns: Today|Tomorrow|Past|Future:String
 */
const when = (d) => {
  if (typeof d !== 'object') return null
  const date = dayjs(d)
  return date.isToday()
    ? 'Today'
    : date.isTomorrow()
    ? 'Tomorrow'
    : dayjs(new Date()).isAfter(date, 'd')
    ? 'Past'
    : 'Future'
}

export const taskTimeHandler = (dueDate) => {
  if (dueDate) {
    const date = new Date(dueDate)
    const tense = when(date)
    if (tense.match(/Past|Future/)) {
      return {
        date: humanizeDate(date),
        color: tense === 'Past' ? 'red.400' : 'gray.500',
      }
    } else {
      return { date: tense, color: 'gray.500' }
    }
  } else {
    return { date: 'Someday', color: 'gray.500' }
  }
}
