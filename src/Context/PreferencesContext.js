import React, { createContext, useReducer } from 'react'
import { mainPageLinks } from '../components/Sidebar'
import { collect } from '../helpers'
import { getStore } from '../helpers/lcs'
import PreferencesReducer from './reducers/PreferencesReducer'

export const defaultPrefs = {
  showCompletedTasks: false,
  sidebarTagsToggle: false,
  lastSelectedTag: 'untagged',
  lastSelectedDate: 'today',
  draggingSubTask: { id: '', text: '' },
  isSortAppliedToAllPages: false,
  soundWhenTaskToggled: true,
  sorts: {
    'All Tasks': 'creation_date',
  },
}

const initialState = { preferences: getStore('prefs', defaultPrefs) }

export const PreferencesContext = createContext(initialState)

export const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PreferencesReducer, initialState)

  const set = (preferences = {}) => dispatch({ type: 'set', preferences })

  const toggleShowCompletedTasks = () =>
    dispatch({ type: 'showCompletedTasks' })

  const toggleApplySortToAllPages = () => dispatch({ type: 'toggleSortAll' })

  const setSortType = (page, newSort) =>
    dispatch({ type: 'sort', page, newSort })

  const sortAll = (sortType, tags) => {
    const mainPages = mainPageLinks.map(({ text }) =>
      text !== 'All Tasks' ? text.toLowerCase() : text
    )
    const pages = mainPages.concat(collect(tags, 'tag'))
    dispatch({ type: 'sortAll', sortType, pages })
  }

  const sidebarTagsToggle = () => dispatch({ type: 'sidebarTagsToggle' })

  const setLastSelectedTag = (tagName) =>
    dispatch({ type: 'lastSelectedTag', lastSelectedTag: tagName })

  return (
    <PreferencesContext.Provider
      value={{
        preferences: state.preferences,
        set,
        toggleShowCompletedTasks,
        toggleApplySortToAllPages,
        setSortType,
        sortAll,
        sidebarTagsToggle,
        setLastSelectedTag,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}
