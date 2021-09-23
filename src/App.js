import { useState } from 'react'
import { ChakraProvider, SimpleGrid, GridItem } from '@chakra-ui/react'
import theme from './themes'
import './index.css'
import Sidebar from './components/Sidebar'
import AllTasks from './screens/AllTasks'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TagScreen from './screens/TagScreen'
import { TasksProvider } from './Context/TasksContext'
import TestScreen from './screens/TestScreen'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TasksProvider>
        <Router>
          <SimpleGrid columns={5} w='full' height={'100vh'}>
            <GridItem colSpan={1} bg='light.sidebar' color='brand.500'>
              <Sidebar />
            </GridItem>
            <GridItem colSpan={4} bg='whiteAlpha.200'>
              <Route path='/' component={AllTasks} exact />
              <Route path='/tag/:name' component={TagScreen} />
              <Route path='/test' component={TestScreen} />
            </GridItem>
          </SimpleGrid>
        </Router>
      </TasksProvider>
    </ChakraProvider>
  )
}

export default App
