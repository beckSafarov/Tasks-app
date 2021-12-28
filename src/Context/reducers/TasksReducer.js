import produce, { current } from 'immer'

const TasksReducer = produce((draft, action) => {
  switch (action.type) {
    case 'loading':
      draft.loading = !draft.loading
      break
    case 'error':
      draft.error = action.error
      break
    case 'set':
      draft.data = action.data
      break
    case 'add':
      draft.data.push(action.task)
      break
    case 'update':
      draft.data = draft.data.map((t) =>
        t[action.prop] === action.propVal ? { ...t, ...action.updates } : t
      )
      break
    case 'remove':
      draft.data = draft.data.filter((t) => t[action.prop] !== action.propVal)
      break
    default:
      return draft
  }
})

export default TasksReducer
