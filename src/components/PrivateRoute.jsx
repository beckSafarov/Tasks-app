import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { Route, Redirect } from 'react-router'
import { useAppContext } from '../hooks/ContextHooks'
import Loading from './Loading'
import { isEmpty } from '../helpers'
const auth = getAuth()

const PrivateRoute = ({ children, logged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
/**
 * <Route
      {...rest}
      render={({ location }) =>
        user || currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
 */
