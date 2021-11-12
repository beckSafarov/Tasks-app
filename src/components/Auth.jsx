import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Loading from './Loading'
const auth = getAuth()

const Auth = ({ children, redirect, unloggedOnly }) => {
  const [permit, setPermit] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (!unloggedOnly) {
      auth.currentUser
        ? setPermit(true)
        : onAuthStateChanged(auth, (user) => {
            user ? setPermit(true) : history.replace(redirect)
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
  redirect: '/',
  children: <h1>Welcome to Auth Component</h1>,
}

export default Auth
// history.push('/test')
