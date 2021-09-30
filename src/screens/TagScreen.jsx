import { useState, useContext, useEffect } from 'react'
import {
  HStack,
  VStack,
  Button,
  Container,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import AddTask from '../components/AddTask'
import Task from '../components/Task'
import TaskDrawer from '../components/TaskDrawer'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import TaskHeader from '../components/TaskHeader'
import {
  capitalize,
  findPropByVal,
  getTasksPerTag,
  groupByBinaryProp,
  rgxSearch,
} from '../helpers'

const TagScreen = ({ history, location }) => {
  const { tasks: store } = useContext(TasksContext)
  const { tags } = useContext(TagsContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const tagId = location.pathname.split('/').slice(-1)[0]
  const tag = findPropByVal(tags, tagId)

  const [currTask, setCurrTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(false)
  const [tasks, setTasks] = useState([])
  const [compTasks, setCompTasks] = useState(tasks.filter((t) => t.done))

  useEffect(() => {
    tags[tag]
      ? setTasks(() => store.filter((t) => t.tag == tag))
      : history.push('/')
    setShowCompTasks(false)
  }, [store, history, location])

  const taskOpenHandle = (task) => {
    setCurrTask(task)
    onOpen()
  }

  const compTasksHandler = () => setShowCompTasks((v) => !v)

  const onSearch = (keyword) => {
    const res = rgxSearch(tasks, keyword)
    const { positives, negatives } = groupByBinaryProp(res)
    setTasks(negatives)
    if (positives.length > 0) {
      setCompTasks(positives)
      setShowCompTasks(true)
    }
  }

  const onSearchClear = () => setTasks(() => store.filter((t) => t.tag == tag))

  return (
    <>
      <TaskHeader
        title={capitalize(tag)}
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={showCompTasks}
        toggleCompTasks={compTasksHandler}
      />
      <Container maxW='container.lg' pt={7}>
        <HStack mt={'30px'} w='full'>
          <AddTask tag={tag} />
        </HStack>
        <VStack mt={'50px'}>
          {tasks
            .filter((t) => !t.done)
            .map((task, i) => (
              <Task key={i} task={task} onOpen={taskOpenHandle} />
            ))}
        </VStack>
        <TaskDrawer isOpen={isOpen} onClose={onClose} task={currTask} />
        <CompletedTasks
          show={showCompTasks}
          tasks={compTasks}
          onOpen={taskOpenHandle}
        />
      </Container>
    </>
  )
}

export default TagScreen
