import produce from 'immer'
import { updateArr } from '../helpers'
import { setStore } from '../helpers/lcs'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'toggle':
      const task = draft.tasks.find((t) => t.id === action.id)
      task.done = !task.done
      break
    case 'add':
      tasks.push(action.task)
      break
    case 'update':
      tasks = updateArr(tasks, action.newTask)
      break
    case 'remove':
      draft.tasks = tasks.filter((t) => t.id !== action.id)
      break
    case 'removeAllByTag':
      draft.tasks = tasks.filter((t) => t.tag !== action.tag)
      break
    default:
      return draft
  }
  setStore(draft.tasks)
})

export default TasksReducer
