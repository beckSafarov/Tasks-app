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
  useColorMode,
} from '@chakra-ui/react'
import {
  FaEllipsisV,
  FaTrash,
  FaRegCheckCircle,
  FaCheckCircle,
  FaEdit,
  FaStar as FullStar,
  FaRegStar as EmptyStar,
  FaRegCircle,
} from 'react-icons/fa'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getDueDate, taskTimeHandler } from '../../helpers/dateHelpers'
import { usePrefsContext } from '../../hooks/ContextHooks'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const Task = ({
  task,
  active,
  onOpen,
  completed,
  onDelete,
  page,
  onUpdate,
}) => {
  const { onClose: onModalClose } = useDisclosure()
  const { preferences: prefs } = usePrefsContext()
  const taskTime = taskTimeHandler(getDueDate(task))
  const { colorMode: mode } = useColorMode()
  const dateColor = taskTime.isPast ? `${mode}.taskPast` : `${mode}.taskFuture`
  const circleColor = completed
    ? `${mode}.completedTaskCircle`
    : `${mode}.taskCircle`

  const toggleDone = () => {
    if (prefs.soundWhenTaskToggled && !task.done) {
      const audio = document.querySelector('#toggle_sound')
      audio.play()
    }
    onUpdate({ ...task, done: !task.done })
  }

  const toggleStar = () => {
    onUpdate({ ...task, starred: task.starred ? null : { date: new Date() } })
  }

  const handleRemoveTask = (e) => {
    onDelete(task)
    onModalClose(e)
  }

  return (
    <div style={{ width: '100%', marginTop: '5px' }}>
      <audio id='toggle_sound'>
        <source src='/toggle_sound.wav' type='audio/wav' />
      </audio>
      <Flex
        w='full'
        bg={active ? `${mode}.taskActive` : `${mode}.tasks`}
        pl={'10px'}
        py='5px'
        borderRadius='10px'
        fontSize='lg'
        color={`${mode}.taskText`}
      >
        {/* task completion circle icon */}
        <Flex justifyContent='center' alignItems='center' mr='10px'>
          <Box cursor='pointer' onClick={toggleDone}>
            <Icon
              color={circleColor}
              as={completed ? FaCheckCircle : FaRegCircle}
            />
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
            color={completed ? `${mode}.crossedTask` : 'inherit'}
            mb='0'
          >
            {task.name}
          </Text>
          <Text
            mt='0'
            hidden={page === 'tag'}
            fontSize='0.8rem'
            color={`${mode}.taskTag`}
          >
            {task.tag}
          </Text>
        </Flex>

        {/* --- due date --- */}
        <Flex
          w='full'
          alignItems='center'
          justifyContent='flex-end'
          fontSize='0.7em'
          color={dateColor}
          pr='20px'
          cursor='pointer'
          onClick={() => onOpen(task)}
        >
          <Text>{taskTime.date}</Text>
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
              icon={<Icon color={`${mode}.taskIcon`} as={FaEllipsisV}></Icon>}
              variant='unstyled'
              size='sm'
              _focus={{ border: 'none' }}
            />
            <MenuList zIndex='2'>
              <MenuItem
                fontSize='sm'
                icon={
                  <Icon
                    color={`${mode}.taskIcon`}
                    as={!task.done ? FaCheckCircle : FaRegCheckCircle}
                  ></Icon>
                }
                onClick={toggleDone}
              >
                {!task.done ? 'Mark as Completed' : 'Undo Completed'}
              </MenuItem>
              <MenuItem
                fontSize='sm'
                icon={<Icon color={`${mode}.taskIcon`} as={FaEdit}></Icon>}
                onClick={() => onOpen(task)}
              >
                Edit Task
              </MenuItem>
              <MenuDivider />
              <MenuItem
                fontSize='sm'
                icon={<Icon color={`${mode}.taskIcon`} as={FaTrash}></Icon>}
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
  active: false,
  onOpen: () => void 0,
  onUpdate: () => void 0,
  onDelete: () => void 0,
  completed: false,
  page: 'home',
}

export default Task
