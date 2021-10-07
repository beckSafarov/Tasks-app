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
  const [currDeleted, setCurrDeleted] = useState({})

  useEffect(() => {
    setTasks(sortTasks(undones, prefs.sortType, tags))
    setCompTasks([...dones])
  }, [prefs, store, tag])

  // when a task is clicked, it opens the taskDrawer
  const taskOpenHandle = (task) => {
    setSelectedTask(task)
    setOpenTaskBar(true)
  }

  // closes the taskDrawer
  const taskCloseHandler = (updatedTask) => {
    setOpenTaskBar(false)
  }

  // toggle a task to be completed or back to incompleted
  const toggleCompTasks = () => {
    setShowCompTasks((v) => !v)
    toggleShowCompletedTasks()
  }

  // receives a search keyword and searches through task names
  const onSearch = (keyword) => {
    const res = rgxSearch(store, keyword)
    const { positives, negatives } = groupByBinaryProp(res)
    setTasks(getTasksPerTag(tags, negatives))
    if (positives.length > 0) {
      setCompTasks(positives)
      setShowCompTasks(true)
    }
  }

  // clears the search result and brings back the initial task list
  const onSearchClear = () => {
    setTasks(sortTasks(undones, prefs.sortType, tags))
    setCompTasks(dones)
  }

  // when a task deleted, to check whether the taskbar for that task is not open. If yes, it will be closed
  const onDelete = (task) => setCurrDeleted(task)

  // receives and sets a new sort type for tasks
  const sortTypeHandler = (type) => {
    type = prefs.sortType === type ? 'none' : type
    setSortType(type)
    setTasks(sortTasks(undones, type, tags))
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
            <Task
              key={i}
              task={task}
              onOpen={taskOpenHandle}
              onDelete={onDelete}
            />
          ))}
        </VStack>
        <TaskDrawer
          show={openTaskBar}
          onClose={taskCloseHandler}
          task={selectedTask}
          tags={tags}
          currDeleted={currDeleted}
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
            <Task
              key={i}
              task={t}
              onOpen={taskOpenHandle}
              onDelete={onDelete}
              completed
            />
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
