// --- Libary & methdos ---
import { useEffect, useState } from 'react'
import SubTasks from './SubTasks'
import MyEditable from '../MyEditable'
import { getDueDate } from '../../helpers/dateHelpers'
import useQuerySelector from '../../hooks/useQuerySelector'

// --- UI components ---
import { Box, Heading, HStack, VStack, Divider, Flex } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/icon'
import { Select } from '@chakra-ui/select'
import { Collapse } from '@chakra-ui/transition'
import {
  FaChevronRight,
  FaTag,
  FaRegCalendarAlt,
  FaTrash,
} from 'react-icons/fa'
import { Tooltip } from '@chakra-ui/tooltip'
import DatePicker from 'react-datepicker'
import { useColorMode } from '@chakra-ui/react'
import { calendarDarkTheme as cd } from '../../themes'

const dpClasses = {
  modal: '.react-datepicker',
  header: '.react-datepicker__header',
  month: '.react-datepicker__current-month',
  week: '.react-datepicker__week',
  dayName: '.react-datepicker__day-name',
  day: '.react-datepicker__day',
  dayDisabled: '.react-datepicker__day--disabled',
}

const TaskDrawer = ({
  show,
  width,
  transition,
  onClose,
  onDelete,
  task,
  tags,
  onUpdate,
}) => {
  const [fields, setFields] = useState({ ...task })
  const { colorMode: mode } = useColorMode()
  const styles = useQuerySelector('#main').style || {}
  const dpInput = useQuerySelector('#dpInput').style || {}
  dpInput.backgroundColor = mode === 'dark' ? cd.input : ''
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

  const handleCalendarTheme = () => {
    if (mode !== 'dark') return
    const dpModal = document.querySelector(dpClasses.modal).style
    const dpHeader = document.querySelector(dpClasses.header).style
    const currMonth = document.querySelector(dpClasses.month).style
    const dayNames = [...document.querySelectorAll(dpClasses.dayName)]
    dpModal.backgroundColor = cd.modal.bg
    dpModal.color = cd.modal.color
    dpModal.border = cd.modal.border
    dpHeader.backgroundColor = cd.header.bg
    dpHeader.color = cd.header.color
    currMonth.color = cd.currMonth.color
    dayNames.forEach((d) => {
      d.style.color = cd.dayNames.color
    })
  }

  const handleChanges = (name, value, shouldUpdate = false) => {
    updated = { ...fields }
    updated[name] = value
    setFields(updated)
    if (shouldUpdate) onUpdate(updated)
  }

  const outsideClicked = (e) => {
    if (show && e.target.id.match(/main|container|completed_tasks_flex/)) {
      onClose(fields)
    }
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
        bg={`${mode}.taskDrawer`}
        boxShadow='lg'
        overflowX='scroll'
        transition={transition}
        color={`${mode}.text`}
        rounded='md'
      >
        <Box py={7} px='20px'>
          <Heading size='md' w='full'>
            <MyEditable onSubmit={(n) => handleChanges('name', n, true)}>
              {fields.name}
            </MyEditable>
          </Heading>
          <Divider mt={2} />
          <VStack pt={8} spacing={8} fontSize='0.8em'>
            <HStack
              display='flex'
              alignItems='center'
              justifyContent='center'
              w='full'
              spacing={5}
            >
              {/* <Text whiteSpace='nowrap'>Tag </Text> */}
              <Tooltip label='Tag'>
                <Box aria-label='Tag Icon'>
                  <Icon as={FaTag} />
                </Box>
              </Tooltip>
              <Select
                variant='outline'
                size='sm'
                borderRadius='5px'
                value={fields.tag}
                name='tag'
                onChange={(e) => handleChanges('tag', e.target.value, true)}
                isTruncated
              >
                {tags.map((t) => (
                  <option key={t.id} value={t.tag}>
                    {t.tag}
                  </option>
                ))}
              </Select>
            </HStack>

            {/* date picker */}
            <HStack w='full' spacing={5}>
              {/* <Text whiteSpace='nowrap'>Due Date</Text> */}
              <Tooltip label='Due Date'>
                <Box aria-label='Due Date Icon'>
                  <Icon as={FaRegCalendarAlt} />
                </Box>
              </Tooltip>
              <Box>
                <DatePicker
                  id='dpInput'
                  name='dueDate'
                  placeholderText='Add Due Date'
                  className={`calendar-input ${mode}`}
                  selected={getDueDate(fields)}
                  onChange={(v) => handleChanges('dueDate', v, true)}
                  timeInputLabel='Time:'
                  dateFormat='MM/dd/yyyy'
                  onCalendarOpen={handleCalendarTheme}
                  shouldCloseOnSelect={false}
                  minDate={new Date()}
                  isClearable
                />
              </Box>
            </HStack>

            {/* subtasks */}
            <SubTasks
              task={task}
              onChange={(v) => handleChanges('subtasks', v, true)}
            />

            {/* custom textarea for description  */}
            <Flex justifyContent='flex-start' w='full'>
              <MyEditable
                onSubmit={(d) => handleChanges('description', d, true)}
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
            borderColor={`${mode}.drawerBorder`}
            justifyContent='space-between'
            alignItems='center'
            color={`${mode}.drawerText`}
            p='5px'
          >
            <Tooltip label='Close'>
              <Box
                borderRadius='50%'
                cursor='pointer'
                _hover={{ backgroundColor: `${mode}.drawerActionsHover` }}
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
                _hover={{ backgroundColor: `${mode}.drawerActionsHover` }}
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
  onUpdate: () => void 0,
  task: {
    id: '',
    name: '',
    tag: 'untagged',
    description: '',
  },
  tags: {},
}

export default TaskDrawer
