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
import { capitalize } from '../helpers'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'

const TagScreen = ({ history, location }) => {
  const tag = location.pathname.split('/').slice(-1)[0]
  const { tasks: store } = useContext(TasksContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [currTask, setCurrTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const foundTasks = store.filter((t) => t.tag === tag)
    foundTasks.length > 0 ? setTasks(foundTasks) : history.push('/')
    setShowCompTasks(false)
  }, [store, history, location])

  const taskOpenHandle = (task) => {
    setCurrTask(task)
    onOpen()
  }

  const compTasksHandler = () => setShowCompTasks(!showCompTasks)

  return (
    <Container maxW='container.lg' pt={7}>
      <HStack display='flex' justifyContent='space-between' w='full'>
        <Heading size='md'>{capitalize(tag)}</Heading>
        <Button
          bg='gray.100'
          _focus={{ border: 'none' }}
          onClick={compTasksHandler}
        >
          {!showCompTasks ? 'Show' : 'Hide'} Completed Tasks
        </Button>
      </HStack>
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
      <CompletedTasks show={showCompTasks} tag={tag} onOpen={taskOpenHandle} />
    </Container>
  )
}

export default TagScreen
