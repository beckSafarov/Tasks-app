import { useState, useContext, useEffect } from 'react'
import {
  HStack,
  VStack,
  Text,
  Container,
  useDisclosure,
} from '@chakra-ui/react'
import AddTask from '../components/AddTask'
import Task from '../components/Task'
import TaskDrawer from '../components/TaskDrawer'
import { capitalize, categorize, getTasksPerTag } from '../helpers'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'
import TaskHeader from '../components/TaskHeader'
import { TagsContext } from '../Context/TagsContext'

const AllTasks = () => {
  const { tasks: store, remove } = useContext(TasksContext)
  const { tags } = useContext(TagsContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [tasks, setTasks] = useState([])
  const [showCompTasks, setShowCompTasks] = useState(false)
  const [currTask, setCurrTask] = useState({})
  const taggedTasks = getTasksPerTag(tags, store)
  // console.log(taggedTasks)
  useEffect(() => {
    setTasks(store)
  }, [store])

  const taskOpenHandle = (task) => {
    setCurrTask(task)
    onOpen()
  }

  const toggleCompTasks = () => setShowCompTasks((v) => !v)

  const deleteTheFirst = () => remove(tasks[0].id)

  return (
    <>
      <TaskHeader
        onSearchSubmit={(v) => console.log(v)}
        showCompTasks={showCompTasks}
        toggleCompTasks={toggleCompTasks}
      />
      <Container maxW='container.lg' pt={10}>
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
    </>
  )
}

export default AllTasks
