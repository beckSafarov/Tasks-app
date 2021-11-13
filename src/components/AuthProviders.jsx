import React from 'react'
import { VStack, Button, HStack, Img, Text, Icon } from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa'
import { signInWithGoogle } from '../firebase/auth'

const AuthProviders = ({ showForm, onEmailClicked }) => {
  return (
    <VStack w='full' py='20px' hidden={showForm}>
      <Button
        background='white'
        _hover={{ background: 'gray.50' }}
        border='1px solid'
        borderColor='blackAlpha.300'
        onClick={signInWithGoogle}
        px='10px'
        w='full'
        fontSize='1rem'
      >
        <HStack spacing={2}>
          <Img width='1rem' src='/google3.png' alt='Google logo' />
          <Text color='gray.600'>Continue with Google</Text>
        </HStack>
      </Button>
      <Button
        background='white'
        _hover={{ background: 'gray.50' }}
        border='1px solid'
        borderColor='blackAlpha.300'
        onClick={onEmailClicked}
        px='10px'
        w='full'
        fontSize='1rem'
      >
        <HStack spacing={2}>
          <Icon as={FaEnvelope} />
          <Text color='gray.600'>Email</Text>
        </HStack>
      </Button>
    </VStack>
  )
}

AuthProviders.defaultProps = {
  showForm: false,
  onEmailClicked: () => void 0,
}

export default AuthProviders
