import produce from 'immer'
import { updateArr } from '../helpers'
import { add, update, setStore } from '../helpers/tasksLCS'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'toggle':
      for (let i = 0; i < tasks.length; i++) {
        if (action.id === tasks[i].id) {
          tasks[i].done = !tasks[i].done
          update({ id: action.id, done: tasks[i].done })
          break
        }
      }
      break
    case 'add':
      tasks.push(action.task)
      add(action.task)
      break
    case 'update':
      tasks = updateArr(tasks, action.newTask)
      setStore(tasks)
      break
    case 'remove':
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === action.id) {
          tasks.splice(i, 1)
          setStore(tasks)
          break
        }
      }
      break
    default:
      return draft
  }
})

export default TasksReducer
