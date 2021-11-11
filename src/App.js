import { useState, useEffect } from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './themes'
import './index.css'
import 'react-datepicker/dist/react-datepicker.css'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TestScreen from './screens/TestScreen'
import ContextProviders from './Context/ContextProviders'
import AllTasksScreen from './screens/AllTasksScreen'
import TodayScreen from './screens/TodayScreen'
import TomorrowScreen from './screens/TomorrowScreen'
import TagScreen from './screens/TagScreen'
import UpcomingScreen from './screens/UpcomingScreen'
import LandingScreen from './screens/LandingScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'

const App = () => {
  const loc = window?.location?.href?.split('/')[3] || ''
  const [isLanding, setIsLanding] = useState(true)

  useEffect(() => {
    setIsLanding(loc.length < 2 || loc.match(/signup|login/))
  }, [loc])

  return (
    <ChakraProvider theme={theme}>
      <ContextProviders>
        <Router>
          <Box
            position='fixed'
            left='0'
            right='0'
            width='220px'
            height='100vh'
            backgroundColor='light.sidebar'
            hidden={isLanding}
          >
            <Sidebar />
          </Box>

          <Route path='/' component={LandingScreen} exact />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/login' component={LoginScreen} />
          <Box ml='220px' pb={isLanding ? '' : '100px'} id='main'>
            <Route path='/all-tasks' component={AllTasksScreen} exact />
            <Route path='/today' component={TodayScreen} />
            <Route path='/tomorrow' component={TomorrowScreen} />
            <Route path='/upcoming' component={UpcomingScreen} />
            <Route path='/tag/:name' component={TagScreen} />
            <Route path='/test' component={TestScreen} />
          </Box>
        </Router>
      </ContextProviders>
    </ChakraProvider>
  )
}

export default App
