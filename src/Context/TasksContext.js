import React, { createContext, useReducer } from 'react'
import TasksReducer from './TasksReducer'
import { getStore as getTasks } from '../helpers/lcs'

/**
 * sample format of a task:
 * {
 *    name: 'task text or name',
 *    tag: 'untagged',
 *    done: false,
 *    subtasks: [],
 *    description: ''
 * }
 */

const initialState = { tasks: getTasks() }
export const TasksContext = createContext(initialState)

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState)

  const toggle = (id) => dispatch({ type: 'toggle', id })

  const add = (task) => dispatch({ type: 'add', task })

  const addSubtask = (id, subtask) =>
    dispatch({ type: 'add_subtask', id, subtask })

  const toggleStar = (id) => dispatch({ type: 'star', id })

  const update = (newTask) => {
    console.log(newTask)
    dispatch({ type: 'updateOne', newTask })
  }

  const updateMany = (oldTag, newTag) =>
    dispatch({ type: 'updateMany', oldTag, newTag })

  const updateSubtask = (id, newSubtask) =>
    dispatch({ type: 'update_subtask', id, newSubtask })

  const remove = (id) => dispatch({ type: 'remove', id })

  const removeAllByTag = (tag) => dispatch({ type: 'removeAllByTag', tag })

  const removeSubtask = (id, subtask) =>
    dispatch({ type: 'remove_subtask', id, subtask })

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        toggle,
        toggleStar,
        add,
        addSubtask,
        update,
        updateMany,
        updateSubtask,
        remove,
        removeAllByTag,
        removeSubtask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
