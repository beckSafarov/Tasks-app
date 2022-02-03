import { useState } from 'react'
import { Text, Flex, Heading, Box } from '@chakra-ui/react'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'
import FormBuild from '../../components/FormBuild'
import { emailSignIn } from '../../firebase/auth'
import ShowAlert from '../../components/ShowAlert'
import AuthProviders from '../../components/Auth/AuthProviders'
import { useAppContext } from '../../hooks/ContextHooks'
import { HOME_PAGE } from '../../config'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string('Password should include text').required(
    'Please enter your password'
  ),
})

const LoginScreen = () => {
  const history = useHistory()
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const { setUser } = useAppContext()

  const submitHandler = async (values, props) => {
    const res = await emailSignIn(values)
    if (res.success) {
      setUser(res.user)
      props && props.resetForm()
      props && props.setSubmitting(false)
      history.replace(HOME_PAGE)
    } else {
      setError(res.errorMessage)
      console.log(res)
    }
  }

  return (
    <Flex justifyContent='center' pt='150px' height='100vh' bg='#FFFEFC'>
      <Flex flexDir='column' width='450px' pt='20px' pb='50px' px='30px'>
        <Heading mb='30px' size='2xl' textAlign='center'>
          Login
        </Heading>
        <ShowAlert
          show={error ? 1 : 0}
          title='Login Error!'
          onClose={() => setError('')}
        >
          {error}
        </ShowAlert>
        <AuthProviders
          showForm={showForm}
          onEmailClicked={() => setShowForm(true)}
        />
        <Text hidden={showForm} fontSize='0.8em' textAlign='center' py='5'>
          Do not have an account?{' '}
          <Text as='span' color='blue.500'>
            <Link to='/signup'>Create one</Link>
          </Text>
        </Text>

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

export default LoginScreen
