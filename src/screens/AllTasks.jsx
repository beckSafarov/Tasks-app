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

const AllTasks = () => {
  const { tasks: store } = useContext(TasksContext)
  const { tags } = useContext(TagsContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [showCompTasks, setShowCompTasks] = useState(false)
  const [selectedTask, setSelectedTask] = useState({})
  const [compTasks, setCompTasks] = useState(store.filter((t) => t.done))
  const allTasksPerTag = getTasksPerTag(
    tags,
    store.concat().filter((t) => !t.done)
  )
  const [tasks, setTasks] = useState(allTasksPerTag)

  const taskOpenHandle = (task) => {
    setSelectedTask(task)
    onOpen()
  }

  const toggleCompTasks = () => setShowCompTasks((v) => !v)

  const onSearch = (keyword) => {
    const res = rgxSearch(store, keyword)
    const { positives, negatives } = groupByBinaryProp(res)
    setTasks(getTasksPerTag(tags, negatives))
    if (positives.length > 0) {
      setCompTasks(positives)
      setShowCompTasks(true)
    }
  }

  const onSearchClear = () => setTasks(allTasksPerTag)

  return (
    <>
      <TaskHeader
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={showCompTasks}
        toggleCompTasks={toggleCompTasks}
      />
      <Container maxW='container.lg' pt={10}>
        <HStack mt={'30px'} w='full'>
          <AddTask />
        </HStack>
        {Object.keys(tasks).map((tag, i) => (
          <VStack mt={'50px'} key={i}>
            <Text as='strong' fontSize='lg' align='left' w='full' mb='10px'>
              {capitalize(tag)}
            </Text>
            {tasks[tag].map((t, i) => (
              <Task key={i} task={t} onOpen={taskOpenHandle} />
            ))}
          </VStack>
        ))}
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
