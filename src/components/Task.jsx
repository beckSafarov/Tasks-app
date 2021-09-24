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

const Task = ({ task, onOpen, completed }) => {
  const { toggle, remove } = useContext(TasksContext)

  const toggleDone = () => toggle(task.id)

  const removeTask = () => remove(task.id)

  return (
    <div style={{ width: '100%', marginTop: '0.3rem' }}>
      <Flex
        w='full'
        bg='gray.100'
        pl={'10px'}
        py='5px'
        borderRadius='10px'
        fontSize='lg'
      >
        <Flex justifyContent='center' alignItems='center' mr='10px'>
          {!completed ? (
            <CircleIcon onClick={toggleDone} color='#808080' />
          ) : (
            <div style={{ cursor: 'pointer' }}>
              <CheckCircleIcon onClick={toggleDone} color='blue.200' />
            </div>
          )}
        </Flex>
        <Text w='full' onClick={() => onOpen(task)} py={1} cursor='pointer'>
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
              onClick={removeTask}
            >
              Delete Task
            </MenuItem>
          </MenuList>
        </Menu>
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
