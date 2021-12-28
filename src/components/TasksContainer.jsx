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
import AddTask from './AddTask'

// --- library methods & custom hooks ---
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

// --- helper methods ---
import { rgxSearch } from '../helpers'
import { sortTasks, toastDefs } from '../helpers/tasksHelpers'

// --- context stuff ---
import {
  usePrefsContext,
  useTagsContext,
  useTasksContext,
} from '../hooks/ContextHooks'

const TasksContainer = ({
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
  const {
    set: setTasksContext,
    backup,
    update: updateTasksInContext,
    remove: removeTasksInContext,
    add: addTaskInContext,
  } = useTasksContext()

  // hooks
  const [tasks, setTasks] = useState([])
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

  useEffect(() => {
    setTasks(tasksFromDB)

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
  const toggleCompTasks = () => {
    setShowCompTasks((v) => !v)
    toggleShowCompletedTasks()
  }

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
    setShowCompTasks(prefs?.showCompletedTasks || true)
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
        showCompTasks={showCompTasks}
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
        <VStack mt={tasks.length > 0 ? '50px' : '0'}>
          <SkeletonStack show={false} />
          {1 !== 0 &&
            sortTasks(
              tasks.filter((t) => !t.done),
              sortType,
              tags
            ).map((task, i) => (
              <Task
                key={i}
                task={task}
                onOpen={taskOpenHandle}
                onDelete={taskDeleteHandler}
                page={page}
                onUpdate={(updates) => updateTasks(updates, 'id', task.id, 200)}
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
          onUpdate={(u) => updateTasks(u, 'id', u.id)}
        />

        {/* completed tasks */}
        <VStack mt='50px' id='completed_tasks_div' hidden={!showCompTasks}>
          {sortTasks(
            tasks.filter((t) => t.done),
            sortType,
            tags
          ).map((t, i) => (
            <Task
              key={i}
              task={t}
              onOpen={taskOpenHandle}
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
// if (positives.length > 0) {
//   setCompTasks(positives)
//   setShowCompTasks(true)
// } else {
//   setShowCompTasks(false)
// }
