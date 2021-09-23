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
import { capitalize, groupByTag, objSize } from '../helpers'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'

const AllTasks = () => {
  const { tasks: store, update, remove } = useContext(TasksContext)
  const [tasks, setTasks] = useState([])
  const [currTask, setCurrTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(false)
  const [compTasks, setCompTasks] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const groupedByTags = groupByTag(tasks)

  useEffect(() => {
    setTasks(store)
  }, [store])

  const taskOpenHandle = (task) => {
    setCurrTask(task)
    onOpen()
  }
  const toggleCompTasks = () => {
    setShowCompTasks(!showCompTasks)
    showCompTasks && setCompTasks(tasks.filter((t) => t.done))
  }

  // const updateTest = () => {
  //   if (store && store.untagged) {
  //     update({ ...store.untagged[0], name: 'juijo' })
  //     console.log(store.untagged)
  //   }
  // }

  // const removeTask = () => {
  //   if (store && store.untagged) {
  //     remove('untagged', store.untagged[0].id)
  //   }
  // }

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
      {Object.keys(groupedByTags).map((tag, i) => (
        <VStack mt={'50px'} key={i}>
          <Text as='strong' fontSize='lg' align='left' w='full' mb='10px'>
            {capitalize(tag)}
          </Text>
          {groupedByTags[tag].map((t, i) => (
            <Task key={i} task={t} onOpen={taskOpenHandle} />
          ))}
        </VStack>
      ))}
      <TaskDrawer isOpen={isOpen} onClose={onClose} task={currTask} />
      <CompletedTasks
        show={showCompTasks && compTasks.length > 0}
        tasks={compTasks}
        onOpen={taskOpenHandle}
      />
    </Container>
  )
}

export default AllTasks
