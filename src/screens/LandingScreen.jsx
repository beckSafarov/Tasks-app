import { Button } from '@chakra-ui/button'
import { Image, useColorMode } from '@chakra-ui/react'
import { Flex, Heading, HStack } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'

const LandingScreen = () => {
  const { colorMode: mode } = useColorMode()
  return (
    <Flex
      height='100vh'
      w='full'
      background={`${mode}.landing.bg`}
      alignItems='center'
    >
      <Flex
        position='absolute'
        top='0'
        py='10px'
        px='70px'
        w='full'
        justifyContent='space-between'
      >
        <Link to='/'>
          <Image boxSize='70px' src={`/logo/${mode}.png`} alt='TaskX' />
        </Link>
        <HStack>
          <Link to='/login'>
            <Button size='md' colorScheme='gray'>
              Login
            </Button>
          </Link>
          <Link to='/signup'>
            <Button size='md' colorScheme='blue'>
              Sign up
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Flex px='70px' w='full'>
        <Flex flex='1' w='full' alignItems='center'>
          <Heading size='4xl' color={`${mode}.landing.titleColor`}>
            Welcome to <br />
            TaskX
          </Heading>
        </Flex>
        <Image
          boxShadow='2xl'
          flex='1'
          boxSize='400px'
          src={`/screenshot/${mode}.png`}
        />
      </Flex>
    </Flex>
  )
}

export default LandingScreen
