import { useRef, useState } from 'react'
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'
import { taskSchema } from '../Context/TasksContext'
import { v4 as uuid4 } from 'uuid'
import { textToDate } from '../helpers/dateHelpers'
import { usePrefsContext, useTagsContext } from '../hooks/ContextHooks'

const AddTask = ({ defaultTag, defaultDate, page, onSubmit: addTask }) => {
  const { tags } = useTagsContext()
  const { preferences: prefs, set: setPrefs } = usePrefsContext()
  const [selectedTag, setSelectedTag] = useState(
    prefs.lastSelectedTag || 'untagged'
  )
  const refToInput = useRef(null)

  const formik = useFormik({
    initialValues: { ...taskSchema, tag: prefs.lastSelectedTag || 'untagged' },
    validate: (v) => (!v.name ? { name: 'empty' } : {}),
    onSubmit: (todo, { resetForm, setSubmitting }) => {
      addTask({
        ...todo,
        id: uuid4(),
        tag: todo.tag || defaultTag || 'untagged',
        dueDate: textToDate(defaultDate),
      })
      resetForm()
      setSubmitting(false)
    },
  })

  const onChange = (e) => {
    formik.handleChange(e)
    setSelectedTag(e.target.value)
    setPrefs({ ...prefs, lastSelectedTag: e.target.value })
    refToInput.current.focus()
  }

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
          {page === 'All Tasks' && (
            <Select
              name='tag'
              variant='flushed'
              flex='1'
              onChange={onChange}
              onBlur={formik.handleBlur}
              value={selectedTag}
              isTruncated
            >
              {tags.map((t) => (
                <option key={t.id} value={t.tag}>
                  {t.tag}
                </option>
              ))}
            </Select>
          )}
        </InputGroup>
      </FormControl>
    </form>
  )
}

AddTask.defaultProps = {
  defaultDate: 'Someday',
  defaultTag: 'untagged',
  page: 'All Tasks',
  onSubmit: () => void 0,
}

export default AddTask
