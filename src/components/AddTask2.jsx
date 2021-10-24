import { useContext, useRef } from 'react'
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'
import { taskSchema, TasksContext } from '../Context/TasksContext'
import { TagsContext } from '../Context/TagsContext'
import { v4 as uuid4 } from 'uuid'
import { textToDate } from '../helpers/tasksHelpers'

const AddTask2 = ({ defaultTag, defaultDate, page }) => {
  const { add: addTask } = useContext(TasksContext)
  const { tags, add: addTag } = useContext(TagsContext)
  const refToInput = useRef(null)
  const formik = useFormik({
    initialValues: {
      ...taskSchema,
      tag: page === 'tag' ? defaultTag : 'untagged',
    },
    validate: (v) => (!v.name ? { name: 'empty' } : {}),
    onSubmit: (todo, { resetForm, setSubmitting }) => {
      addTask({
        ...todo,
        id: uuid4(),
        dueDate: textToDate(defaultDate),
      })
      console.log({
        ...todo,
        id: uuid4(),
        dueDate: textToDate(defaultDate),
      })
      if (!tags.untagged) addTag('untagged')
      resetForm()
      setSubmitting(false)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 'inherit' }}>
      <FormControl flex={4} pr={'20px'}>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<AddIcon color='light.placeholder' />}
          />
          <Input
            id='name'
            flex='3'
            ref={refToInput}
            placeholder='Add task'
            type='text'
            variant='flushed'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            _focus={{ borderColor: 'light.placeholder' }}
          />
          <Select
            name='tag'
            variant='flushed'
            flex='1'
            onChange={(e) => {
              formik.handleChange(e)
              refToInput.current.focus()
            }}
            onBlur={formik.handleBlur}
            value={formik.values.tag}
            hidden={page === 'tag'}
            isTruncated
          >
            {Object.keys(tags).map((tag, i) => (
              <option key={i} value={tag}>
                {tag}
              </option>
            ))}
          </Select>
        </InputGroup>
      </FormControl>
    </form>
  )
}

AddTask2.defaultProps = {
  defaultDate: 'Someday',
  defaultTag: 'untagged',
  page: 'All Tasks',
}

export default AddTask2
