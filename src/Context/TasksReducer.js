import produce from 'immer'

const TasksReducer = produce((draft, action) => {
  let { tasks } = draft
  switch (action.type) {
    case 'toggle':
      const task = tasks.find((t) => t.id === action.id)
      task.done = !task.done
      break
    case 'add':
      tasks.push(action.task)
      break
    case 'update':
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === action.newTask.id) {
          console.log('efefe')
          tasks[i] = action.newTask
          break
        }
      }
      break
    case 'remove':
      tasks = tasks.filter((t) => t.id !== action.id)
      break
    default:
      return draft
  }
})

export default TasksReducer
