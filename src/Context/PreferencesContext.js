import React, { createContext, useReducer } from 'react'
import { getStore } from '../helpers/lcs'
import PreferencesReducer from './PreferencesReducer'

const defaultPrefs = {
  showCompletedTasks: false,
  sortType: 'creation_date',
  sidebarTagsToggle: false,
}

const initialState = {
  preferences: getStore(defaultPrefs, 'preferences'),
}

export const PreferencesContext = createContext(initialState)

export const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PreferencesReducer, initialState)

  const toggleShowCompletedTasks = () =>
    dispatch({ type: 'showCompletedTasks' })

  const setSortType = (newType) => dispatch({ type: 'sortType', newType })

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
