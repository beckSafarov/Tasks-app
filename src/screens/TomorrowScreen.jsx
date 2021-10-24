import { useContext } from 'react'
import TasksScreen from '../components/TasksScreen'
import { TasksContext } from '../Context/TasksContext'
import dayjs from 'dayjs'
import isTomorrow from 'dayjs/plugin/isTomorrow.js'
dayjs.extend(isTomorrow)

const TomorrowScreen = () => {
  const { tasks: store } = useContext(TasksContext)
  const tasks = store.filter((t) => t.dueDate && dayjs(t.dueDate).isTomorrow())
  return <TasksScreen store={tasks} title='Tomorrow' defaultDate='Tomorrow' />
}

export default TomorrowScreen
