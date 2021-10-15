import produce, { current } from 'immer'
import { updateArr } from '../helpers'
import { setStore as setTasks } from '../helpers/lcs'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  let task
  switch (action.type) {
    case 'toggle':
      task = draft.tasks.find((t) => t.id === action.id)
      task.done = !task.done
      break
    case 'add':
      tasks.push(action.task)
      break
    case 'add_subtask':
      task = draft.tasks.find((t) => t.id === action.id)
      task.subtasks.push(action.subtask)
      break
    case 'star':
      task = draft.tasks.find((t) => t.id === action.id)
      task.starred = task.starred ? null : { date: new Date() }
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
    case 'update_subtask':
      task = draft.tasks.find((t) => t.id === action.id)
      let subtask = task.subtasks.find((t) => t.id === action.newSubtask.id)
      subtask.text = action.newSubtask.text
      break
    case 'remove':
      draft.tasks = tasks.filter((t) => t.id !== action.id)
      break
    case 'removeAllByTag':
      draft.tasks = tasks.filter((t) => t.tag !== action.tag)
      break
    case 'remove_subtask':
      task = draft.tasks.find((t) => t.id === action.id)
      task.subtasks = task.subtasks.filter((t) => t.id !== action.subtask.id)
      break
    default:
      return draft
  }
  setTasks(draft.tasks)
})

export default TasksReducer
