import { Box } from '@chakra-ui/layout'
import { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import TasksScreen from '../../components/TasksScreen'
import { getScreenWidths } from '../../helpers'
import {
  useAppContext,
  usePrefsContext,
  useTagsContext,
  useTasksContext,
} from '../../hooks/ContextHooks'
import { isEmpty } from '../../helpers'

const AllTasksScreen = () => {
  const { data: tasks, set: setTasks } = useTasksContext()
  const { set: setTags, tags } = useTagsContext()
  const { set: setPrefs } = usePrefsContext()
  const { data: userData, getData } = useAppContext()
  const sidebarWidth = getScreenWidths([1, 5])[0]

  useEffect(async () => {
    if (isEmpty(userData)) await getData()

    if (!isEmpty(userData) && tags.length < 1 && tasks.length < 1) {
      setTags(userData.tags)
      setTasks(userData.tasks)
      setPrefs(userData.preferences)
    }
  }, [tasks, userData])

  return (
    <>
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
    </>
  )
}

export default AllTasksScreen
