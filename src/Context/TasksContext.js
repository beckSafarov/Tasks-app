import React, { createContext, useReducer } from 'react'
import { setList } from '../firebase/controllers'
import TasksReducer from './reducers/TasksReducer'

export const taskSchema = {
  name: '',
  tag: '',

  done: false,
  subtasks: [],
  description: '',
  // dueDate: {}
}

const initialState = { data: [], loading: false, error: null }
export const TasksContext = createContext(initialState)

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState)

  const add = (task) => dispatch({ type: 'add', task })

  const set = (data = {}) => dispatch({ type: 'set', data })

  const updateById = (updatedTask) => {
    dispatch({
      type: 'update',
      prop: 'id',
      propVal: updatedTask.id,
      updates: updatedTask,
    })
  }

  const updateTag = (currTag, newTag) => {
    dispatch({
      type: 'update',
      prop: 'tag',
      propVal: currTag,
      updates: { tag: newTag },
    })
  }

  const removeById = (id) =>
    dispatch({ type: 'remove', prop: 'id', propVal: id })

  const removeByTag = (tagName) =>
    dispatch({ type: 'remove', prop: 'tag', propVal: tagName })

  const backup = async (updatedData = state.data) => {
    dispatch({ type: 'loading' })
    try {
      console.log(updatedData)
      await setList(updatedData, 'tasks')
    } catch (err) {
      dispatch({ type: 'error', error: err })
    }
  }

  return (
    <TasksContext.Provider
      value={{
        data: state.data,
        loading: state.loading,
        error: state.error,
        set,
        add,
        updateById,
        updateTag,
        removeById,
        removeByTag,
        backup,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
