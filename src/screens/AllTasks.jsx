import { useState, useContext, useEffect } from 'react'
import {
  HStack,
  VStack,
  Text,
  Button,
  Container,
  useDisclosure,
  Heading,
} from '@chakra-ui/react'
import AddTask from '../components/AddTask'
import Task from '../components/Task'
import TaskDrawer from '../components/TaskDrawer'
import { capitalize, categorize } from '../helpers'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'

const AllTasks = () => {
  const { tasks: store } = useContext(TasksContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [tasks, setTasks] = useState([])
  const [showCompTasks, setShowCompTasks] = useState(false)
  const [currTask, setCurrTask] = useState({})
  const taggedTasks = categorize(tasks)
  useEffect(() => {
    setTasks(store)
  }, [store])

  const taskOpenHandle = (task) => {
    setCurrTask(task)
    onOpen()
  }

  const toggleCompTasks = () => setShowCompTasks(!showCompTasks)

  return (
    <Container maxW='container.lg' pt={7}>
      <HStack display='flex' justifyContent='space-between' w='full'>
        <Heading size='md'>All Tasks</Heading>
        <Button
          bg='gray.100'
          _focus={{ border: 'none' }}
          onClick={toggleCompTasks}
        >
          {!showCompTasks ? 'Show' : 'Hide'} Completed Tasks
        </Button>
      </HStack>
      <HStack mt={'30px'} w='full'>
        <AddTask />
      </HStack>
      {Object.keys(taggedTasks).map((tag, i) => {
        if (taggedTasks[tag].undones.length > 0) {
          return (
            <VStack mt={'50px'} key={i}>
              <Text as='strong' fontSize='lg' align='left' w='full' mb='10px'>
                {capitalize(tag)}
              </Text>
              {taggedTasks[tag].undones.map((t, i) => (
                <Task key={i} task={t} onOpen={taskOpenHandle} />
              ))}
            </VStack>
          )
        }
      })}
      <TaskDrawer isOpen={isOpen} onClose={onClose} task={currTask} />
      <CompletedTasks show={showCompTasks} onOpen={taskOpenHandle} />
    </Container>
  )
}

export default AllTasks
