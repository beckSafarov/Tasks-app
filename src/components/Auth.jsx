import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../Context/UserContext'
const auth = getAuth()

const Auth = ({ children, reverse }) => {
  const [permit, setPermit] = useState(false)
  const history = useHistory()
  const { user } = useContext(UserContext)

  useEffect(() => {
    let logged = user.uid ? true : false
    onAuthStateChanged(auth, (newUser) => {
      logged = newUser ? true : false
    })

    if (!reverse) {
      logged ? setPermit(true) : console.log('go home')
    } else {
      logged ? console.log('go home') : setPermit(true)
    }
  }, [user, reverse])

  return <>{permit && children}</>
}

Auth.defaultProps = { reverse: false }

export default Auth
// history.push('/test')
