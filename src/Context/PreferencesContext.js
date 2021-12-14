import React, { createContext, useReducer } from 'react'
import { setList } from '../firebase/controllers'
import PreferencesReducer from './reducers/PreferencesReducer'

export const defaultPrefs = {
  showCompletedTasks: false,
  sidebarTagsToggle: false,
  sorts: {
    'All Tasks': 'creation_date',
  },
}

const initialState = { loading: false, error: null, preferences: defaultPrefs }

export const PreferencesContext = createContext(initialState)

export const PreferencesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PreferencesReducer, initialState)

  const set = (preferences = {}) => dispatch({ type: 'set', preferences })

  const toggleShowCompletedTasks = () =>
    dispatch({ type: 'showCompletedTasks' })

  const setSortType = (page, newSort) =>
    dispatch({ type: 'sort', page, newSort })

  const sidebarTagsToggle = () => dispatch({ type: 'sidebarTagsToggle' })

  const backup = async () => {
    dispatch({ type: 'loading' })
    try {
      await setList(state.preferences, 'preferences')
    } catch (err) {
      dispatch({ type: 'error', error: err })
    }
  }

  return (
    <PreferencesContext.Provider
      value={{
        preferences: state.preferences,
        loading: state.loading,
        error: state.error,
        backup,
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
