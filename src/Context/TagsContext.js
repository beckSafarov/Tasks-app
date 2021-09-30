import React, { createContext, useReducer } from 'react'
import { getTags } from '../helpers/lcs'
import { v1 as uuidv1 } from 'uuid'
import TagsReducer from './TagsReducer'

const initialState = { tags: getTags() }
export const TagsContext = createContext(initialState)

export const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TagsReducer, initialState)

  // @param: tag: String
  const add = (tag) => {
    const id = uuidv1()
    dispatch({ type: 'add', id, tag })
  }

  const update = (currTag, newTag) =>
    dispatch({ type: 'update', currTag, newTag })

  const remove = (tag) => dispatch({ type: 'remove', tag })

  return (
    <TagsContext.Provider
      value={{
        tags: state.tags,
        add,
        update,
        remove,
      }}
    >
      {children}
    </TagsContext.Provider>
  )
}
