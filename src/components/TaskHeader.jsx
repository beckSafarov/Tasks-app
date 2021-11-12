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
  Box,
  Spacer,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Tooltip,
  useToast,
  Button,
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
  FaSortAlphaDown,
  FaRegCalendarPlus,
} from 'react-icons/fa'
import { useState, useEffect, useContext, useRef } from 'react'
import { TagsContext } from '../Context/TagsContext'
import { TasksContext } from '../Context/TasksContext'
import { logout } from '../firebase/auth'
import { useHistory } from 'react-router'

const TaskHeader = ({
  title,
  onSearchSubmit,
  onSearchClear,
  showCompTasks,
  toggleCompTasks,
  sortType,
  onSort,
  removeTasksByTag,
  page,
}) => {
  const [tagName, setTagName] = useState('')
  const [tagEditMode, setTagEditMode] = useState(false)
  const tagEditInput = useRef(null)
  const { update: updateTag, tags } = useContext(TagsContext)
  const { updateMany: updateTaskTags } = useContext(TasksContext)
  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    if (title !== tagName) setTagName(title)
  }, [title])

  const validated = (newTitle) => {
    if (!tagName || newTitle === title) {
      return false
    } else if (tags[newTitle]) {
      toast({
        title: 'Duplicate tag names are not allowed',
        position: 'bottom-right',
        description: `The tag name "${newTitle}" already exists.`,
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'subtle',
      })
      return false
    }
    return true
  }

  const tagUpdated = (newTitle) => {
    if (validated(newTitle)) {
      updateTag(title, newTitle)
      updateTaskTags(title, newTitle)
    } else {
      setTagName(title)
    }
    setTagEditMode(false)
  }

  const handleLogout = async () => {
    const loggedOut = await logout()
    if (loggedOut) history.replace('/')
  }

  return (
    <Box
      position='sticky'
      bg='#fff'
      pt='20px'
      pb='10px'
      top='0'
      ml='20px'
      mr='20px'
      right='0'
      left='0'
      borderBottom='1px solid #f4f4f4'
      zIndex={10}
    >
      <HStack px='50px' display='flex'>
        <Heading size='lg' color='gray.800' flex='1'>
          <Editable
            value={tagName}
            onSubmit={tagUpdated}
            onCancel={tagUpdated}
            isDisabled={page !== 'tag'} //disabled in non-tag pages
            startWithEditView={tagEditMode}
          >
            <EditablePreview
              overflow='hidden'
              textOverflow='ellipsis'
              whiteSpace='nowrap'
              w='200px'
              ref={tagEditInput}
            />
            <EditableInput
              _focus={{ border: 'none' }}
              onChange={(e) => setTagName(e.target.value)}
            />
          </Editable>
        </Heading>

        <Box flex='1'>
          <SearchTask onSubmit={onSearchSubmit} onClear={onSearchClear} />
        </Box>

        {/* --- page actions menu --- */}
        <Box flex='1' display='flex' justifyContent='right'>
          <Button colorScheme='gray' mr='20px' onClick={handleLogout}>
            Logout
          </Button>
          <Menu>
            <Tooltip label='Menu'>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<Icon as={FaEllipsisH} />}
                variant='flushed'
                _focus={{ borderColor: 'none' }}
                borderRadius={'50%'}
                _hover={{ background: 'gray.100' }}
              />
            </Tooltip>
            <MenuList fontSize='0.8rem'>
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

                <MenuItem
                  onClick={() => tagEditInput.current.focus()}
                  hidden={page !== 'tag'} //hidden in non-tag pages
                  icon={<Icon as={FaEdit} />}
                >
                  Rename tag
                </MenuItem>
                <MenuItem
                  onClick={() => removeTasksByTag()}
                  hidden={page !== 'tag'} //hidden in non-tag pages
                  icon={<Icon as={FaTrash} />}
                >
                  Delete tag
                </MenuItem>
              </MenuGroup>
              <MenuDivider />

              {/* --- sorts ---*/}
              <MenuGroup title='Sort'>
                <MenuItem
                  onClick={() => onSort('alphabetically')}
                  icon={<Icon as={FaSortAlphaDown} />}
                >
                  <Flex>
                    <Box>Alphabetically</Box>
                    <Spacer />
                    <Box>
                      <Icon
                        hidden={sortType !== 'alphabetically'}
                        as={FaCheck}
                      />
                    </Box>
                  </Flex>
                </MenuItem>
                <MenuItem
                  onClick={() => onSort('tag')}
                  hidden={page === 'tag'} //tag pages can't sort by tag
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
                {/* sort by creation date */}
                <MenuItem
                  onClick={() => onSort('creationDate')}
                  icon={<Icon as={FaRegCalendarPlus} />}
                >
                  <Flex>
                    <Box>Creation Date</Box>
                    <Spacer />
                    <Box>
                      <Icon hidden={sortType !== 'creationDate'} as={FaCheck} />
                    </Box>
                  </Flex>
                </MenuItem>
                {/* sort by due date */}
                <MenuItem
                  onClick={() => onSort('dueDate')}
                  icon={<Icon as={FaRegCalendarAlt} />}
                  hidden={page.match(/today|tomorrow/)}
                >
                  <Flex>
                    <Box>Due Date</Box>
                    <Spacer />
                    <Box>
                      <Icon hidden={sortType !== 'dueDate'} as={FaCheck} />
                    </Box>
                  </Flex>
                </MenuItem>

                {/* sort by importance */}
                <MenuItem
                  onClick={() => onSort('starred')}
                  icon={<Icon as={FaRegStar} />}
                >
                  <Flex>
                    <Box>Importance</Box>
                    <Spacer />
                    <Box>
                      <Icon hidden={sortType !== 'starred'} as={FaCheck} />
                    </Box>
                  </Flex>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
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
  sortType: 'none',
  onSort: () => void 0,
  removeTasksByTag: () => void 0,
  page: 'home',
}

export default TaskHeader
