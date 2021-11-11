import { ChakraProvider } from '@chakra-ui/react'
import theme from './themes'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TestScreen from './screens/TestScreen'
import ContextProviders from './Context/ContextProviders'
import AllTasksScreen from './screens/tasks/AllTasksScreen'
import TagScreen from './screens/tasks/TagScreen'
import LandingScreen from './screens/LandingScreen'
import SignUpScreen from './screens/auth/SignUpScreen'
import LoginScreen from './screens/auth/LoginScreen'
import DateScreen from './screens/tasks/DateScreen'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ContextProviders>
        <Router>
          <Route path='/' component={LandingScreen} exact />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/all-tasks' component={AllTasksScreen} exact />
          <Route path='/today' component={DateScreen} />
          <Route path='/tomorrow' component={DateScreen} />
          <Route path='/upcoming' component={DateScreen} />
          <Route path='/tag/:name' component={TagScreen} />
          <Route path='/test' component={TestScreen} />
        </Router>
      </ContextProviders>
    </ChakraProvider>
  )
}

export default App
