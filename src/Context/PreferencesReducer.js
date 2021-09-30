import produce from 'immer'
import { setPreferences } from '../helpers/lcs'

const PreferencesReducer = produce((draft, action) => {
  let { showCompletedTasks, sidebarTagsToggle, sortType } = draft.preferences
  switch (action.type) {
    case 'showCompletedTasks':
      draft.preferences.showCompletedTasks = !showCompletedTasks
      break
    case 'sortType':
      draft.preferences.sortType = action.newType
      break
    case 'sidebarTagsToggle':
      draft.preferences.sidebarTagsToggle = !sidebarTagsToggle
      break
    default:
      return draft
  }
  setPreferences(draft.preferences)
})

export default PreferencesReducer
