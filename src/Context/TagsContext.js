import React, { createContext, useReducer } from 'react'
import { v1 as uuidv1 } from 'uuid'
import { setList } from '../firebase/controllers'
import TagsReducer from './reducers/TagsReducer'

const initialState = { loading: false, error: null, tags: [] }
export const TagsContext = createContext(initialState)

export const TagsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TagsReducer, initialState)

  const set = (tags = []) => {
    if (!tags.find((t) => t.tag === 'untagged')) {
      tags = [{ tag: 'untagged', id: uuidv1() }, ...tags]
    }
    dispatch({ type: 'set', tags })
  }

  const add = (tag) => {
    const id = uuidv1()
    dispatch({ type: 'add', tag: { id, name: tag } })
  }

  const update = (currTag, newTag) =>
    dispatch({ type: 'update', currTag, newTag })

  const remove = (tag) => dispatch({ type: 'remove', tag })

  const backup = async () => {
    dispatch({ type: 'loading' })
    try {
      await setList(state.tags, 'tags')
    } catch (err) {
      dispatch({ type: 'error', error: err })
    }
  }

  return (
    <TagsContext.Provider
      value={{
        tags: state.tags,
        loading: state.loading,
        error: state.error,
        backup,
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
