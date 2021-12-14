import { useState, useEffect } from 'react'
import { IsToday } from '../helpers/tasksHelpers'
import {
  useAppContext,
  usePrefsContext,
  useTagsContext,
  useTasksContext,
} from './ContextHooks'
import dayjs from 'dayjs'
import isTomorrow from 'dayjs/plugin/isTomorrow.js'
import { capitalize, isEmpty } from '../helpers'
import { isUpcoming } from '../helpers/tasksHelpers'
dayjs.extend(isTomorrow)
const defLoc = { pathname: 'http://localhost:3000/' }

const filterTasks = (filter = 'all', list, tagName) => {
  switch (filter) {
    case 'today':
      return list.filter((t) => t.dueDate && IsToday(t.dueDate.toDate()))
    case 'tomorrow':
      return list.filter(
        (t) => t.dueDate && dayjs(t.dueDate.toDate()).isTomorrow()
      )
    case 'upcoming':
      return list.filter((t) => t.dueDate && isUpcoming(t.dueDate.toDate()))
    case 'tag':
      return list.filter((t) => t.tag === tagName)
    default:
      return list
  }
}

const getPage = ({ pathname: path }) => {
  const match = path.match(/tag|today|tomorrow|upcoming/)
  if (match) return { filter: match[0], tagId: path.split('/').pop() }
  return { filter: '' }
}

const usePageData = (loc = defLoc) => {
  const { data: userData, loading, error, getData } = useAppContext()
  const { data: contextTasks, set: setTasks } = useTasksContext()
  const { set: setTags, tags: contextTags } = useTagsContext()
  const { set: setPrefs } = usePrefsContext()
  const [pageTasks, setPageTasks] = useState([])
  const [requested, setRequested] = useState(false)

  const { filter, tagId } = getPage(loc)
  const tagName = contextTags?.find((t) => t.id === tagId)?.tag || ''

  const defaultDate = filter && filter !== 'tag' ? filter : ''
  const page = !filter ? 'All Tasks' : tagName || filter
  const title = !filter ? 'All Tasks' : tagName || capitalize(filter)

  useEffect(() => {
    if (isEmpty(userData) && !requested) {
      const fetchData = async () => await getData()
      fetchData()
      setRequested(true)
    }

    if (!isEmpty(userData) && requested) {
      setTasks(userData.tasks)
      setTags(userData.tags)
      setPrefs(userData.preferences)
      setRequested(false)
    }

    if (contextTags.length > 0) {
      const filteredTasks = filterTasks(filter, contextTasks, tagName)
      setPageTasks(filteredTasks)
    }
  }, [loc.pathname, userData, contextTasks, contextTags.length, requested])

  return {
    loading,
    tasks: pageTasks,
    tag: tagName,
    error,
    title,
    defaultDate,
    page,
  }
}

export default usePageData
