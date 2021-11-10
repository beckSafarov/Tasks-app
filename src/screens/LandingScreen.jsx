import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Text, HStack } from '@chakra-ui/layout'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
const auth = getAuth()

const LandingScreen = ({ history }) => {
  // const { setUser } = useContext(UserContext)

  return (
    <Flex
      height='100vh'
      w='full'
      background='whitesmoke'
      justifyContent='center'
      alignItems='center'
    >
      <Box>
        <Heading size='4xl' w='full'>
          Tasks App
        </Heading>
        <HStack display='flex' justifyContent='center' pt='30px' spacing='10px'>
          <Link to='/login'>
            <Button size='lg' colorScheme='gray'>
              Login
            </Button>
          </Link>
          <Link to='/signup'>
            <Button size='lg' colorScheme='blue'>
              Sign up
            </Button>
          </Link>
        </HStack>
      </Box>
    </Flex>
  )
}

export default LandingScreen
