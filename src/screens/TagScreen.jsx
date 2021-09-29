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
import { capitalize, findPropByVal, hasProp } from '../helpers'
import CompletedTasks from '../components/CompletedTasks'
import { TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import TaskHeader from '../components/TaskHeader'

const TagScreen = ({ history, location }) => {
  const { tasks: store } = useContext(TasksContext)
  const { tags } = useContext(TagsContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const tagId = location.pathname.split('/').slice(-1)[0]
  const tag = findPropByVal(tags, tagId)

  const [currTask, setCurrTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(false)
  const [tasks, setTasks] = useState([])

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

  const compTasksHandler = () => setShowCompTasks(!showCompTasks)

  const onSearch = (keyword) => {
    console.log(keyword)
  }

  return (
    <>
      <TaskHeader
        title={capitalize(tag)}
        onSearchSubmit={onSearch}
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
          tag={tag}
          onOpen={taskOpenHandle}
        />
      </Container>
    </>
  )
}

export default TagScreen
