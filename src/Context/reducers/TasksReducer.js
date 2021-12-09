import produce, { current } from 'immer'

const TasksReducer = produce((draft, action) => {
  switch (action.type) {
    case 'set':
      draft.data = action.data
      break
    case 'add':
      draft.data.push(action.task)
      break
    case 'update':
      for (let t in draft.data) {
        if (t[action.prop] === action.propVal) {
          t = { ...t, ...action.updates }
        }
      }
      break
    case 'remove':
      draft.data = draft.data.filter(
        (t) => t[action.prop] !== action[action.propVal]
      )
      break
    default:
      return draft
  }
})

export default TasksReducer
