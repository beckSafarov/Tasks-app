import produce, { current } from 'immer'
import { setStore } from '../../helpers/lcs'

const PreferencesReducer = produce((draft, action) => {
  let { showCompletedTasks, sidebarTagsToggle } = draft.preferences
  switch (action.type) {
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
    case 'lastSelectedTag':
      draft.preferences.lastSelectedTag = action.lastSelectedTag
      break
    default:
      return draft
  }
  setStore('prefs', draft.preferences)
})

export default PreferencesReducer
