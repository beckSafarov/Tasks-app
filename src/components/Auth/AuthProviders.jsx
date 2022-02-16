import React from 'react'
import { VStack, Button, HStack, Img, Text, Icon } from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa'
import { signInWithGoogle } from '../../firebase/auth'

const AuthProviders = ({ showForm, onEmailClicked }) => {
  const providers = [
    {
      text: 'Continue with Google',
      img: { src: '/google3.png', alt: 'Google logo' },
      onClick: signInWithGoogle,
    },
    {
      text: 'Email',
      icon: FaEnvelope,
      onClick: onEmailClicked,
    },
  ]

  return (
    <VStack w='full' py='20px' hidden={showForm}>
      {providers.map((provider) => (
        <Button
          background='white'
          _hover={{ background: 'gray.50' }}
          border='1px solid'
          borderColor='blackAlpha.300'
          onClick={provider.onClick}
          px='10px'
          w='full'
          fontSize='1rem'
        >
          <HStack spacing={2}>
            <Img
              hidden={!provider.img}
              width='1rem'
              src={provider.img?.src || ''}
              alt={provider.img?.alt || ''}
            />
            <Icon hidden={!provider.icon} as={provider.icon || ''} />
            <Text color='gray.600'>{provider.text}</Text>
          </HStack>
        </Button>
      ))}
    </VStack>
  )
}

AuthProviders.defaultProps = {
  showForm: false,
  onEmailClicked: () => void 0,
}

export default AuthProviders
