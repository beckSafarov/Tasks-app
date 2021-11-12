import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <Flex
      height='100vh'
      width='full'
      justifyContent='center'
      alignItems='center'
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Flex>
  )
}

export default Loading
