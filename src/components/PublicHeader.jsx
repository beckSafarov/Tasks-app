import React from 'react'
import { Image, Flex, Button, HStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const PublicHeader = ({ showLinks, mode }) => {
  return (
    <Flex
      position='absolute'
      top='0'
      py='10px'
      px='70px'
      w='full'
      justifyContent='space-between'
    >
      <Link to='/'>
        <Image
          height='60px'
          width='120px'
          src={`/logo/${mode}.svg`}
          alt='TaskX Logo'
        />
      </Link>
      <HStack hidden={!showLinks}>
        <Link to='/login'>
          <Button size='md' variant='ghost'>
            Login
          </Button>
        </Link>
        <Link to='/signup'>
          <Button size='md' colorScheme='teal'>
            Sign up
          </Button>
        </Link>
      </HStack>
    </Flex>
  )
}

PublicHeader.defaultProps = {
  showLinks: false,
  mode: 'light',
}

export default PublicHeader
