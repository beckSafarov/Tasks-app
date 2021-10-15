import { useContext, useEffect, useState } from 'react'
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
  VStack,
} from '@chakra-ui/react'
import { TasksContext } from '../Context/TasksContext'
import CircleIcon from './CircleIcon'
import {
  FaEllipsisV,
  FaTrash,
  FaRegCheckCircle,
  FaCheckCircle,
  FaEdit,
  FaTag,
  FaStar as FullStar,
  FaRegStar as EmptyStar,
} from 'react-icons/fa'
import ConfirmModal from './ConfirmModal'

const Task = ({ task, onOpen, completed, onDelete, isMainPage }) => {
  const { toggle, remove, toggleStar } = useContext(TasksContext)
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const toggleDone = () => toggle(task.id)

  const handleToggleStar = () => toggleStar(task.id)

  const removeTask = (e) => {
    onDelete(task)
    remove(task.id)
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
        <Flex justifyContent='center' alignItems='center' mr='10px'>
          <Box cursor='pointer'>
            {!completed ? (
              <CircleIcon onClick={toggleDone} color='#808080' />
            ) : (
              <CheckCircleIcon onClick={toggleDone} color='blue.200' />
            )}
          </Box>
        </Flex>
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

        {/* --- importance star */}
        <Box display='flex' alignItems='center'>
          <Icon
            cursor='pointer'
            as={task.starred ? FullStar : EmptyStar}
            onClick={handleToggleStar}
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
            <MenuList>
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
                onClick={onModalOpen}
              >
                Delete Task
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <ConfirmModal
          title={`"${task.name}" will be permanently deleted`}
          body="You won't be able to undo this action."
          onProceed={removeTask}
          onClose={onModalClose}
          isOpen={isModalOpen}
          proceedTitle={'Delete'}
        />
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
  completed: false,
}

export default Task
