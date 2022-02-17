import { useEffect } from 'react'
import { useLocation } from 'react-router'
import TasksContainer from '../components/Tasks/TasksContainer'

import usePageData from '../hooks/usePageData'
import {
  usePrefsContext,
  useTagsContext,
  useTasksContext,
} from '../hooks/ContextHooks'
import { getScreenWidths } from '../helpers'

import Sidebar from '../components/Sidebar'
import { Box } from '@chakra-ui/layout'
import { useColorMode } from '@chakra-ui/react'

const TasksScreen = () => {
  const loc = useLocation()
  const { loading: tasksLoading } = useTasksContext()
  const { loading: tagsLoading } = useTagsContext()
  const { toggleShowCompletedTasks } = usePrefsContext()
  const {
    loading: pageTasksLoading,
    tasks,
    tag,
    title,
    defaultDate,
    error,
    page,
  } = usePageData(loc)
  const sidebarWidth = getScreenWidths([1, 5])[0]
  const updateLoading = tasksLoading || tagsLoading
  const { colorMode: mode, toggleColorMode } = useColorMode()

  // to give warning if a user is leaving before updates are saved
  const onBeforeUnload = (e) => {
    if (updateLoading) {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  const onKeydown = (e) => {
    // Command+Shift+L keydown
    if (e.shiftKey && e.metaKey && e.key === 'l') {
      e.preventDefault()
      toggleColorMode()
    }
    // Command+Alt+A keydown
    if (e.altKey && e.metaKey && e.key === 'å') {
      e.preventDefault()
      toggleShowCompletedTasks()
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnload)
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
      window.removeEventListener('keydown', onKeydown)
    }
  }, [updateLoading, mode])

  return (
    <Box width='full' height='100vh'>
      <Box
        position='fixed'
        left='0'
        right='0'
        w={sidebarWidth}
        height='full'
        backgroundColor={`${mode}.sidebar`}
        color={`${mode}.text`}
      >
        <Sidebar />
      </Box>
      <Box ml={sidebarWidth} id='main' pb='100px'>
        <TasksContainer
          loading={pageTasksLoading}
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
