import { useEffect } from 'react'
import { Box } from '@chakra-ui/layout'
import Sidebar from '../components/Sidebar'
import { getScreenWidths } from '../helpers'
import TasksContainer from '../components/TasksContainer'
import usePageData from '../hooks/usePageData'
import { useLocation } from 'react-router'
import { useTagsContext, useTasksContext } from '../hooks/ContextHooks'

const TasksScreen = () => {
  const loc = useLocation()
  const { loading: tasksLoading } = useTasksContext()
  const { loading: tagsLoading } = useTagsContext()
  const {
    loading: userDataLoading,
    tasks,
    tag,
    title,
    defaultDate,
    error,
    page,
  } = usePageData(loc)
  const sidebarWidth = getScreenWidths([1, 5])[0]
  const updateLoading = tasksLoading || tagsLoading

  const onBeforeUnload = (e) => {
    if (updateLoading) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [updateLoading])

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
        <TasksContainer
          store={tasks}
          tag={tag}
          page={page}
          title={title}
          defaultDate={defaultDate}
          error={error}
        />
      </Box>
    </Box>
  )
}

export default TasksScreen
