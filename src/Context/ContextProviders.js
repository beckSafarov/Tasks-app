import React from 'react'
import { PreferencesProvider } from './PreferencesContext'
import { TagsProvider } from './TagsContext'
import { TasksProvider } from './TasksContext'

const ContextProviders = ({ children }) => {
  return (
    <TasksProvider>
      <TagsProvider>
        <PreferencesProvider>{children}</PreferencesProvider>
      </TagsProvider>
    </TasksProvider>
  )
}

export default ContextProviders
