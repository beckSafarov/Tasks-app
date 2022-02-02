import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const SpinnerLoading = ({ component, show }) => {
  return (
    <Flex
      hidden={!show}
      height={component ? '100%' : '100vh'}
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

SpinnerLoading.defaultProps = {
  show: true,
}

export default SpinnerLoading
