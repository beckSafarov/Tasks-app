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
} from '@chakra-ui/react'
import { TasksContext } from '../Context/TasksContext'
import CircleIcon from './CircleIcon'
import {
  FaEllipsisV,
  FaTrash,
  FaRegCheckCircle,
  FaCheckCircle,
  FaEdit,
} from 'react-icons/fa'
import ConfirmModal from './ConfirmModal'

const Task = ({ task, onOpen, completed, onDelete }) => {
  const { toggle, remove } = useContext(TasksContext)
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const toggleDone = () => toggle(task.id)

  const removeTask = (e) => {
    onDelete(task)
    remove(task.id)
    onModalClose(e)
  }

  return (
    <Box w='full' mt='0.3rem'>
      <Flex
        w='full'
        bg='gray.100'
        pl={'10px'}
        py='5px'
        borderRadius='10px'
        fontSize='lg'
      >
        <Flex justifyContent='center' alignItems='center' mr='10px'>
          <div style={{ cursor: 'pointer' }}>
            {!completed ? (
              <CircleIcon onClick={toggleDone} color='#808080' />
            ) : (
              <CheckCircleIcon onClick={toggleDone} color='blue.200' />
            )}
          </div>
        </Flex>
        <Text
          w='full'
          onClick={() => onOpen(task)}
          py={1}
          cursor='pointer'
          as={completed ? 's' : ''}
          color={completed ? 'gray.500' : ''}
        >
          {task.name}
        </Text>
        {/* actions with the task */}
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
        <ConfirmModal
          title={`"${task.name}" will be permanently deleted`}
          body="You won't be able to undo this action."
          onProceed={removeTask}
          onClose={onModalClose}
          isOpen={isModalOpen}
          proceedTitle={'Delete'}
        />
      </Flex>
    </Box>
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
