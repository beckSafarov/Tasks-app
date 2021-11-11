import { Box } from '@chakra-ui/layout'
import { useContext } from 'react'
import Auth from '../../components/Auth'
import Sidebar from '../../components/Sidebar'
import TasksScreen from '../../components/TasksScreen'
import { TasksContext } from '../../Context/TasksContext'
import { getScreenWidths } from '../../helpers'

const AllTasksScreen = () => {
  const { tasks } = useContext(TasksContext)
  const sidebarWidth = getScreenWidths([1, 5])[0]
  return (
    <Box width='full' height='100vh'>
      <Box
        position='fixed'
        left='0'
        right='0'
        w={sidebarWidth}
        height='full'
        backgroundColor='light.sidebar'
      >
        <Sidebar />
      </Box>
      <Box ml={sidebarWidth} id='main' pb='100px'>
        <TasksScreen store={tasks} title='All Tasks' />
      </Box>
    </Box>
  )
}

export default AllTasksScreen
