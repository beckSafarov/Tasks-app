import React from 'react'
import { PreferencesProvider } from './PreferencesContext'
import { TagsProvider } from './TagsContext'
import { TasksProvider } from './TasksContext'
import { AppProvider } from './AppContext'

const ContextProviders = ({ children }) => {
  return (
    <TasksProvider>
      <TagsProvider>
        <PreferencesProvider>
          <AppProvider>{children}</AppProvider>
        </PreferencesProvider>
      </TagsProvider>
    </TasksProvider>
  )
}

export default ContextProviders
