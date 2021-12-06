import React, { createContext, useReducer } from 'react'
import { v1 as uuidv1 } from 'uuid'
import TagsReducer from './reducers/TagsReducer'

const initialState = { tags: [] }
export const TagsContext = createContext(initialState)

export const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TagsReducer, initialState)

  const set = (tags = {}) => dispatch({ type: 'set', tags })

  const add = (tag) => {
    const id = uuidv1()
    dispatch({ type: 'add', tag: { id, name: tag } })
  }

  const update = (currTag, newTag) =>
    dispatch({ type: 'update', currTag, newTag })

  const remove = (tag) => dispatch({ type: 'remove', tag })

  return (
    <TagsContext.Provider
      value={{
        tags: state.tags,
        set,
        add,
        update,
        remove,
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}
