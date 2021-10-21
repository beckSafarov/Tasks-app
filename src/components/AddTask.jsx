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
import { taskSchema, TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import { v4 as uuid4 } from 'uuid'
import { textToDate } from '../helpers/tasksHelpers'

const AddTask = ({ defaultTag, defaultDate }) => {
  const { add: addTask } = useContext(TasksContext)
  const { tags, add: addTag } = useContext(TagsContext)

  const submitHandler = (todo, onSubmitProps) => {
    addTask({
      ...todo,
      id: uuid4(),
      tag: defaultTag,
      dueDate: textToDate(defaultDate),
    })
    if (!tags.untagged) addTag('untagged')
    onSubmitProps.resetForm()
    onSubmitProps.setSubmitting(false)
  }

  const validate = (v) => (!v.name ? { name: 'empty' } : {})

  return (
    <Formik
      initialValues={taskSchema}
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

AddTask.defaultProps = {
  defaultDate: null,
  defaultTag: 'untagged',
}

export default AddTask
