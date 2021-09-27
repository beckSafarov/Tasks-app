import React from 'react'
import { TagsProvider } from './TagsContext'
import { TasksProvider } from './TasksContext'

const ContextProviders = ({ children }) => {
  return (
    <TasksProvider>
      <TagsProvider>{children}</TagsProvider>
    </TasksProvider>
  )
}

export default ContextProviders
