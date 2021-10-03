import { useContext } from 'react'
import TasksScreen from '../components/TasksScreen'
import { TasksContext } from '../Context/TasksContext'

const TodayScreen = () => {
  const { tasks } = useContext(TasksContext)
  return <TasksScreen store={tasks} title='Today' />
}

export default TodayScreen
