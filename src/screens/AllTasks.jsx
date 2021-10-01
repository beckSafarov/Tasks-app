import { useState, useContext, useEffect } from 'react'
import {
  HStack,
  VStack,
  Text,
  Container,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import AddTask from '../components/AddTask'
import Task from '../components/Task'
import TaskDrawer from '../components/TaskDrawer'
import {
  capitalize,
  getTasksPerTag,
  groupByBinaryProp,
  rgxSearch,
} from '../helpers'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'
import TaskHeader from '../components/TaskHeader'
import { TagsContext } from '../Context/TagsContext'
import { PreferencesContext } from '../Context/PreferencesContext'

const AllTasks = () => {
  const { tasks: store } = useContext(TasksContext)
  const { tags } = useContext(TagsContext)
  const {
    preferences: prefs,
    toggleShowCompletedTasks,
    setSortType: lcsSortBy,
  } = useContext(PreferencesContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [tasks, setTasks] = useState([])
  const [showCompTasks, setShowCompTasks] = useState(prefs.showCompletedTasks)
  const [selectedTask, setSelectedTask] = useState({})
  const [compTasks, setCompTasks] = useState([])
  const [sortType, setSortType] = useState(prefs.sortType)

  useEffect(() => {
    setTasks(
      prefs.sortType === 'none'
        ? store
        : getTasksPerTag(
            tags,
            store.concat().filter((t) => !t.done)
          )
    )
    setCompTasks(store.filter((t) => t.done))
  }, [store])

  const taskOpenHandle = (task) => {
    setSelectedTask(task)
    onOpen()
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
    let data
    type = sortType === type ? 'none' : type
    switch (type) {
      case 'tag':
        data = getTasksPerTag(
          tags,
          store.concat().filter((t) => !t.done)
        )
        setSortType('tag')
        lcsSortBy('tag')
        setTasks(data)
        break
      case 'date':
      case 'importance':
      default:
        setSortType('none')
        lcsSortBy('none')
        setTasks(store)
    }
  }

  const onSearchClear = () => {
    setTasks(tasks)
    setCompTasks(store.filter((t) => !t.done))
  }

  return (
    <>
      <TaskHeader
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={showCompTasks}
        toggleCompTasks={toggleCompTasks}
        sortType={sortType}
        onSort={sortTypeHandler}
      />
      <Container maxW='container.lg' pt={10}>
        <HStack mt={'30px'} w='full'>
          <AddTask />
        </HStack>
        {sortType !== 'none' ? (
          Object.keys(tasks).map((tag, i) => (
            <VStack mt={'50px'} key={i}>
              <Text as='strong' fontSize='lg' align='left' w='full' mb='10px'>
                {tag}
              </Text>
              {tasks[tag].map((t, i) => (
                <Task key={i} task={t} onOpen={taskOpenHandle} />
              ))}
            </VStack>
          ))
        ) : (
          <VStack mt={'50px'}>
            {tasks
              .filter((t) => !t.done)
              .map((task, i) => (
                <Task key={i} task={task} onOpen={taskOpenHandle} />
              ))}
          </VStack>
        )}
        <TaskDrawer isOpen={isOpen} onClose={onClose} task={selectedTask} />
        <CompletedTasks
          show={showCompTasks}
          onOpen={taskOpenHandle}
          tasks={compTasks}
        />
      </Container>
    </>
  )
}

export default AllTasks
