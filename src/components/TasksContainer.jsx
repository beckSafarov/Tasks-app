// --- UI components ---
import {
  HStack,
  VStack,
  Container,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import Task from './Task'
import TaskDrawer from './TaskDrawer'
import TaskHeader from './TaskHeader'
import ConfirmModal from './ConfirmModal'
import SkeletonStack from './SkeletonStack'

// --- library methods & custom hooks ---
import { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import useTasksMethods from '../hooks/useTasksMethods'

// --- helper methods ---
import { groupByBinaryProp as group, rgxSearch } from '../helpers'
import { sortTasks } from '../helpers/tasksHelpers'

// --- context stuff ---
import AddTask2 from './AddTask2'
import {
  usePrefsContext,
  useTagsContext,
  useTasksContext,
} from '../hooks/ContextHooks'

// default props for error toasts
const toastDefs = {
  duration: 4000,
  isClosable: true,
  variant: 'subtle',
  position: 'bottom-right',
  status: 'error',
}

const TasksContainer = ({
  loading,
  store: tasksFromDB,
  title,
  tag,
  defaultDate,
  page,
  error,
}) => {
  const {
    preferences: prefs,
    toggleShowCompletedTasks,
    setSortType,
  } = usePrefsContext()
  const {
    isOpen: isConfOpen,
    onOpen: onConfOpen,
    onClose: onConfClose,
  } = useDisclosure()
  const { tags, remove: removeTag } = useTagsContext()
  const { set: setTasksContext, backup } = useTasksContext()

  const { positives: dones, negatives: undones } = group(tasksFromDB)

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

  // variables
  const toast = useToast()
  const history = useHistory()
  const sortType = prefs?.sorts?.[page] || 'creationDate'
  const loadTasks =
    tasksFromDB.length > 0 && tasks.length === 0 && compTasks.length === 0

  useEffect(() => {
    if (loadTasks) {
      setTasks(undones)
      setCompTasks(dones)
    }

    if (error)
      toast({
        ...toastDefs,
        title: 'Firebase Error',
        description: error,
      })
  }, [tasksFromDB, tag, error])

  // when a task is clicked, it opens the taskDrawer
  const taskOpenHandle = (task) => {
    setSelectedTask(task)
    setOpenTaskBar(true)
  }

  // backup updated tasks to the context and db
  const runBackup = (newTasks, timer = 800) => {
    setTimeout(() => {
      console.log('saving the changes...')
      setTasksContext(newTasks)
      backup(newTasks)
    }, timer)
  }

  const addTask = (t) => {
    setTasks([...tasks, t])
    runBackup([...tasks, t], 200)
  }

  const updateTasks = (updates, prop, propVal) => {
    const updatedTasks = tasks.map((t) =>
      t[prop] === propVal ? { ...t, ...updates } : t
    )
    setTasks(updatedTasks)
    runBackup(updatedTasks)
  }

  const removeTasks = (prop, propVal) => {
    const filteredTasks = tasks.filter((t) => t[prop] !== propVal)
    setTasks(filteredTasks)
    runBackup(filteredTasks, 400)
  }

  // toggle a task to be completed or back to incompleted
  const toggleCompTasks = () => {
    setShowCompTasks((v) => !v)
    toggleShowCompletedTasks()
  }

  // receives a search keyword and searches through task names
  const onSearch = (keyword) => {
    const res = rgxSearch(tasksFromDB, keyword)
    const { positives, negatives } = group(res)
    if (positives.length > 0 || negatives.length > 0) {
      setTasks(negatives)
      setCompTasks(positives)
      setShowCompTasks(positives.length > 0)
    } else {
      toast({
        ...toastDefs,
        title: 'Search failed',
        description: `No result found for ${keyword}`,
      })
    }
  }

  // clears the search result and brings back the initial task list
  const onSearchClear = () => {
    setTasks(undones, sortType, tags)
    setShowCompTasks(prefs?.showCompletedTasks || true)
    setCompTasks(dones, sortType, tags)
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
      removeTasks('id', deletingTask.id)
      setOpenTaskBar(false)
    }
  }

  // receives and sets a new sort type for tasks
  const sortTypeHandler = (type) => {
    if (sortType !== type) {
      setSortType(page, type)
      setTasks(undones, type, tags)
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
      removeTasks('tag', tag)
      history.push('/')
    }
  }

  return (
    <>
      <TaskHeader
        title={title}
        loading={loading}
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={showCompTasks}
        toggleCompTasks={toggleCompTasks}
        sortType={sortType}
        onSort={sortTypeHandler}
        page={page}
        removeTasksByTag={removeTasksByTag}
      />
      <Container id='container' maxW='container.md' pt={10}>
        <HStack mt={'30px'} w='full'>
          <AddTask2
            defaultTag={tag || 'untagged'}
            defaultDate={defaultDate}
            page={page}
            onSubmit={addTask}
          />
        </HStack>
        <VStack mt={tasks.length > 0 ? '50px' : '0'}>
          <SkeletonStack show={loading} />
          {!loading &&
            sortTasks(tasks, sortType, tags).map((task, i) => (
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
          onUpdate={(updates) => updateTasks(updates, 'id', updates.id)}
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

TasksContainer.defaultProps = {
  store: [],
  page: 'All Tasks',
  title: 'All Tasks',
}

export default TasksContainer
// if (positives.length > 0) {
//   setCompTasks(positives)
//   setShowCompTasks(true)
// } else {
//   setShowCompTasks(false)
// }
