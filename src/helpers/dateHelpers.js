import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'
dayjs.extend(localizedFormat)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(dayOfYear)
dayjs.extend(isLeapYear)

export const getDueDate = (task) => {
  if (!task || !task.dueDate) return null
  return task.dueDate.toDate ? task.dueDate.toDate() : task.dueDate
}

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
 * @param Date Object
 * @returns String: Thu,27 Oct
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

export const daysToEndTheYear = (date, dayOfYear) => {
  const isLeap = dayjs(date).isLeapYear()
  return isLeap ? 366 - dayOfYear : 365 - dayOfYear
}

/**
 * @desc returns date difference status and days from the perspective of the first param
 * @param Date
 * @param Date
 * @returns Object {status: Past|Present|Future, diff: Number}
 */
export const dateDiff = (a, b) => {
  const days1 = dayjs(a).dayOfYear()
  const days2 = dayjs(b).dayOfYear()
  const year1 = a.getFullYear()
  const year2 = b.getFullYear()

  if (year1 === year2) {
    return {
      status: days2 > days1 ? 'Future' : days2 === days1 ? 'Present' : 'Past',
      diff: Math.abs(days1 - days2),
    }
  } else {
    const past = Math.min(year1, year2)
    const pDay = past === year1 ? days1 : days2
    const fDay = pDay === days1 ? days2 : days1
    return {
      status: year2 > year1 ? 'Future' : 'Past',
      diff: daysToEndTheYear(past, pDay) + fDay,
    }
  }
}

/**
 * @desc: checks whether the date is later than tomorrow
 * @param: d:String|Date
 * @returns: true|false:Boolean
 */
export const isUpcoming = (d) => {
  const res = dateDiff(new Date(), d)
  return res.status === 'Future' && res.diff > 1
}

/**
 * @param: p:Object
 * @returns: Today|Tomorrow|Past|Future:String
 */
export const when = (d) => {
  const date = dayjs(d)
  return date.isToday()
    ? 'Today'
    : date.isTomorrow()
    ? 'Tomorrow'
    : dayjs().isAfter(date, 'd')
    ? 'Past'
    : 'Future'
}

export const testUpcoming = (d) => when(d) === 'Future'

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
 * @param String: today|tomorrow|upcoming
 * @returns Object | void 0
 */
export const textToDate = (text) => {
  const rand = () => Math.floor(Math.random() * 6 + 2)
  const cases = {
    today: () => new Date(),
    tomorrow: () => dayjs().add(1, 'day').$d,
    upcoming: () => dayjs().add(rand(), 'day').$d,
  }
  return cases[text] ? cases[text]() : null
}
