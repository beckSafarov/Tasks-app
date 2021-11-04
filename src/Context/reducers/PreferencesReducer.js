import produce from 'immer'
import { setStore } from '../../helpers/lcs'

const PreferencesReducer = produce((draft, action) => {
  let { showCompletedTasks, sidebarTagsToggle } = draft.preferences
  switch (action.type) {
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
  setStore(draft.preferences, 'preferences')
})

export default PreferencesReducer
