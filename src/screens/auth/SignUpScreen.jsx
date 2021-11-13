import { useState } from 'react'
import { Text, Flex, Heading } from '@chakra-ui/react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { emailSignUp } from '../../firebase/auth'
import { updateCurrUser } from '../../firebase/controllers'
import FormBuild from '../../components/FormBuild'
import ShowAlert from '../../components/ShowAlert'
import Auth from '../../components/Auth'
import AuthProviders from '../../components/AuthProviders'

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

  const emailSignIn = async (values, props) => {
    const res = await emailSignUp(values)
    if (res.success) {
      props.resetForm()
      props.setSubmitting(false)
      await updateCurrUser({ displayName: values.name })
      history.replace('/all-tasks')
    } else {
      res.errorCode.match(/email-already-in-use/)
        ? setError(
            'Account with such email already exists. Please log in to continue'
          )
        : setError(res.errorMessage)
      console.log(res)
    }
  }

  return (
    <Auth redirect='/all-tasks' unloggedOnly>
      <Flex justifyContent='center' pt='150px' height='100vh' bg='#FFFEFC'>
        <Flex flexDir='column' width='450px' pt='20px' pb='50px' px='30px'>
          <Heading mb='30px' size='2xl' textAlign='center'>
            Sign up
          </Heading>
          <ShowAlert show={error ? 1 : 0} onClose={() => setError('')}>
            {error}
          </ShowAlert>
          <AuthProviders
            showForm={showForm}
            onEmailClicked={() => setShowForm(true)}
          />
          <Text hidden={showForm} fontSize='0.8em' textAlign='center' py='5'>
            Already have an account?{' '}
            <Text as='span' color='blue.500'>
              <Link to='/login'>Sign in</Link>
            </Text>
          </Text>

          {/* --- Sign up Form --- */}
          <FormBuild
            show={showForm}
            onCancel={() => setShowForm(false)}
            onSubmit={emailSignIn}
            validationSchema={validationSchema}
            initialValues={{ name: '', email: '', password: '' }}
          />
        </Flex>
      </Flex>
    </Auth>
  )
}

export default SignUpScreen
