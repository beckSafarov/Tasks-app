import { useContext } from 'react'
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

const Task = ({ task, onOpen, completed }) => {
  const { toggle, remove } = useContext(TasksContext)
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()

  const toggleDone = () => {
    console.log('toggle clicked for ' + task.name)
    toggle(task.id)
  }

  const removeTask = (e) => {
    remove(task.id)
    onModalClose(e)
  }

  return (
    <div style={{ width: '100%', marginTop: '0.3rem' }}>
      <Flex
        w='full'
        bg='gray.100'
        pl={'10px'}
        py='5px'
        borderRadius='10px'
        fontSize='lg'
        id='task_flex'
      >
        <Flex
          id='task_circle_div'
          justifyContent='center'
          alignItems='center'
          mr='10px'
        >
          {!completed ? (
            <CircleIcon
              id='task_emptyCircle_icon'
              onClick={toggleDone}
              color='#808080'
            />
          ) : (
            <div id='task_fullCircle_icon_div' style={{ cursor: 'pointer' }}>
              <CheckCircleIcon
                id='task_fullCircle_icon'
                onClick={toggleDone}
                color='blue.200'
              />
            </div>
          )}
        </Flex>
        <Text
          id='task_text'
          w='full'
          onClick={() => onOpen(task)}
          py={1}
          cursor='pointer'
        >
          {!completed ? (
            task.name
          ) : (
            <Text as='s' color='gray.500'>
              {task.name}
            </Text>
          )}
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
    </div>
  )
}

Task.defaultProps = {
  task: {
    name: 'unnamed',
    description: '',
  },
  onOpen: () => false,
  completed: false,
}

export default Task
