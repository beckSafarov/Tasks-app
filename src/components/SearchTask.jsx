import { Form, Formik, Field } from 'formik'
import { useState, useEffect } from 'react'
import {
  Flex,
  Input,
  FormControl,
  InputLeftElement,
  InputGroup,
  Icon,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

const SearchTask = ({ onSubmit }) => {
  const submitHandler = ({ keyword }, onSubmitProps) => {
    onSubmit(keyword)
    onSubmitProps.resetForm()
    onSubmitProps.setSubmitting(false)
  }

  const validate = (keyword) => {
    if (keyword === '') return { keyword: 'empty' }
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
                    children={<Icon color='light.placeholder' as={FaSearch} />}
                  />
                  <Input
                    {...field}
                    id='keyword'
                    placeholder='Search Task'
                    type='text'
                    variant='filled'
                    _focus={{ borderColor: 'light.placeholder' }}
                  />
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
}

export default SearchTask
