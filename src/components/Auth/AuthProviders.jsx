import React from 'react'
import { VStack, Button, Flex, Img, Text, Icon } from '@chakra-ui/react'
import { FaEnvelope, FaGoogle } from 'react-icons/fa'
import { signInWithGoogle } from '../../firebase/auth'

const AuthProviders = ({ showForm, onEmailClicked, mode }) => {
  const providers = [
    {
      text: 'Continue with Google',
      icon: FaGoogle,
      onClick: signInWithGoogle,
      className: 'googleBtn',
    },
    {
      text: 'Email',
      icon: FaEnvelope,
      onClick: onEmailClicked,
      className: 'emailBtn',
    },
  ]
  return (
    <VStack w='full' py='20px' hidden={showForm}>
      {providers.map((provider, key) => (
        <Button
          bg={`${mode}.auth.${provider.className}.bg`}
          _hover={{}}
          color={`${mode}.auth.${provider.className}.color`}
          onClick={provider.onClick}
          borderRadius='0'
          borderWidth={'1px'}
          borderStyle='solid'
          borderColor={`${`${mode}.auth.${provider.className}.borderColor`}`}
          w='full'
          key={key}
          fontSize='1rem'
        >
          <Flex w='full'>
            <Icon as={provider?.icon} />
            <Text flex={15} color={`${mode}.auth.${provider.className}.color`}>
              {provider.text}
            </Text>
          </Flex>
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
