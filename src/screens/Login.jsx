import { useState, useContext } from 'react'
import {
  Button,
  Img,
  Text,
  HStack,
  Icon,
  Flex,
  VStack,
  Heading,
  Box,
} from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import FormBuild from '../components/FormBuild'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string('Password should include text')
    .min(6, 'Too Short')
    .max(32, 'Too Long!')
    .required('Please enter your password'),
})

const Login = () => {
  const [showForm, setShowForm] = useState(false)

  const submitHandler = (values, props) => {
    console.log(values)
    props.resetForm()
    props.setSubmitting(false)
  }

  return (
    <Flex justifyContent='center' pt='150px' height='100vh' bg='#FFFEFC'>
      <Flex
        flexDir='column'
        // bg='gray.50'
        width='450px'
        pt='20px'
        pb='50px'
        px='30px'
      >
        <Heading mb='30px' size='2xl' textAlign='center'>
          Login
        </Heading>
        <VStack w='full' py='20px' hidden={showForm}>
          <Button
            background='white'
            _hover={{ background: 'gray.50' }}
            border='1px solid'
            borderColor='blackAlpha.300'
            onClick={() => alert('signed up')}
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
            onClick={() => alert('signed up')}
            px='10px'
            w='full'
            fontSize='1rem'
          >
            <HStack spacing={2}>
              <Img width='1rem' src='/apple.png' alt='Apple logo' />
              <Text color='gray.600'>Continue with Apple</Text>
            </HStack>
          </Button>
          <Button
            background='white'
            _hover={{ background: 'gray.50' }}
            border='1px solid'
            borderColor='blackAlpha.300'
            onClick={() => setShowForm(true)}
            px='10px'
            w='full'
            fontSize='1rem'
          >
            <HStack spacing={2}>
              <Icon as={FaEnvelope} />
              <Text color='gray.600'>Email</Text>
            </HStack>
          </Button>
          <Text fontSize='0.8em' textAlign='center' py='5'>
            Do not have an account?{' '}
            <Text as='span' color='blue.500'>
              <Link to='/signup'>Create one</Link>
            </Text>
          </Text>
        </VStack>

        {/* --- Login Form --- */}
        <FormBuild
          show={showForm}
          onCancel={() => setShowForm(false)}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
          initialValues={{ email: '', password: '' }}
        />

        {/* forgot password link */}
        <Box textAlign='center' py='5' hidden={!showForm}>
          <Text
            fontSize='0.8em'
            color='gray.600'
            cursor='pointer'
            _hover={{ color: 'blue.400', textDecor: 'underline' }}
          >
            Forgot Password?
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Login
