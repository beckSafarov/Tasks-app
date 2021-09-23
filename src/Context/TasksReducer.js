import produce from 'immer'
import { updateArr } from '../helpers'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'toggle':
      for (let i = 0; i < tasks.length; i++) {
        if (action.id === tasks[i].id) {
          tasks[i].done = !tasks[i].done
          break
        }
      }
      break
    case 'add':
      tasks.push(action.task)
      break
    case 'update':
      tasks = updateArr(tasks, action.newTask)
      break
    case 'remove':
      tasks = tasks.filter((t) => t.id !== action.id)
      break
    default:
      return draft
  }
})

export default TasksReducer
