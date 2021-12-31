import { Form, Formik, Field, useFormikContext } from 'formik'
import { useState, useEffect } from 'react'
import {
  Flex,
  Input,
  FormControl,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Icon,
  Button,
} from '@chakra-ui/react'
import { FaSearch, FaTimesCircle } from 'react-icons/fa'

const SearchTask = ({ onSubmit, onClear }) => {
  const [onSubmitProps, setOnSubmitProps] = useState({})
  const [searchState, setSearchState] = useState(false)

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
                    children={<Icon color='light.searchIcon' as={FaSearch} />}
                  />
                  <Input
                    {...field}
                    id='keyword'
                    placeholder='Search Task'
                    type='text'
                    variant='filled'
                    bg='light.searchBg'
                    _focus={{ borderColor: 'light.searchOnFocus' }}
                    disabled={field.isSubmitting}
                  />
                  {searchState && (
                    <InputRightElement
                      onClick={formClearHandler}
                      children={
                        <Icon color='light.searchIcon' as={FaTimesCircle} />
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
