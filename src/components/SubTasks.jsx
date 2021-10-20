// methods & libraries
import { useState, useEffect } from 'react'
import { v4 as uuid4 } from 'uuid'
import produce, { current } from 'immer'
import { Field, Form, Formik } from 'formik'

// UI components and icons
import {
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  Icon,
  Box,
  Flex,
  VStack,
} from '@chakra-ui/react'
import {
  FaPlus,
  FaRegCircle as EmptyCircle,
  FaCheckCircle as FullCircle,
  FaTimes,
} from 'react-icons/fa'
import MyEditable from './MyEditable'

const initialValue = { text: '', done: false }

const SubTasks = ({ task, onChange, fontSize, color }) => {
  const [subTasks, setSubTasks] = useState([])

  useEffect(() => {
    setSubTasks(task.subtasks)
  }, [task])

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

  return (
    <VStack w='full' aria-label='sub-tasks list'>
      <Box w='full' pb='10px' fontSize={fontSize} color={color}>
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
                  onClick={() => handleUpdate(task.id, 'done', !task.done)}
                  as={task.done ? FullCircle : EmptyCircle}
                />
                <MyEditable onSubmit={(v) => handleUpdate(task.id, 'text', v)}>
                  <Text
                    as={task.done ? 's' : ''}
                    color={task.done ? 'gray.500' : ''}
                  >
                    {task.text || ''}
                  </Text>
                </MyEditable>
              </Flex>
              {/* delete subtask icon */}
              <Flex
                onClick={() => handleRemove(task.id)}
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
        onSubmit={handleAdd}
        validate={validate}
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
                    zIndex='0'
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
  fontSize: 'inherit',
  color: 'inherit',
  onChange: () => void 0,
}

export default SubTasks
