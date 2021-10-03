import produce from 'immer'
import { setStore } from '../helpers/lcs'

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
  setStore(draft.preferences, 'preferences')
})

export default PreferencesReducer
