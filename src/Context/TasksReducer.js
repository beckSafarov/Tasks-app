import produce from 'immer'
import { updateArr } from '../helpers'
import { setStore as setTasks } from '../helpers/lcs'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'add':
      tasks.push(action.task)
      break
    case 'updateOne':
      tasks = updateArr(tasks, action.newTask)
      break
    case 'updateMany':
      tasks.forEach((task) => {
        if (task.tag === action.oldTag) {
          task.tag = action.newTag
        }
      })
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
  setTasks(draft.tasks)
})

export default TasksReducer
