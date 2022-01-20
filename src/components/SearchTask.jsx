import { Form, Formik, Field } from 'formik'
import { useState } from 'react'
import {
  Flex,
  Input,
  FormControl,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Icon,
  useColorMode,
} from '@chakra-ui/react'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'

const SearchTask = ({ onSubmit, onClear }) => {
  const [onSubmitProps, setOnSubmitProps] = useState({})
  const [searchState, setSearchState] = useState(false)
  const { colorMode: mode } = useColorMode()

  const submitHandler = ({ keyword }, onSubmitProps) => {
    onSubmit(keyword)
    setSearchState(true)
    onSubmitProps.setSubmitting(false)
    setOnSubmitProps(onSubmitProps)
  }

  const validate = (keyword) => {
    if (keyword === '') return { keyword: 'empty' }
  }

  const formClearHandler = () => {
    setSearchState(false)
    onSubmitProps?.setSubmitting(false)
    onSubmitProps?.resetForm()
    onClear()
  }

  return (
    <Formik
      initialValues={{ keyword: '' }}
      onSubmit={submitHandler}
      validate={validate}
    >
      <Form>
        <Flex width='full'>
          <Field name='keyword'>
            {({ field }) => (
              <FormControl flex={3} pr={'20px'}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={
                      <Icon color={`${mode}.searchIcon`} as={FaSearch} />
                    }
                  />
                  <Input
                    {...field}
                    id='keyword'
                    placeholder='Search Task'
                    type='text'
                    variant='filled'
                    bg={`${mode}.searchBg`}
                    _focus={{ borderColor: `${mode}.searchOnFocus` }}
                    disabled={field.isSubmitting}
                  />
                  {searchState && (
                    <InputRightElement
                      onClick={formClearHandler}
                      children={
                        <Icon color={`${mode}.searchIcon`} as={FaTimesCircle} />
                      }
                    />
                  )}
                </InputGroup>
              </FormControl>
            )}
          </Field>
        </Flex>
      </Form>
    </Formik>
  )
}

SearchTask.defaultProps = {
  onSubmit: () => void 0,
  onClear: () => void 0,
}

export default SearchTask
