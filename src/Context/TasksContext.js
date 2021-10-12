import React, { createContext, useReducer } from 'react'
import TasksReducer from './TasksReducer'
import { v4 as uuid4 } from 'uuid'
import { getTasks } from '../helpers/lcs'

const initialState = { tasks: getTasks() }
export const TasksContext = createContext(initialState)

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState)

  const toggle = (id) => dispatch({ type: 'toggle', id })

  const add = (task) => {
    task.id = uuid4()
    if (!task.tag) task.tag = 'untagged'
    dispatch({
      type: 'add',
      task,
    })
  }

  const update = (newTask) => dispatch({ type: 'update', newTask })

  const updateMany = (oldTag, newTag) =>
    dispatch({ type: 'updateMany', oldTag, newTag })

  const remove = (id) => dispatch({ type: 'remove', id })

  const removeAllByTag = (tag) => dispatch({ type: 'removeAllByTag', tag })

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        toggle,
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
