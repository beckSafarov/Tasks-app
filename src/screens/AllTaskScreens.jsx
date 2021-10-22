import { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router'
import { TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import {
  getPage,
  IsToday as isToday,
  isUpcoming,
} from '../helpers/tasksHelpers'
import { capitalize, findPropByVal } from '../helpers'
import dayjs from 'dayjs'
import TasksScreen from '../components/TasksScreen'

const AllTaskScreens = () => {
  const { tags } = useContext(TagsContext)
  const { tasks: store } = useContext(TasksContext)
  const path = useLocation().pathname
  const history = useHistory()
  const [data, setData] = useState({
    title: '',
    tasks: [],
    tag: '',
  })

  useEffect(() => {
    const { title, tasks, tag } = filterTasks(getPage(path))
    if (!tasks) history.push('/')
    //tag not found
    else setData({ title, tasks, tag })
  }, [path])

  const filterTasks = (page) => {
    const lookUp = {
      home: () => store,
      tag: () => {
        const tagId = path.split('/').slice(-1)[0]
        const tag = findPropByVal(tags, tagId)
        return {
          tag,
          tasks: tags[tag] ? store.filter((t) => t.tag === tag) : false,
        }
      },
      today: () => {
        return store.filter((t) => t.dueDate && isToday(t.dueDate))
      },
      tomorrow: () => {
        return store.filter((t) => t.dueDate && dayjs(t.dueDate).isTomorrow())
      },
      upcoming: () => {
        return store.filter((t) => t.dueDate && isUpcoming(t.dueDate))
      },
    }
    const dataRes = lookUp[page]()
    const tasks = dataRes.length ? dataRes : dataRes.tasks
    const tag = dataRes.length ? null : dataRes.tag
    const title =
      page === 'home' ? 'All Tasks' : page === 'tag' ? tag : capitalize(page)
    return { title, tasks, tag }
  }

  return <TasksScreen store={data.tasks} title={data.title} tag={data.tag} />
}

export default AllTaskScreens
