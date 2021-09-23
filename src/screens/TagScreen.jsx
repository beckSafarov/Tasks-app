import { useState } from 'react'
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

const tasks = {
  untagged: [
    {
      name: 'Bring egg',
      tag: 'untagged',
      description: '',
    },
    {
      name: 'Do H/W',
      tag: 'untagged',
      description: '',
    },
  ],
  work: [
    {
      name: 'Make a new design plan',
      tag: 'work',
      description: '',
    },
    {
      name: 'Fix the existing bugs',
      tag: 'work',
      description: '',
    },
  ],
}
const completedTasks = [
  {
    name: 'Plan the appointment with Tom',
    tag: 'work',
    description: '',
  },
]

const TagScreen = ({ location }) => {
  const tag = location.pathname.split('/').slice(-1)[0]
  const tagName = capitalize(
    Object.keys(tasks).find((p) => p === tag) || 'unknown'
  )
  const [currTask, setCurrTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const taskOpenHandle = (task) => {
    setCurrTask(task)
    onOpen()
  }

  const compTasksHandler = () => setShowCompTasks(!showCompTasks)

  return (
    <Container maxW='container.lg' pt={7}>
      <HStack display='flex' justifyContent='space-between' w='full'>
        <Heading size='md'>{tagName}</Heading>
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
        {tasks[tag].map((task, i) => (
          <Task key={i} task={task} onOpen={taskOpenHandle} />
        ))}
      </VStack>
      <TaskDrawer isOpen={isOpen} onClose={onClose} task={currTask} />
      <CompletedTasks
        show={showCompTasks}
        tasks={completedTasks}
        onOpen={taskOpenHandle}
      />
    </Container>
  )
}

export default TagScreen
