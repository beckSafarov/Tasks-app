// --- UI components ---
import {
  HStack,
  VStack,
  Container,
  useDisclosure,
  useToast,
  Box,
} from '@chakra-ui/react'
import Task from './Task'
import TaskDrawer from './TaskDrawer'
import TaskHeader from './TaskHeader'
import ConfirmModal from '../Modals/ConfirmModal'
import AddTask from './AddTask'
import SkeletonLoading from '../SkeletonLoading'

// --- library methods & custom hooks ---
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

// --- helper methods ---
import { rgxSearch } from '../../helpers'
import { sortTasks, toastDefs } from '../../helpers/tasksHelpers'

// --- context stuff ---
import {
  usePrefsContext,
  useTagsContext,
  useTasksContext,
} from '../../hooks/ContextHooks'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const TasksContainer = ({
  store: tasksFromDB,
  loading: pageTasksLoading,
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
    set: setPrefs,
  } = usePrefsContext()
  const {
    isOpen: isConfOpen,
    onOpen: onConfOpen,
    onClose: onConfClose,
  } = useDisclosure()
  const { tags, remove: removeTag } = useTagsContext()
  const {
    set: setTasksContext,
    backup,
    update: updateTasksInContext,
    remove: removeTasksInContext,
    add: addTaskInContext,
  } = useTasksContext()

  // hooks
  const [tasks, setTasks] = useState([])
  const [taskDrawer, setTaskDrawer] = useState({})
  const [showCompTasks, setShowCompTasks] = useState(false)
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
  const areTasksHidden = tasks.length === 0 || pageTasksLoading
  const isCompTasksHidden =
    (!prefs.showCompletedTasks && !showCompTasks) || areTasksHidden

  useEffect(() => {
    setTasks(tasksFromDB)

    if (error)
      toast({
        ...toastDefs,
        title: 'Firebase Error',
        description: error,
      })
  }, [tasksFromDB, tag, error])

  const handleOpenTaskDrawer = (task) => {
    setTaskDrawer({ task, open: true })
  }

  const handleCloseTaskDrawer = () => {
    setTaskDrawer((t) => ({ ...t, open: false }))
  }

  // backup updated tasks to the context and db
  const runBackup = (data, updateType, prop, propVal, timer = 800) => {
    setTimeout(() => {
      switch (updateType) {
        case 'add':
          addTaskInContext(data)
          break
        case 'update':
          updateTasksInContext(data, prop, propVal)
          break
        case 'remove':
          removeTasksInContext(prop, propVal)
          break
      }
      backup(data, updateType, prop, propVal)
    }, timer)
  }

  const addTask = (t) => {
    setTasks([...tasks, t])
    runBackup(t, 'add', 0, 0, 200)
  }

  const updateTasks = (updates, prop, propVal, timer) => {
    const updatedTasks = tasks.map((t) =>
      t[prop] === propVal ? { ...t, ...updates } : t
    )
    setTasks(updatedTasks)
    runBackup(updates, 'update', prop, propVal, timer)
  }

  const removeTasks = (prop, propVal) => {
    const filteredTasks = tasks.filter((t) => t[prop] !== propVal)
    setTasks(filteredTasks)
    runBackup([], 'remove', prop, propVal, 400)
  }

  // toggle a task to be completed or back to incompleted
  const toggleCompTasks = () => toggleShowCompletedTasks()

  // receives a search keyword and searches through task names
  const onSearch = (keyword) => {
    const res = rgxSearch(tasksFromDB, keyword)
    if (res.length > 0) {
      setTasks(res)
      setShowCompTasks(res.filter((t) => t.done).length > 0)
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
    setTasks(tasksFromDB, sortType, tags)
    setShowCompTasks(0)
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
      setTaskDrawer({})
    }
  }

  // receives and sets a new sort type for tasks
  const sortTypeHandler = (type) => setSortType(page, type)

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
        onSearchSubmit={onSearch}
        onSearchClear={onSearchClear}
        showCompTasks={prefs.showCompletedTasks}
        toggleCompTasks={toggleCompTasks}
        sortType={sortType}
        onSort={sortTypeHandler}
        page={page}
        removeTasksByTag={removeTasksByTag}
      />
      <Container id='container' maxW='container.md' pt={10}>
        <HStack mt={'30px'} w='full'>
          <AddTask
            defaultTag={tag}
            defaultDate={defaultDate}
            page={page}
            onSubmit={addTask}
          />
        </HStack>

        <Box hidden={!pageTasksLoading} pt='50px'>
          <SkeletonLoading show={pageTasksLoading} count={5} />
        </Box>
        <VStack pt='50px' hidden={areTasksHidden}>
          {sortTasks(
            tasks.filter((t) => !t.done),
            sortType,
            tags
          ).map((task) => (
            <Task
              key={task.id}
              task={task}
              onOpen={handleOpenTaskDrawer}
              active={taskDrawer.open && taskDrawer.task.id === task.id}
              onDelete={taskDeleteHandler}
              page={page}
              onUpdate={(updates) => updateTasks(updates, 'id', task.id, 200)}
            />
          ))}
        </VStack>
        <TaskDrawer
          show={taskDrawer.open}
          onClose={handleCloseTaskDrawer}
          task={taskDrawer.task}
          tags={tags}
          onDelete={taskDeleteHandler}
          transition={'0.2s'}
          onUpdate={(u) => updateTasks(u, 'id', u.id)}
        />

        {/* completed tasks */}
        <VStack pt='50px' id='completed_tasks_div' hidden={isCompTasksHidden}>
          {sortTasks(
            tasks.filter((t) => t.done),
            sortType,
            tags
          ).map((t) => (
            <Task
              key={t.id}
              task={t}
              active={taskDrawer.open && taskDrawer.task.id === t.id}
              onOpen={handleOpenTaskDrawer}
              onDelete={taskDeleteHandler}
              page={page}
              onUpdate={(u) => updateTasks(u, 'id', t.id, 10)}
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
