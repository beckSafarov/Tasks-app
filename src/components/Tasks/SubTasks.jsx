// methods & libraries
import { useState, useEffect } from 'react'
import { v4 as uuid4 } from 'uuid'
import produce, { current } from 'immer'
import { Field, Form, Formik } from 'formik'

// UI components and icons
import {
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  Icon,
  Box,
  VStack,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import SubTask from './SubTask'

const initialValue = { text: '', done: false }

const SubTasks = ({ task, onChange, fontSize, color }) => {
  const [subTasks, setSubTasks] = useState([])
  const [dragTask, setDragTask] = useState({})

  useEffect(() => setSubTasks(task.subtasks), [task])

  const handleAdd = (v, { resetForm, setSubmitting }) => {
    const updated = [...subTasks, { ...v, id: uuid4() }]
    setSubTasks(updated)
    onChange(updated)
    resetForm()
    setSubmitting(false)
  }

  const handleUpdate = (id, prop, value) => {
    setSubTasks(
      produce((draft) => {
        const task = draft.find((t) => t.id === id)
        task[prop] = value
        onChange(current(draft))
      })
    )
  }

  const handleRemove = (id) => {
    const updated = subTasks.filter((t) => t.id !== id)
    setSubTasks(updated)
    onChange(updated)
  }

  const validate = (v) => (!v.text ? { text: 'empty' } : {})

  const handleDragDrop = (dropAreaTask) => {
    setSubTasks(
      produce((draft) => {
        draft.find((t) => t.id === dragTask.id).text = dropAreaTask.text
        draft.find((t) => t.id === dropAreaTask.id).text = dragTask.text
        onChange(current(draft))
      })
    )
  }

  return (
    <VStack w='full' bg='inherit' aria-label='sub-tasks list'>
      <Box
        w='full'
        pb='10px'
        fontSize={fontSize}
        color={color}
        hidden={!subTasks}
      >
        {subTasks.map((task) => (
          <SubTask
            key={task.id}
            task={task}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
            onDragDrop={handleDragDrop}
            setDragTask={setDragTask}
          />
        ))}
      </Box>
      {/* add subtask formik */}
      <Formik
        initialValues={initialValue}
        onSubmit={handleAdd}
        validate={validate}
      >
        <Form style={{ width: '100%' }}>
          <Field name='text'>
            {({ field }) => (
              <FormControl>
                <InputGroup color={color}>
                  <InputLeftElement
                    pointerEvents='none'
                    color={color}
                    children={<Icon as={FaPlus} />}
                    fontSize='1em'
                    zIndex='0'
                  />
                  <Input
                    {...field}
                    type='text'
                    color={color}
                    variant='flushed'
                    placeholder='Add a subtask'
                    fontSize='1em'
                    _focus={{ borderColor: color }}
                  />
                </InputGroup>
              </FormControl>
            )}
          </Field>
        </Form>
      </Formik>
    </VStack>
  )
}

SubTasks.defaultProps = {
  task: { subtasks: [] },
  fontSize: 'inherit',
  color: 'inherit',
  onChange: () => void 0,
}

export default SubTasks
