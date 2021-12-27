import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, HStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'

const LandingScreen = () => {
  return (
    <Flex
      height='100vh'
      w='full'
      background='#FFFEFC'
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
