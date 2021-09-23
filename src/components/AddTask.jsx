import { useContext, useEffect } from 'react'
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Formik, Form, Field } from 'formik'
import { TasksContext } from '../Context/TasksContext'

const initialValues = {
  name: '',
  done: false,
  description: '',
}

const focusStyle = {
  borderColor: 'light.placeholder',
}

const AddTask = ({ tag }) => {
  const { add, tasks } = useContext(TasksContext)

  const submitHandler = (todo, onSubmitProps) => {
    add({ ...todo, tag })
    onSubmitProps.resetForm()
    onSubmitProps.setSubmitting(false)
  }

  const validate = (vals) => {
    if (vals.name === '') return { name: 'empty' }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validate={validate}
    >
      <Form style={{ width: '100%' }}>
        <Flex width='full'>
          <Field name='name'>
            {({ field }) => (
              <FormControl flex={3} pr={'20px'}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AddIcon color='light.placeholder' />}
                  />
                  <Input
                    {...field}
                    id='name'
                    placeholder='Add task'
                    type='text'
                    variant='flushed'
                    _focus={focusStyle}
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

AddTask.defaultProps = {
  tag: 'untagged',
}

export default AddTask
