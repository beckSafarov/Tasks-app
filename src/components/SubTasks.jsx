import { Box, Flex, VStack } from '@chakra-ui/layout'
import { useState, useEffect, useCallback, useContext } from 'react'
import Icon from '@chakra-ui/icon'
import { v4 as uuid4 } from 'uuid'
import produce from 'immer'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable'
import { FormControl } from '@chakra-ui/form-control'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import {
  FaPlus,
  FaRegCircle as EmptyCircle,
  FaCheckCircle as FullCircle,
  FaTimes,
} from 'react-icons/fa'
import { Field, Form, Formik } from 'formik'
import { TasksContext } from '../Context/TasksContext'

const initialValue = { text: '', done: false }

const SubTasks = ({ task }) => {
  const [subTasks, setSubTasks] = useState([])
  const { addSubtask, removeSubtask, updateSubtask } = useContext(TasksContext)
  useEffect(() => {
    setSubTasks(task.subtasks)
  }, [task])

  const addHandler = (v, onSubmitProps) => {
    v.id = uuid4()
    setSubTasks([...subTasks, v])
    addSubtask(task.id, v)
    onSubmitProps.resetForm()
    onSubmitProps.setSubmitting(false)
  }

  const toggleHandler = useCallback((id) => {
    setSubTasks(
      produce((draft) => {
        const task = draft.find((t) => t.id === id)
        task.done = !task.done
      })
    )
  }, [])

  const updateHandler = (id, newText) => {
    setSubTasks(
      produce((draft) => {
        const task = draft.find((t) => t.id === id)
        task.text = newText
      })
    )
    updateSubtask(task.id, {
      ...subTasks.find((t) => t.id === id),
      text: newText,
    })
  }

  const removeHandler = (id) => {
    removeSubtask(task.id, { id })
    setSubTasks(subTasks.filter((t) => t.id !== id))
  }

  const subTaskValidate = (value) => {
    const error = {}
    if (!value.text) error.text = 'Please enter a value'
    return error
  }

  return (
    <VStack w='full' aria-label='sub-tasks list'>
      <Box w='full' pb='10px' fontSize='0.9em' color='gray.700'>
        {subTasks &&
          subTasks.map((task) => (
            <Flex
              alignItems='center'
              pl='2px'
              pb='2px'
              flexWrap='wrap'
              textOverflow='scroll'
              key={task.id}
            >
              <Flex alignItems='center' flex='4'>
                <Icon
                  cursor='pointer'
                  mr='5px'
                  onClick={() => toggleHandler(task.id)}
                  as={task.done ? FullCircle : EmptyCircle}
                />
                <Editable
                  defaultValue={task.text || ''}
                  onSubmit={(v) => updateHandler(task.id, v)}
                  onCancel={(v) => updateHandler(task.id, v)}
                  display='flex'
                  alignItems='center'
                >
                  <EditablePreview
                    overflow='hidden'
                    textOverflow='ellipsis'
                    whiteSpace='wrap'
                    color={task.done ? 'gray.500' : ''}
                    as={task.done ? 's' : ''}
                  />
                  <EditableInput
                    overflow='hidden'
                    textOverflow='ellipsis'
                    whiteSpace='wrap'
                    _focus={{ border: 'none' }}
                  />
                </Editable>
              </Flex>
              {/* delete subtask icon */}
              <Flex
                onClick={() => removeHandler(task.id)}
                cursor='pointer'
                flex='1'
                justifyContent='flex-end'
              >
                <Icon color='gray.500' as={FaTimes} />
              </Flex>
            </Flex>
          ))}
      </Box>
      {/* add subtask formik */}
      <Formik
        initialValues={initialValue}
        onSubmit={addHandler}
        validate={subTaskValidate}
      >
        <Form style={{ width: '100%' }}>
          <Field name='text'>
            {({ field }) => (
              <FormControl>
                <InputGroup color='gray.700'>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<Icon as={FaPlus} />}
                    fontSize='0.8em'
                  />
                  <Input
                    {...field}
                    type='text'
                    variant='flushed'
                    placeholder='Add a subtask'
                    fontSize='0.8em'
                    _focus={{ borderColor: 'gray.700' }}
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
}

export default SubTasks
