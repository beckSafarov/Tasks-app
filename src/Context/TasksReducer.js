import produce from 'immer'
import { updateArr } from '../helpers'
import { setTasks } from '../helpers/lcs'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'toggle':
      const task = draft.tasks.find((t) => t.id === action.id)
      task.done = !task.done
      setTasks(draft.tasks)
      break
    case 'add':
      tasks.push(action.task)
      setTasks(tasks)
      break
    case 'update':
      tasks = updateArr(tasks, action.newTask)
      setTasks(tasks)
      break
    case 'remove':
      draft.tasks = tasks.filter((t) => t.id !== action.id)
      setTasks(draft.tasks)
      break
    default:
      return draft
  }
})

export default TasksReducer
