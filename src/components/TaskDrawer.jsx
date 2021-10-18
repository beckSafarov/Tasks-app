import { useEffect, useState, useCallback, useContext } from 'react'
import {
  Box,
  Heading,
  HStack,
  VStack,
  Text,
  Divider,
  Flex,
} from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/icon'
import { Select } from '@chakra-ui/select'
import { TasksContext } from '../Context/TasksContext'
import { Collapse } from '@chakra-ui/transition'
import SubTasks from './SubTasks'
import { FaChevronRight, FaTimes, FaTrash } from 'react-icons/fa'
import { Tooltip } from '@chakra-ui/tooltip'
import MyEditable from './MyEditable'

const TaskDrawer = ({
  show,
  width,
  transition,
  onClose,
  onDelete,
  task,
  tags,
}) => {
  const { update } = useContext(TasksContext)
  const styles = document?.querySelector('#main')?.style || {}
  const [fields, setFields] = useState({ ...task })
  let updated = {}

  useEffect(() => {
    styles.marginRight = show ? width : '0'
    styles.transition = transition
    document.addEventListener('click', outsideClicked)

    if (task.id !== fields.id) setFields(task)

    return () => {
      document.removeEventListener('click', outsideClicked)
    }
  }, [show, task, fields])

  const handleChanges = (e) => {
    updated = { ...fields }
    updated[e.target.name] = e.target.value
    setFields(updated)
  }

  const outsideClicked = (e) => {
    if (show && e.target.id.match(/main|container|completed_tasks_flex/)) {
      onClose(fields)
    }
  }

  const descUpdated = (description) => {
    setFields({ ...fields, description })
    update({ ...fields, description })
  }

  const nameUpdated = (name) => {
    setFields({ ...fields, name })
    update({ ...fields, name })
  }

  return (
    <Collapse in={show} animateOpacity>
      <Box
        w={width}
        position='fixed'
        zIndex='1'
        top='10px'
        bottom='20px'
        right='10px'
        bg='whiteAlpha.200'
        boxShadow='lg'
        overflowX='scroll'
        transition={transition}
        color='gray.800'
        // boxSizing='border-box'
        rounded='md'
      >
        <Box py={7} px='20px'>
          <Heading size='md' w='full'>
            <MyEditable onSubmit={nameUpdated}>{fields.name}</MyEditable>
          </Heading>
          <Divider mt={2} />
          <VStack pt={8} spacing={8}>
            <HStack
              display='flex'
              alignItems='center'
              justifyContent='center'
              w='full'
              spacing={5}
            >
              <Text whiteSpace='nowrap'>Tag: </Text>
              <Select
                variant='filled'
                background='gray.100'
                size='sm'
                borderRadius='10px'
                value={fields.tag}
                name='tag'
                onChange={(e) => {
                  handleChanges(e)
                  update({ ...fields, tag: e.target.value })
                }}
                _focus={{ borderColor: 'transparent' }}
                isTruncated
              >
                {Object.keys(tags).map((tag, i) => (
                  <option key={i} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
            </HStack>
            {/* subtasks */}
            <SubTasks task={task} />

            {/* custom textarea for description  */}
            <Flex justifyContent='flex-start' w='full'>
              <MyEditable
                onSubmit={descUpdated}
                placeholder='Add note...'
                name='description'
              >
                {fields.description}
              </MyEditable>
            </Flex>
          </VStack>

          {/* actions with the task & the window */}
          <Flex
            position='absolute'
            bottom='0'
            left='0'
            right='0'
            borderTop='1px'
            borderColor='gray.200'
            justifyContent='space-between'
            alignItems='center'
            color='gray.800'
            p='5px'
          >
            <Tooltip label='Close'>
              <Box
                borderRadius='50%'
                cursor='pointer'
                _hover={{ backgroundColor: 'gray.200' }}
                py='5px'
                px='10px'
                onClick={() => onClose()}
              >
                <Icon as={FaChevronRight} />
              </Box>
            </Tooltip>
            <Tooltip label='delete the task'>
              <Box
                borderRadius='50%'
                cursor='pointer'
                _hover={{ backgroundColor: 'gray.200' }}
                py='5px'
                px='10px'
                onClick={() => onDelete(task)}
              >
                <Icon as={FaTrash} />
              </Box>
            </Tooltip>
          </Flex>
        </Box>
      </Box>
    </Collapse>
  )
}

TaskDrawer.defaultProps = {
  show: false,
  width: '250px',
  transition: '0.3s',
  onClose: () => void 0,
  onDelete: () => void 0,
  task: {
    id: '',
    name: '',
    tag: 'untagged',
    description: '',
  },
  tags: {},
}

export default TaskDrawer
