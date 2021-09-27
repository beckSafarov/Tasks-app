import produce from 'immer'
import { updateArr } from '../helpers'
import { setStore } from '../helpers/tasksLCS'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'toggle':
      const task = draft.tasks.find((t) => t.id === action.id)
      task.done = !task.done
      setStore(draft.tasks)
      break
    case 'add':
      tasks.push(action.task)
      setStore(tasks)
      break
    case 'update':
      tasks = updateArr(tasks, action.newTask)
      setStore(tasks)
      break
    case 'remove':
      draft.tasks = tasks.filter((t) => t.id !== action.id)
      setStore(draft.tasks)
      break
    default:
      return draft
  }
})

export default TasksReducer
