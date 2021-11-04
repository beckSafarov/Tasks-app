import React from 'react'
import { PreferencesProvider } from './PreferencesContext'
import { TagsProvider } from './TagsContext'
import { TasksProvider } from './TasksContext'
import { UserProvider } from './UserContext'

const ContextProviders = ({ children }) => {
  return (
    <TasksProvider>
      <TagsProvider>
        <PreferencesProvider>
          <UserProvider>{children}</UserProvider>
        </PreferencesProvider>
      </TagsProvider>
    </TasksProvider>
  )
}

export default ContextProviders
