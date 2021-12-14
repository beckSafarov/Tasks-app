import produce, { current } from 'immer'

const PreferencesReducer = produce((draft, action) => {
  let { showCompletedTasks, sidebarTagsToggle } = draft.preferences
  switch (action.type) {
    case 'loading':
      draft.loading = true
      break
    case 'error':
      draft.loading = false
      draft.error = action.error
      break
    case 'set':
      draft.loading = false
      draft.preferences = { ...draft.preferences, ...action.preferences }
      break
    case 'showCompletedTasks':
      draft.preferences.showCompletedTasks = !showCompletedTasks
      break
    case 'sort':
      draft.preferences.sorts[action.page] = action.newSort
      break
    case 'sidebarTagsToggle':
      draft.preferences.sidebarTagsToggle = !sidebarTagsToggle
      break
    default:
      return draft
  }
})

export default PreferencesReducer
