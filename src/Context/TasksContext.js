import React, { createContext, useReducer } from 'react'
import TasksReducer from './TasksReducer'
import { getStore as getTasks } from '../helpers/lcs'

const initialState = { tasks: getTasks() }
export const taskSchema = {
  name: '',
  tag: '',
  done: false,
  subtasks: [],
  description: '',
  // dueDate: {}
}
export const TasksContext = createContext(initialState)

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState)

  const add = (task) => dispatch({ type: 'add', task })

  const update = (newTask) => dispatch({ type: 'updateOne', newTask })

  const updateMany = (oldTag, newTag) =>
    dispatch({ type: 'updateMany', oldTag, newTag })

  const remove = (id) => dispatch({ type: 'remove', id })

  const removeAllByTag = (tag) => dispatch({ type: 'removeAllByTag', tag })

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        add,
        update,
        updateMany,
        remove,
        removeAllByTag,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
