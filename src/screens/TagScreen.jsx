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
  const [currTask, setCurrTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { tasks: store } = useContext(TasksContext)
  const tasks = store.filter((t) => t.tag === tag)

  useEffect(() => {
    if (tasks.length < 1) history.push('/')
  }, [tasks, history, location])

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
        <AddTask />
      </HStack>
      <VStack mt={'50px'}>
        {tasks.map((task, i) => (
          <Task key={i} task={task} onOpen={taskOpenHandle} />
        ))}
      </VStack>
      <TaskDrawer isOpen={isOpen} onClose={onClose} task={currTask} />
      <CompletedTasks
        show={showCompTasks}
        tasks={tasks.filter((t) => t.done)}
        onOpen={taskOpenHandle}
      />
    </Container>
  )
}

export default TagScreen
