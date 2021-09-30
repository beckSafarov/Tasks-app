import {
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  IconButton,
  Container,
  Box,
} from '@chakra-ui/react'
import AddTask from './AddTask'
import SearchTask from './SearchTask'
import { FaEllipsisH, FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa'

const TaskHeader = ({
  title,
  onSearchSubmit,
  onSearchClear,
  showCompTasks,
  toggleCompTasks,
}) => {
  return (
    <div className='navbar'>
      <Container
        maxW='container.lg'
        display='flex'
        justifyContent='space-between'
      >
        <Heading size='lg' color='gray.800'>
          {title}
        </Heading>
        <SearchTask onSubmit={onSearchSubmit} onClear={onSearchClear} />
        <Menu size='sm'>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<Icon as={FaEllipsisH} />}
            variant='flushed'
          />
          <MenuList>
            <MenuItem
              icon={
                !showCompTasks ? <Icon as={FaEye} /> : <Icon as={FaEyeSlash} />
              }
              onClick={toggleCompTasks}
            >
              {!showCompTasks ? 'Show' : 'Hide'} completed tasks
            </MenuItem>
            <MenuItem icon={<Icon as={FaEdit} />}>Rename list</MenuItem>
          </MenuList>
        </Menu>
      </Container>
    </div>
  )
}

TaskHeader.defaultProps = {
  title: 'All Tasks',
  showCompTasks: false,
  onSearchSubmit: () => void 0,
  onSearchClear: () => void 0,
  toggleCompTasks: () => void 0,
  showCompTasks: false,
}

export default TaskHeader
