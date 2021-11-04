// --- UI components ---
import {
  HStack,
  VStack,
  Container,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import AddTask from './AddTask'
import Task from './Task'
import TaskDrawer from './TaskDrawer'
import TaskHeader from './TaskHeader'
import ConfirmModal from './ConfirmModal'

// --- library methods ---
import { useEffect, useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router'

// --- helper methods ---
import { groupByBinaryProp as group, rgxSearch } from '../helpers'
import { sortTasks, getPage } from '../helpers/tasksHelpers'

// --- context stuff ---
import { TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import { PreferencesContext } from '../Context/PreferencesContext'
import AddTask2 from './AddTask2'
import { UserContext } from '../Context/UserContext'
import { logout } from '../firebase/auth'

const TasksScreen = ({ store, title, tag, defaultDate }) => {
  const {
    preferences: prefs,
    toggleShowCompletedTasks,
    setSortType,
  } = useContext(PreferencesContext)
  const {
    isOpen: isConfOpen,
    onOpen: onConfOpen,
    onClose: onConfClose,
  } = useDisclosure()
  const { tags, remove: removeTag } = useContext(TagsContext)
  const { removeAllByTag, remove: removeTask } = useContext(TasksContext)
  const { resetUser } = useContext(UserContext)
  const { positives: dones, negatives: undones } = group(store)

  // hooks
  const [tasks, setTasks] = useState([])
  const [compTasks, setCompTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(prefs.showCompletedTasks)
  const [openTaskBar, setOpenTaskBar] = useState(false)
  const [confModal, setConfModal] = useState({
    title: '',
    body: '',
    onProceed: () => void 0,
    proceedTitle: 'Delete',
  })
  const [page, setPage] = useState('')

  // variables
  const toast = useToast()
  const history = useHistory()
  const sortType = prefs.sorts[page] || 'creationDate'
  const path = useLocation().pathname

  useEffect(() => {
    setTasks(sortTasks(undones, sortType, tags))
    setCompTasks(sortTasks(dones, sortType, tags))
    setPage(getPage(path, 'All Tasks'))
  }, [prefs, store, tag, title])

  // when a task is clicked, it opens the taskDrawer
  const taskOpenHandle = (task) => {
    setSelectedTask(task)
    setOpenTaskBar(true)
  }

  // toggle a task to be completed or back to incompleted
  const toggleCompTasks = () => {
    setShowCompTasks((v) => !v)
    toggleShowCompletedTasks()
  }

  // receives a search keyword and searches through task names
  const onSearch = (keyword) => {
    const res = rgxSearch(store, keyword)
    const { positives, negatives } = group(res)
    if (positives.length > 0 || negatives.length > 0) {
      setTasks(negatives)
      if (positives.length > 0) {
        setCompTasks(positives)
        setShowCompTasks(true)
      } else {
        setShowCompTasks(false)
      }
    } else {
      toast({
        title: 'Search failed',
        position: 'bottom-right',
        description: `No result found for ${keyword}`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'subtle',
      })
    }
  }

  // clears the search result and brings back the initial task list
  const onSearchClear = () => {
    setTasks(sortTasks(undones, sortType, tags))
    setShowCompTasks(prefs.showCompletedTasks)
    setCompTasks(sortTasks(dones, sortType, tags))
  }

  const taskDeleteHandler = (deletingTask = {}, warned = false) => {
    if (!warned) {
      setConfModal({
        title: `Task "${deletingTask.name}"" will be permanently deleted`,
        body: `You will not be able to reverse this action`,
        onProceed: () => taskDeleteHandler(deletingTask, true),
      })
      onConfOpen()
    } else {
      onConfClose()
      removeTask(deletingTask.id)
      setOpenTaskBar(false)
    }
  }

  const logoutHandler = async () => {
    const loggedOut = await logout()
    if (loggedOut) resetUser()
  }

  // receives and sets a new sort type for tasks
  const sortTypeHandler = (type) => {
    if (sortType !== type) {
      setSortType(page, type)
      setTasks(sortTasks(undones, type, tags))
    }
  }

  // delete a tag and tasks associated with it
  const removeTasksByTag = (warned = false) => {
    if (!warned) {
      setConfModal({
        title: `Tag "${tag}"" will be permanently deleted`,
        body: `All tasks associated with this tag will be permanently deleted, you will not be able to reverse this action!`,
        onProceed: () => removeTasksByTag(true),
      })
      onConfOpen()
    } else {
      removeTag(tag)
      removeAllByTag(tag)
      history.push('/')
    }
  }

  return (
    <>
      <TaskHeader
        title={title}
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={showCompTasks}
        toggleCompTasks={toggleCompTasks}
        sortType={sortType}
        onSort={sortTypeHandler}
        onLogout={logoutHandler}
        page={page}
        removeTasksByTag={removeTasksByTag}
      />
      <Container id='container' maxW='container.md' pt={10}>
        <HStack mt={'30px'} w='full'>
          {/* <AddTask defaultTag={tag || 'untagged'} defaultDate={defaultDate} /> */}
          <AddTask2
            defaultTag={tag || 'untagged'}
            defaultDate={defaultDate}
            page={page}
          />
        </HStack>
        <VStack mt={tasks.length > 0 ? '50px' : '0'}>
          {tasks.map((task, i) => (
            <Task
              key={i}
              task={task}
              onOpen={taskOpenHandle}
              onDelete={taskDeleteHandler}
              page={page}
            />
          ))}
        </VStack>
        <TaskDrawer
          show={openTaskBar}
          onClose={() => setOpenTaskBar(false)}
          task={selectedTask}
          tags={tags}
          onDelete={taskDeleteHandler}
          transition={'0.2s'}
        />

        {/* completed tasks */}
        <VStack
          mt='50px'
          id='completed_tasks_div'
          className={showCompTasks && compTasks.length > 0 ? '' : 'hidden'}
        >
          {compTasks.map((t, i) => (
            <Task
              key={i}
              task={t}
              onOpen={taskOpenHandle}
              onDelete={taskDeleteHandler}
              page={page}
              completed
            />
          ))}
        </VStack>
        <ConfirmModal
          title={confModal.title}
          body={confModal.body}
          onProceed={confModal.onProceed}
          onClose={onConfClose}
          isOpen={isConfOpen}
          proceedTitle={confModal.proceedTitle}
        />
      </Container>
    </>
  )
}

TasksScreen.defaultProps = {
  store: [],
  title: 'All tasks',
}

export default TasksScreen
