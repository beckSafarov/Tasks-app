import { ChakraProvider } from '@chakra-ui/react'
import theme from './themes'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css'
import { BrowserRouter as Router } from 'react-router-dom'
import LandingScreen from './screens/LandingScreen'
import SignUpScreen from './screens/auth/SignUpScreen'
import LoginScreen from './screens/auth/LoginScreen'
import PrivateRoute from './components/Auth/PrivateRoute'
import PublicRoute from './components/Auth/PublicRoute'
import SpinnerLoading from './components/SpinnerLoading'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import TasksScreen from './screens/TasksScreen'
const auth = getAuth()

const App = () => {
  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (auth.currentUser) {
      setLoading(false)
      setLogged(true)
    } else {
      onAuthStateChanged(auth, (u) => {
        if (u) setLogged(true)
        setLoading(false)
      })
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      {loading ? (
        <SpinnerLoading />
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
            <TasksScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/today'>
            <TasksScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/tomorrow'>
            <TasksScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/upcoming'>
            <TasksScreen />
          </PrivateRoute>
          <PrivateRoute logged={logged} path='/tag/:name'>
            <TasksScreen />
          </PrivateRoute>

          {/* PlayGround screen route */}
          {/* <Route path='/test' component={TestScreen} /> */}
        </Router>
      )}
    </ChakraProvider>
  )
}

export default App
