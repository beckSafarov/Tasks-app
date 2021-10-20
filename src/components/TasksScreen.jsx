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
import { useHistory } from 'react-router'

// --- helper methods ---
import { groupByBinaryProp as group, rgxSearch } from '../helpers'
import { sortTasks } from '../helpers/tasksHelpers'

// --- context stuff ---
import { TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import { PreferencesContext } from '../Context/PreferencesContext'

const TasksScreen = ({ store, tag, title }) => {
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
  const { positives: dones, negatives: undones } = group(store)

  const toast = useToast()
  const history = useHistory()
  const sortType = prefs.sorts[tag || title] || 'creationDate'

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

  useEffect(() => {
    setTasks(sortTasks(undones, sortType, tags))
    setCompTasks(sortTasks(dones, sortType, tags))
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

  // receives and sets a new sort type for tasks
  const sortTypeHandler = (type) => {
    if (sortType !== type) {
      setSortType(tag || title, type)
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
        isMainPage={!tag ? true : false}
        removeTasksByTag={removeTasksByTag}
      />
      <Container id='container' maxW='container.md' pt={10}>
        <HStack mt={'30px'} w='full'>
          <AddTask tag={tag} />
        </HStack>
        <VStack mt={tasks.length > 0 ? '50px' : '0'}>
          {tasks.map((task, i) => (
            <Task
              key={i}
              task={task}
              onOpen={taskOpenHandle}
              onDelete={taskDeleteHandler}
              isMainPage={!tag ? true : false}
              sortType={sortType}
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
              isMainPage={!tag ? true : false}
              sortType={sortType}
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
  tag: '',
  title: 'All tasks',
}

export default TasksScreen
