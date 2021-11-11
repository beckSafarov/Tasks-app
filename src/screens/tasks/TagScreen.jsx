import { useContext, useEffect } from 'react'
import TasksScreen from '../../components/TasksScreen'
import { TagsContext } from '../../Context/TagsContext'
import { TasksContext } from '../../Context/TasksContext'
import { findPropByVal, getScreenWidths } from '../../helpers'
import { Box } from '@chakra-ui/layout'
import Sidebar from '../../components/Sidebar'

const TagScreen = ({ history, location }) => {
  const { tags } = useContext(TagsContext)
  const { tasks } = useContext(TasksContext)
  const tagId = location.pathname.split('/').slice(-1)[0]
  const tag = findPropByVal(tags, tagId)
  const sidebarWidth = getScreenWidths([1, 5])[0]

  useEffect(() => {
    if (!tags[tag]) history.push('/')
  }, [tags, tag, history])

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
        <TasksScreen
          store={tasks.filter((t) => t.tag === tag)}
          tag={tag}
          title={tag}
        />
      </Box>
    </Box>
  )
}

/**
 * <TasksScreen
        store={tasks.filter((t) => t.tag === tag)}
        tag={tag}
        title={tag}
      />
 */

export default TagScreen
