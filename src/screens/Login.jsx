import { useState, useContext } from 'react'
import {
  Button,
  Img,
  Text,
  HStack,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Flex,
  VStack,
  Heading,
  Box,
} from '@chakra-ui/react'
import { FaEnvelope } from 'react-icons/fa'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'

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

  const getBColor = ({ touched, error }) => {
    return touched && error ? 'red.500' : 'gray.300'
  }

  const handleBorderFocus = ({ error }) => {
    return {
      borderColor: error ? 'red.500' : 'blue.500',
      borderWidth: '2px',
    }
  }

  return (
    <Flex justifyContent='center' pt='150px' height='100vh'>
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
          <Text textAlign='center' py='5'>
            Do not have account?{' '}
            <Text as='span' color='blue.500'>
              <Link to='/signup'>Create one</Link>
            </Text>
          </Text>
        </VStack>

        {/* --- Sign up Form --- */}
        <div style={{ display: !showForm ? 'none' : 'block' }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
          >
            <Form style={{ width: '100%' }}>
              <Box mt='2'>
                <Field name='email'>
                  {({ field, meta }) => (
                    <>
                      <FormLabel fontSize='0.8em' color='gray.500'>
                        Email
                      </FormLabel>
                      <Input
                        {...field}
                        type='email'
                        variant='outline'
                        borderColor={getBColor(meta)}
                        _focus={handleBorderFocus(meta)}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name='email'>
                  {(msg) => <Text color='red.400'>{msg}</Text>}
                </ErrorMessage>
              </Box>

              <Box mt='2'>
                <Field name='password'>
                  {({ field, meta }) => (
                    <>
                      <FormLabel fontSize='0.8em' color='gray.500'>
                        Password
                      </FormLabel>
                      <Input
                        {...field}
                        type='password'
                        variant='outline'
                        borderColor={getBColor(meta)}
                        _focus={handleBorderFocus(meta)}
                      />
                    </>
                  )}
                </Field>
                <ErrorMessage name='password'>
                  {(msg) => <Text color='red.400'>{msg}</Text>}
                </ErrorMessage>
              </Box>
              {/* cancel and submit buttons */}
              <Flex spacing={2} mt='5'>
                <Box px={2} flex='1'>
                  <Button
                    type='reset'
                    onClick={() => setShowForm(false)}
                    w='full'
                    colorScheme='gray'
                    boxShadow='md'
                  >
                    Cancel
                  </Button>
                </Box>
                <Box px={2} flex='1'>
                  <Button
                    type='submit'
                    boxShadow='md'
                    w='full'
                    colorScheme='blue'
                  >
                    Submit
                  </Button>
                </Box>
              </Flex>
            </Form>
          </Formik>
        </div>
      </Flex>
    </Flex>
  )
}

export default Login
