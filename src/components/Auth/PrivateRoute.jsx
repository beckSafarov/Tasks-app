import { Route, Redirect } from 'react-router'

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
