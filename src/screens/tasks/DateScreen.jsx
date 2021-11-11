import { useContext } from 'react'
import TasksScreen from '../../components/TasksScreen'
import { TasksContext } from '../../Context/TasksContext'
import dayjs from 'dayjs'
import isTomorrow from 'dayjs/plugin/isTomorrow.js'
import { IsToday as isToday } from '../../helpers/tasksHelpers'
import { isUpcoming } from '../../helpers/tasksHelpers'
import { capitalize, getScreenWidths } from '../../helpers'
import { Box } from '@chakra-ui/layout'
import Sidebar from '../../components/Sidebar'
dayjs.extend(isTomorrow)

const DateScreen = ({ location }) => {
  const { tasks: store } = useContext(TasksContext)
  const loc = location.pathname
  const dateName = capitalize(loc.split('/').pop())
  const sidebarWidth = getScreenWidths([1, 5])[0]

  const lookUp = {
    today: () => store.filter((t) => t.dueDate && isToday(t.dueDate)),
    tomorrow: () =>
      store.filter((t) => t.dueDate && dayjs(t.dueDate).isTomorrow()),
    upcoming: () => store.filter((t) => t.dueDate && isUpcoming(t.dueDate)),
  }

  const tasks = lookUp[dateName.toLowerCase()]()

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
        <TasksScreen store={tasks} title={dateName} defaultDate={dateName} />
      </Box>
    </Box>
  )
}

export default DateScreen
