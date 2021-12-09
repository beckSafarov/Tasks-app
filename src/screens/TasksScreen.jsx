import React from 'react'
import { Box } from '@chakra-ui/layout'
import Sidebar from '../components/Sidebar'
import { getScreenWidths } from '../helpers'
import TasksContainer from '../components/TasksContainer'
import usePageData from '../hooks/usePageData'
import { useLocation } from 'react-router'

const TasksScreen = () => {
  const loc = useLocation()
  const { loading, tasks, tag, title, defaultDate, error } = usePageData(loc)
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
        <TasksContainer
          loading={loading}
          store={tasks}
          tag={tag}
          title={title}
          defaultDate={defaultDate}
          error={error}
        />
      </Box>
    </Box>
  )
}

export default TasksScreen
