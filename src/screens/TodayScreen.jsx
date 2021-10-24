import { useContext } from 'react'
import TasksScreen from '../components/TasksScreen'
import { TasksContext } from '../Context/TasksContext'
import { IsToday as isToday } from '../helpers/tasksHelpers'

const TodayScreen = () => {
  const { tasks: store } = useContext(TasksContext)
  const tasks = store.filter((t) => t.dueDate && isToday(t.dueDate))
  return <TasksScreen store={tasks} title='Today' defaultDate='Today' />
}

export default TodayScreen
