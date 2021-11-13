import { useState } from 'react'
import { Text, Flex, Heading, Box } from '@chakra-ui/react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import FormBuild from '../../components/FormBuild'
import { emailSignIn } from '../../firebase/auth'
import ShowAlert from '../../components/ShowAlert'
import Auth from '../../components/Auth'
import AuthProviders from '../../components/AuthProviders'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string('Password should include text')
    .min(6, 'Too Short')
    .max(32, 'Too Long!')
    .required('Please enter your password'),
})

const LoginScreen = ({ history }) => {
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const submitHandler = async (values, props) => {
    const res = await emailSignIn(values)
    if (res.success) {
      props.resetForm()
      props.setSubmitting(false)
      history.replace('/all-tasks')
    } else {
      setError(res.errorMessage)
      console.log(res)
    }
  }

  return (
    <Auth redirect='/all-tasks' unloggedOnly>
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
    </Auth>
  )
}

export default LoginScreen
