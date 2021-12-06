import React, { createContext, useReducer } from 'react'
import { dataSchema } from '../firebase/config'
import { getUserData } from '../firebase/controllers'
import { getStore } from '../helpers/lcs'
import PreferencesReducer from './reducers/PreferencesReducer'

const defaultPrefs = {
  showCompletedTasks: false,
  sidebarTagsToggle: false,
  sorts: {
    'All Tasks': 'creation_date',
  },
}

const initialState = {
  preferences: defaultPrefs,
}

export const PreferencesContext = createContext(initialState)

export const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PreferencesReducer, initialState)

  const set = (preferences = {}) => dispatch({ type: 'set', preferences })

  const toggleShowCompletedTasks = () =>
    dispatch({ type: 'showCompletedTasks' })

  const setSortType = (page, newSort) =>
    dispatch({ type: 'sort', page, newSort })

  const sidebarTagsToggle = () => dispatch({ type: 'sidebarTagsToggle' })

  return (
    <PreferencesContext.Provider
      value={{
        preferences: state.preferences,
        set,
        toggleShowCompletedTasks,
        setSortType,
        sidebarTagsToggle,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}
