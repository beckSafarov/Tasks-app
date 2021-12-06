import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { AppContext } from '../Context/AppContext'
import Loading from './Loading'
const auth = getAuth()

const Auth = ({ children, redirect, unloggedOnly }) => {
  const [permit, setPermit] = useState(false)
  const { setUser } = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    if (!unloggedOnly) {
      auth.currentUser
        ? setPermit(true)
        : onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              setPermit(true)
            } else {
              history.replace(redirect)
            }
          })
    } else {
      auth.currentUser
        ? history.replace(redirect)
        : onAuthStateChanged(auth, (user) => {
            user ? history.replace(redirect) : setPermit(true)
          })
    }
  }, [auth, redirect, unloggedOnly])

  return <>{!permit ? <Loading /> : children}</>
}

Auth.defaultProps = {
  unloggedOnly: false,
  redirect: '/login',
  children: <h1>Welcome to Auth Component</h1>,
}

export default Auth
// history.push('/test')
