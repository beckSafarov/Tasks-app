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
} from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { emailSignUp } from '../../firebase/auth'
import { updateCurrUser } from '../../firebase/controllers'
import FormBuild from '../../components/FormBuild'
import ShowAlert from '../../components/ShowAlert'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Too Short')
    .max(32, 'Too Long!')
    .required('Please enter your password'),
})

const SignUpScreen = ({ history }) => {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const submitHandler = async (values, props) => {
    props.resetForm()
    props.setSubmitting(false)
    const res = await emailSignUp(values)
    if (res.success) {
      await updateCurrUser({ displayName: values.name })
      history.replace('/all-tasks')
    } else {
      setError(res.errorMessage)
      console.log(res)
    }
  }

  return (
    <Flex justifyContent='center' pt='150px' height='100vh'>
      <Flex
        flexDir='column'
        bg='#FFFEFC'
        width='450px'
        pt='20px'
        pb='50px'
        px='30px'
      >
        <Heading mb='30px' size='2xl' textAlign='center'>
          Sign up
        </Heading>
        <ShowAlert
          show={error ? 1 : 0}
          title='Sign up Error!'
          onClose={() => setError('')}
        >
          {error}
        </ShowAlert>
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
            Already have an account?{' '}
            <Text as='span' color='blue.500'>
              <Link to='/login'>Sign in</Link>
            </Text>
          </Text>
        </VStack>

        {/* --- Sign up Form --- */}
        <FormBuild
          show={showForm}
          onCancel={() => setShowForm(false)}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
          initialValues={{ name: '', email: '', password: '' }}
        />
      </Flex>
    </Flex>
  )
}

export default SignUpScreen
