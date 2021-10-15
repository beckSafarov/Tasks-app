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
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/editable'
import { Textarea } from '@chakra-ui/textarea'
import { TasksContext } from '../Context/TasksContext'
import { Collapse } from '@chakra-ui/transition'
import SubTasks from './SubTasks'
import { FaChevronRight, FaTimes } from 'react-icons/fa'
import { Tooltip } from '@chakra-ui/tooltip'

const TaskDrawer = ({
  show,
  width,
  transition,
  onClose,
  task,
  tags,
  currDeleted,
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

    // if the task of the current drawer is deleted, close the drawer
    if (currDeleted.id === task.id) onClose({})

    return () => {
      document.removeEventListener('click', outsideClicked)
    }
  }, [show, task, fields, currDeleted.id])

  const handleChanges = useCallback(
    (e) => {
      updated = { ...fields }
      updated[e.target.name] = e.target.value
      setFields(updated)
    },
    [fields]
  )

  const outsideClicked = (e) => {
    if (show && e.target.id.match(/main|container|completed_tasks_flex/)) {
      onClose(fields)
    }
  }

  const updateHandler = (v) => update(v)

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
        overflowX='hidden'
        transition={transition}
        color='gray.800'
        boxSizing='border-box'
        rounded='md'
      >
        <Box py={7} px='20px'>
          <Flex alignItems='center' justifyContent='space-between'>
            <Heading size='md'>
              <Editable
                value={fields.name || ''}
                name='name'
                onChange={(v) =>
                  handleChanges({ target: { name: 'name', value: v } })
                }
                onSubmit={(v) => updateHandler({ ...fields, name: v })}
                onCancel={(v) => updateHandler({ ...fields, name: v })}
              >
                <EditablePreview
                  overflow='hidden'
                  textOverflow='ellipsis'
                  whiteSpace='wrap'
                />
                <EditableInput name='name' variant='unstyled' />
              </Editable>
            </Heading>
            <Tooltip label='Close'>
              <Box
                borderRadius='50%'
                cursor='pointer'
                color='gray.600'
                p='5px'
                onClick={() => onClose(fields)}
                aria-label='Close'
              >
                <Icon fontSize='1.2rem' as={FaChevronRight} />
              </Box>
            </Tooltip>
          </Flex>
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
                  updateHandler({ ...fields, tag: e.target.value })
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

            <Textarea
              placeholder='Add note...'
              resize='none'
              variant='unstyled'
              name='description'
              height={'500px'}
              value={fields.description}
              onChange={handleChanges}
              onBlur={(e) =>
                updateHandler({ ...fields, description: e.target.value })
              }
              hidden={!show}
            />
          </VStack>
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
  currDeleted: {},
  task: {
    id: '',
    name: '',
    tag: 'untagged',
    description: '',
  },
  tags: {},
}

export default TaskDrawer
