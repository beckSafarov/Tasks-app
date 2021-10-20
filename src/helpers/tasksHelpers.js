import { groupByBinaryProp as group, objSort } from '.'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
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
      p.sort((x, y) => x.dueDate > y.dueDate)
      return [...p, ...n]
    case 'creationDate':
    default:
      return list
  }
}

export const formatTaskTime = (dueDate) => {
  const date = new Date(dueDate)
  const diff = dayjs(dueDate).diff(new Date(), 'days')

  function format() {
    const weekDay = weekList[String(date.getDay())]
    const dayOfMonth = date.getDate()
    const month = monthList[String(date.getMonth())]
    return `${weekDay}, ${dayOfMonth} ${month}`
  }

  return diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : format()
}

/**
 * casify(diff, {
 *  '0':'Today',
 *  '1':'Tomorrow',
 *  'else':dateFormat()
 * })
 */

/**
 * casify(diff, {
 * '0':'Today',
 * '1':'Tomorrow',
 * 'else/...':dateFormat()
 * '1+=':dateFormat()
 * '-1-=':dateFormat()
 * 'none':'Someday'
 * })
 */
