import { getAuth } from '@firebase/auth'
import { Route, Redirect } from 'react-router'
import { isEmpty } from '../helpers'
import { useAppContext } from '../hooks/ContextHooks'
const { currentUser } = getAuth()

const PublicRoute = ({ children, logged, ...rest }) => {
  // const context = useAppContext()
  // const user = context?.user || false
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/all-tasks',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PublicRoute
