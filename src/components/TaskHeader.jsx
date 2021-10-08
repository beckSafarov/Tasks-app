import {
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  IconButton,
  Container,
  Box,
  Spacer,
  Flex,
} from '@chakra-ui/react'
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
  FaTrash,
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
  removeTasksByTag,
}) => {
  return (
    <Box
      position='sticky'
      bg='#fff'
      pt='20px'
      pb='10px'
      top='10px'
      ml='20px'
      mr='20px'
      boxShadow='base'
      right='5px'
      left='5px'
      rounded='md'
      zIndex={10}
    >
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
            _focus={{ borderColor: 'none' }}
            borderRadius={'50%'}
            _hover={{ background: 'gray.100' }}
          />
          <MenuList>
            <MenuGroup title='Actions'>
              {/* --- actions ---*/}
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

              <MenuItem hidden={isMainPage} icon={<Icon as={FaEdit} />}>
                Rename tag
              </MenuItem>
              <MenuItem
                onClick={() => removeTasksByTag()}
                hidden={isMainPage}
                icon={<Icon as={FaTrash} />}
              >
                Delete tag
              </MenuItem>
            </MenuGroup>
            <MenuDivider />

            <MenuGroup title='Sort By'>
              {/* --- sorts ---*/}
              <MenuItem
                onClick={() => onSort('tag')}
                hidden={!isMainPage}
                icon={<Icon as={FaTag} />}
              >
                <Flex>
                  <Box>Tag</Box>
                  <Spacer />
                  <Box>
                    <Icon hidden={sortType !== 'tag'} as={FaCheck} />
                  </Box>
                </Flex>
              </MenuItem>
              {/* sort by date */}
              <MenuItem
                onClick={() => onSort('date')}
                icon={<Icon as={FaRegCalendarAlt} />}
              >
                <Flex>
                  <Box>Date</Box>
                  <Spacer />
                  <Box>
                    <Icon hidden={sortType !== 'date'} as={FaCheck} />
                  </Box>
                </Flex>
              </MenuItem>

              {/* sort by importance */}
              <MenuItem
                onClick={() => onSort('importance')}
                icon={<Icon as={FaRegStar} />}
              >
                <Flex>
                  <Box>Importance</Box>
                  <Spacer />
                  <Box>
                    <Icon hidden={sortType !== 'importance'} as={FaCheck} />
                  </Box>
                </Flex>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Container>
    </Box>
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
  removeTasksByTag: () => void 0,
}

export default TaskHeader
