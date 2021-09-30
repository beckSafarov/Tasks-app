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
  Spacer,
  Flex,
} from '@chakra-ui/react'
import AddTask from './AddTask'
import SearchTask from './SearchTask'
import {
  FaEllipsisH,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaTag,
  FaRegCalendarAlt,
  FaCheck,
  FaRegStar,
} from 'react-icons/fa'

const TaskHeader = ({
  title,
  onSearchSubmit,
  onSearchClear,
  showCompTasks,
  toggleCompTasks,
  isMainPage,
  sortType,
  onSort,
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
        <Menu size='sm' closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<Icon as={FaEllipsisH} />}
            variant='flushed'
          />
          <MenuList>
            <MenuGroup title='Actions'>
              {/* show/hide completed tasks btn */}
              <MenuItem
                icon={
                  !showCompTasks ? (
                    <Icon as={FaEye} />
                  ) : (
                    <Icon as={FaEyeSlash} />
                  )
                }
                onClick={toggleCompTasks}
              >
                {!showCompTasks ? 'Show' : 'Hide'} completed tasks
              </MenuItem>

              {/* rename list btn */}
              <MenuItem isDisabled={isMainPage} icon={<Icon as={FaEdit} />}>
                Rename list
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Sort By'>
              {/* sort by tag */}
              <MenuItem
                onClick={() => onSort('tag')}
                isDisabled={!isMainPage}
                icon={<Icon as={FaTag} />}
              >
                <Flex>
                  <Box>Tag</Box>
                  <Spacer />
                  {sortType === 'tag' && (
                    <Box>
                      <Icon as={FaCheck} />
                    </Box>
                  )}
                </Flex>
              </MenuItem>
              {/* sort by date */}
              <MenuItem
                onClick={() => onSort('date')}
                isDisabled
                icon={<Icon as={FaRegCalendarAlt} />}
              >
                Date
              </MenuItem>
              {/* sort by importance */}
              <MenuItem
                onClick={() => onSort('importance')}
                isDisabled
                icon={<Icon as={FaRegStar} />}
              >
                Importance
              </MenuItem>
            </MenuGroup>
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
  isMainPage: true,
  sortType: 'none',
  onSort: () => void 0,
}

export default TaskHeader
