import React, { createContext, useReducer } from 'react'
import { removeTaskOrTag } from '../firebase/controllers'
import { addTaskToDB, updateOneOrMore } from '../firebase/tasksControllers'
import TasksReducer from './reducers/TasksReducer'

const initialState = { data: [], loading: false, error: null }
export const TasksContext = createContext(initialState)

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TasksReducer, initialState)

  const add = (task) => dispatch({ type: 'add', task })

  const set = (data = {}) => dispatch({ type: 'set', data })

  const update = (updates, prop, propVal) => {
    dispatch({ type: 'update', prop, propVal, updates })
  }

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

  const remove = (prop, propVal) => dispatch({ type: 'remove', prop, propVal })

  const removeById = (id) =>
    dispatch({ type: 'remove', prop: 'id', propVal: id })

  const removeByTag = (tagName) =>
    dispatch({ type: 'remove', prop: 'tag', propVal: tagName })

  const backup = async (data = state.data, updateType, prop, propVal) => {
    dispatch({ type: 'loading' })
    try {
      switch (updateType) {
        case 'add':
          await addTaskToDB(data)
          break
        case 'update':
          await updateOneOrMore(prop, propVal, data)
          break
        case 'remove':
          await removeTaskOrTag(propVal, 'tasks', prop)
          break
        default:
          break
      }
      dispatch({ type: 'loading' })
    } catch (err) {
      dispatch({ type: 'loading' })
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
        update,
        updateById,
        updateTag,
        remove,
        removeById,
        removeByTag,
        backup,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const taskSchema = {
  name: '',
  tag: '',
  done: false,
  subtasks: [],
  description: '',
  // dueDate: {}
}
