import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './themes'
import './index.css'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TagScreen from './screens/TagScreen'
import TestScreen from './screens/TestScreen'
import ContextProviders from './Context/ContextProviders'
import TodayScreen from './screens/TodayScreen'

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
            <Route path='/' component={TodayScreen} exact />
            <Route path='/tag/:name' component={TagScreen} />
            <Route path='/test' component={TestScreen} />
          </Box>
        </Router>
      </ContextProviders>
    </ChakraProvider>
  )
}

export default App
