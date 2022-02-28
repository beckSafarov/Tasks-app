import { useState, useEffect } from 'react'
import { Text, Flex, Heading, useColorMode } from '@chakra-ui/react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { emailSignUp } from '../../firebase/auth'
import { updateCurrUser } from '../../firebase/controllers'
import FormBuild from '../../components/FormBuild'
import ShowAlert from '../../components/ShowAlert'
import AuthProviders from '../../components/Auth/AuthProviders'
import { useAppContext } from '../../hooks/ContextHooks'
import { HOME_PAGE } from '../../config'
import PublicHeader from '../../components/PublicHeader'

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
  const { setUser } = useAppContext()
  const { colorMode: mode } = useColorMode()

  useEffect(() => {
    document.title = 'Sign up | TaskX'
  }, [])

  const emailSignIn = async (values, props) => {
    const res = await emailSignUp(values)
    if (res.success) {
      props.resetForm()
      props.setSubmitting(false)
      await updateCurrUser({ displayName: values.name })
      setUser({ ...res.user, displayName: values.name })
      history.replace(HOME_PAGE)
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
    <Flex
      justifyContent='center'
      pt='150px'
      height='100vh'
      bg={`${mode}.auth.bg`}
    >
      <PublicHeader mode={mode} />
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
          mode={mode}
        />
        <Text hidden={showForm} fontSize='0.8em' textAlign='center' py='5'>
          Already have an account?{' '}
          <Text as='span' color={`${mode}.auth.linkColor`}>
            <Link to='/login'>Log in</Link>
          </Text>
        </Text>

        {/* --- Sign up Form --- */}
        <FormBuild
          show={showForm}
          onCancel={() => setShowForm(false)}
          onSubmit={emailSignIn}
          validationSchema={validationSchema}
          initialValues={{ name: '', email: '', password: '' }}
          mode={mode}
        />
      </Flex>
    </Flex>
  )
}

export default SignUpScreen
