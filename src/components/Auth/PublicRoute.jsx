import { Route, Redirect } from 'react-router'
import { HOME_PAGE } from '../../config'

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
              pathname: HOME_PAGE,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PublicRoute
