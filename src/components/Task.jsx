import { useContext, useState } from 'react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  useDisclosure,
  Box,
} from '@chakra-ui/react'
import { TasksContext } from '../Context/TasksContext'
import CircleIcon from './CircleIcon'
import {
  FaEllipsisV,
  FaTrash,
  FaRegCheckCircle,
  FaCheckCircle,
  FaEdit,
  FaStar as FullStar,
  FaRegStar as EmptyStar,
} from 'react-icons/fa'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatTaskTime as format } from '../helpers/tasksHelpers'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const Task = ({ task, onOpen, completed, onDelete, isMainPage, sortType }) => {
  const { update: updateTask } = useContext(TasksContext)
  const { onClose: onModalClose } = useDisclosure()

  const toggleDone = () => updateTask({ ...task, done: !task.done })

  const toggleStar = () =>
    updateTask({ ...task, starred: task.starred ? null : { date: new Date() } })

  const handleRemoveTask = (e) => {
    onDelete(task)
    onModalClose(e)
  }

  return (
    <div style={{ width: '100%', marginTop: '5px' }}>
      <Flex
        w='full'
        bg='gray.100'
        pl={'10px'}
        py='5px'
        borderRadius='10px'
        fontSize='lg'
      >
        {/* task completion circle icon */}
        <Flex justifyContent='center' alignItems='center' mr='10px'>
          <Box cursor='pointer'>
            {!completed ? (
              <CircleIcon onClick={toggleDone} color='#808080' />
            ) : (
              <CheckCircleIcon onClick={toggleDone} color='blue.200' />
            )}
          </Box>
        </Flex>

        {/* task text */}
        <Flex
          alignItems='flex-start'
          flexDirection='column'
          w='full'
          py={1}
          cursor='pointer'
          onClick={() => onOpen(task)}
        >
          <Text
            as={completed ? 's' : ''}
            color={completed ? 'gray.500' : ''}
            mb='0'
          >
            {task.name}
          </Text>
          <Text mt='0' hidden={!isMainPage} fontSize='0.8rem' color='gray.500'>
            {task.tag}
          </Text>
        </Flex>

        {/* --- due date --- */}
        <Flex
          w='full'
          alignItems='center'
          justifyContent='flex-end'
          fontSize='0.7em'
          color='gray.500'
          pr='20px'
          cursor='pointer'
          onClick={() => onOpen(task)}
        >
          <Text>{task.dueDate ? format(task.dueDate) : 'Someday'}</Text>
        </Flex>

        {/* --- importance star */}
        <Box display='flex' alignItems='center'>
          <Icon
            cursor='pointer'
            as={task.starred ? FullStar : EmptyStar}
            onClick={toggleStar}
          />
        </Box>

        {/* actions with the task */}
        <Box display='flex' alignItems='center'>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<Icon color='gray.800' as={FaEllipsisV}></Icon>}
              variant='unstyled'
              size='sm'
              _focus={{ border: 'none' }}
            />
            <MenuList zIndex='2'>
              <MenuItem
                fontSize='sm'
                icon={
                  <Icon
                    color='gray.800'
                    as={!task.done ? FaCheckCircle : FaRegCheckCircle}
                  ></Icon>
                }
                onClick={toggleDone}
              >
                {!task.done ? 'Mark as Completed' : 'Undo Completed'}
              </MenuItem>
              <MenuItem
                fontSize='sm'
                icon={<Icon color='gray.800' as={FaEdit}></Icon>}
                onClick={() => onOpen(task)}
              >
                Edit Task
              </MenuItem>
              <MenuDivider />
              <MenuItem
                fontSize='sm'
                icon={<Icon color='gray.800' as={FaTrash}></Icon>}
                onClick={handleRemoveTask}
              >
                Delete Task
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </div>
  )
}

Task.defaultProps = {
  task: {
    name: 'unnamed',
    description: '',
  },
  onOpen: () => void 0,
  onDelete: () => void 0,
  sortType: 'created_date',
  completed: false,
}

export default Task
