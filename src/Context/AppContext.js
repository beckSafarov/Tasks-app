import React, { createContext, useReducer } from 'react'
import { getUserData, setUserData } from '../firebase/controllers'
import { dataSchema } from '../firebase/config'
import produce, { current } from 'immer'

const initialState = {
  loading: false,
  user: {},
  data: {},
  error: null,
}
export const AppContext = createContext(initialState)

const AppReducer = produce((draft, action) => {
  draft.loading = action.type === 'request_loading'
  draft.error = action.error || null
  switch (action.type) {
    case 'setData':
      draft.data = { ...draft.data, ...action.data }
      break
    case 'setUser':
      draft.user = { ...draft.user, ...action.user }
      break
    default:
      return draft
  }
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const getData = async (uid) => {
    dispatch({ type: 'request_loading' })
    try {
      const data = await getUserData(dataSchema, uid)
      dispatch({ type: 'setData', data })
    } catch (error) {
      dispatch({ type: 'request_failure', error })
    }
  }

  const setData = async (newData) => {
    dispatch({ type: 'request_loading' })
    try {
      const updated = await setUserData(newData, state.data)
      dispatch({ type: 'set', data: updated })
    } catch (err) {
      dispatch({ type: 'request_failure', error: err })
    }
  }

  const setUser = ({ displayName, email, uid, photoURL }) => {
    dispatch({
      type: 'setUser',
      user: { name: displayName, email, uid, photoURL },
    })
  }

  return (
    <AppContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        data: state.data,
        user: state.user,
        getData,
        setData,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
