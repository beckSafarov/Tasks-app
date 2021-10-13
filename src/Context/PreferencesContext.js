import React, { createContext, useReducer } from 'react'
import { getStore } from '../helpers/lcs'
import PreferencesReducer from './PreferencesReducer'

const defaultPrefs = {
  showCompletedTasks: false,
  sidebarTagsToggle: false,
  sorts: {
    'All Tasks': 'creation_date',
  },
}

const initialState = {
  preferences: getStore(defaultPrefs, 'preferences'),
}

export const PreferencesContext = createContext(initialState)

export const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PreferencesReducer, initialState)

  const toggleShowCompletedTasks = () =>
    dispatch({ type: 'showCompletedTasks' })

  const setSortType = (page, newSort) =>
    dispatch({ type: 'sort', page, newSort })

  const sidebarTagsToggle = () => dispatch({ type: 'sidebarTagsToggle' })

  return (
    <PreferencesContext.Provider
      value={{
        preferences: state.preferences,
        toggleShowCompletedTasks,
        setSortType,
        sidebarTagsToggle,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}
