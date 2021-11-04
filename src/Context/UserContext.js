import { createContext, useReducer } from 'react'
import UserReducer from './reducers/UserReducer'

export const userSchema = {
  uid: '', //user.uid
  displayName: '', //user.displayName
  email: '', //user.email
  photoURL: '', //user.photoURL
}
const initialState = { user: userSchema }

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)

  const setUser = (user) => dispatch({ type: 'set', user })
  const resetUser = () => setUser(userSchema)

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        setUser,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
