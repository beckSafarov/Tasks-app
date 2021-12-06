import { ChakraProvider } from '@chakra-ui/react'
import theme from './themes'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TestScreen from './screens/TestScreen'
import AllTasksScreen from './screens/tasks/AllTasksScreen'
import TagScreen from './screens/tasks/TagScreen'
import LandingScreen from './screens/LandingScreen'
import SignUpScreen from './screens/auth/SignUpScreen'
import LoginScreen from './screens/auth/LoginScreen'
import DateScreen from './screens/tasks/DateScreen'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Loading from './components/Loading'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useAppContext } from './hooks/ContextHooks'
const auth = getAuth()

const App = () => {
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState({})

  useEffect(async () => {
    if (auth.currentUser) {
      setLoading(false)
      setLogged(true)
    } else {
      onAuthStateChanged(auth, (u) => {
        if (u) {
          setLoading(false)
          setLogged(true)
        } else {
          setLoading(false)
        }
      })
    }
  }, [auth, user])

  return (
    <ChakraProvider theme={theme}>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          {/* public routes */}
          <PublicRoute logged={logged} path='/' exact>
            <LandingScreen />
          </PublicRoute>
          <PublicRoute logged={logged} path='/signup'>
            <SignUpScreen />
          </PublicRoute>
          <PublicRoute logged={logged} path='/login'>
            <LoginScreen />
          </PublicRoute>

          {/* Private Routes */}
          <PrivateRoute logged={logged} path='/all-tasks'>
            <AllTasksScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/today'>
            <DateScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/tomorrow'>
            <DateScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/upcoming'>
            <DateScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/tag/:name'>
            <TagScreen />
          </PrivateRoute>

          {/* PlayGround screen route */}
          <Route path='/test' component={TestScreen} />
        </Router>
      )}
    </ChakraProvider>
  )
}

export default App
