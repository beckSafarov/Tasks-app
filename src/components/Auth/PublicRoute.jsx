import { getAuth } from '@firebase/auth'
import { Route, Redirect } from 'react-router'

const PublicRoute = ({ children, logged, ...rest }) => {
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
