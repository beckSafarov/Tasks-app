import { useContext } from 'react'
import TasksScreen from '../components/TasksScreen'
import { TasksContext } from '../Context/TasksContext'
import { isUpcoming } from '../helpers/tasksHelpers'

const UpcomingScreen = () => {
  const { tasks: store } = useContext(TasksContext)
  const tasks = store.filter((t) => t.dueDate && isUpcoming(t.dueDate))
  return <TasksScreen store={tasks} title='Upcoming' defaultDate='Upcoming' />
}

export default UpcomingScreen
