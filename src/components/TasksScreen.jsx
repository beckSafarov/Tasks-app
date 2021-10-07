// --- UI components ---
import {
  HStack,
  VStack,
  Text,
  Container,
  useDisclosure,
  Flex,
  Tag,
  TagLabel,
} from '@chakra-ui/react'
import AddTask from './AddTask'
import Task from './Task'
import TaskDrawer from './TaskDrawer'
import TaskHeader from './TaskHeader'

// --- library methods ---
import { useEffect, useState, useContext } from 'react'
import { PreferencesContext } from '../Context/PreferencesContext'
import { TagsContext } from '../Context/TagsContext'

// --- helper methods ---
import { getTasksPerTag, groupByBinaryProp, rgxSearch } from '../helpers'
import { sortTasks } from '../helpers/tasksHelpers'

const TasksScreen = ({ store, tag, title }) => {
  const {
    preferences: prefs,
    toggleShowCompletedTasks,
    setSortType,
  } = useContext(PreferencesContext)
  const { tags } = useContext(TagsContext)
  const { positives: dones, negatives: undones } = groupByBinaryProp(store)

  // hooks
  const [tasks, setTasks] = useState([])
  const [compTasks, setCompTasks] = useState([...dones])
  const [selectedTask, setSelectedTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(prefs.showCompletedTasks)
  const [openTaskBar, setOpenTaskBar] = useState(false)

  useEffect(() => {
    setTasks(sortTasks(undones, prefs.sortType, tags))
    setCompTasks([...dones])
  }, [prefs, store, tag])

  const taskOpenHandle = (task) => {
    setSelectedTask(task)
    setOpenTaskBar(true)
  }

  const taskCloseHandler = (updatedTask) => {
    setOpenTaskBar(false)
  }

  const toggleCompTasks = () => {
    setShowCompTasks((v) => !v)
    toggleShowCompletedTasks()
  }

  const onSearch = (keyword) => {
    const res = rgxSearch(store, keyword)
    const { positives, negatives } = groupByBinaryProp(res)
    setTasks(getTasksPerTag(tags, negatives))
    if (positives.length > 0) {
      setCompTasks(positives)
      setShowCompTasks(true)
    }
  }

  const sortTypeHandler = (type) => {
    type = prefs.sortType === type ? 'none' : type
    setSortType(type)
    setTasks(sortTasks(undones, type, tags))
  }

  const onSearchClear = () => {
    setTasks(sortTasks(undones, prefs.sortType, tags))
    setCompTasks(dones)
  }

  return (
    <>
      <TaskHeader
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={showCompTasks}
        toggleCompTasks={toggleCompTasks}
        sortType={prefs.sortType}
        onSort={sortTypeHandler}
        title={title}
        isMainPage={!tag ? true : false}
      />
      <Container id='container' maxW='container.md' pt={10}>
        <HStack mt={'30px'} w='full'>
          <AddTask />
        </HStack>
        <VStack mt={tasks.length > 0 ? '50px' : '0'}>
          {tasks.map((task, i) => (
            <Task key={i} task={task} onOpen={taskOpenHandle} />
          ))}
        </VStack>
        <TaskDrawer
          show={openTaskBar}
          onClose={taskCloseHandler}
          task={selectedTask}
          tags={tags}
        />

        {/* completed tasks */}
        <VStack
          mt='50px'
          id='completed_tasks_div'
          className={showCompTasks && compTasks.length > 0 ? '' : 'hidden'}
        >
          <Flex mb='15px' w='full' id='completed_tasks_flex'>
            <Tag
              size='lg'
              variant='outline'
              colorScheme='green'
              justifyContent='flex-start'
              id='completed_tasks_completed_tag'
            >
              <TagLabel id='completed_tasks_label'>Completed</TagLabel>
            </Tag>
          </Flex>
          {compTasks.map((t, i) => (
            <Task key={i} task={t} onOpen={taskOpenHandle} completed />
          ))}
        </VStack>
      </Container>
    </>
  )
}

TasksScreen.defaultProps = {
  store: [],
  tag: '',
  title: 'All tasks',
}

export default TasksScreen
