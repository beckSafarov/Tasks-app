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

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ContextProviders>
        <Router>
          {/* below is the so-so one*/}
          <Box
            position='fixed'
            left='0'
            right='0'
            width='220px'
            height='100vh'
            backgroundColor='light.sidebar'
          >
            <Sidebar />
          </Box>

          <Box ml='220px' pb='100px' id='main'>
            <Route path='/' component={AllTasksScreen} exact />
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
