import { groupByBinaryProp as group, objSort } from '.'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
dayjs.extend(localizedFormat)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)

export const sortTasks = (list = [], type = 'none', tags) => {
  if (list.length < 1) return list
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

/**
 * @param: loc:String
 * @returns: matching page name among the options
 */
export const getPage = (loc, fallBack = 'home') => {
  const matches = loc.match(/tag|today|tomorrow|upcoming/)
  return matches ? matches[0] : fallBack
}

// --- DATE RELATED HELPERS ---

const weekList = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
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
 * @param: d:String
 * @returns: true|false:Boolean
 */
export const IsToday = (d) => {
  const date = new Date(d)
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

/**
 * @desc: checks whether the date is later than tomorrow
 * @param: d:String|Date
 * @returns: true|false:Boolean
 */
export const isUpcoming = (d) => {
  return dayjs(d).diff(new Date(), 'days') > 1
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
    : dayjs().isAfter(date, 'd')
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
/**
 * @param: Today|Tomorrow|Upcoming|...: String|null
 * @returns: Object|null
 */
export const textToDate = (text) => {
  const rand = () => Math.floor(Math.random() * 6 + 2)
  const cases = {
    Today: () => new Date(),
    Tomorrow: () => dayjs().add(1, 'day').$d,
    Upcoming: () => dayjs().add(rand(), 'day').$d,
    default: null,
  }
  return cases[text] ? cases[text]() : cases.default
}
