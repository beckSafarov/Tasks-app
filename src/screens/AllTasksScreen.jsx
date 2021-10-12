import { useContext } from 'react'
import TasksScreen from '../components/TasksScreen'
import { TasksContext } from '../Context/TasksContext'

const AllTasksScreen = () => {
  const { tasks } = useContext(TasksContext)
  return <TasksScreen store={tasks} title='All Tasks' />
}

export default AllTasksScreen
