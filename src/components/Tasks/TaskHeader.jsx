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
  useColorMode,
} from '@chakra-ui/react'
import SearchTask from '../SearchTask'
import {
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
  FaCog,
  FaSun,
  FaRegMoon,
} from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { useTagsContext, useTasksContext } from '../../hooks/ContextHooks'
import { useLocation } from 'react-router-dom'
import { toastDefs } from '../../helpers/tasksHelpers'

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
  const { colorMode, toggleColorMode } = useColorMode()
  const tagEditInput = useRef(null)
  const { update: updateTag, updateTagInDB, tags } = useTagsContext()
  const { updateTag: updateTaskTags } = useTasksContext()
  const toast = useToast()
  const loc = useLocation().pathname
  const noEditableTag = !loc.match(/tag/) || page === 'untagged'

  useEffect(() => {
    if (title !== tagName) setTagName(title)
  }, [title])

  const validated = (newTitle) => {
    if (!tagName || newTitle === title) return false

    if (tags.find((t) => t.tag === newTitle)) {
      toast({
        ...toastDefs,
        title: 'Duplicate tag names are not allowed',
        description: `The tag name "${newTitle}" already exists.`,
      })
      return false
    }
    return true
  }

  const tagUpdated = (newTitle) => {
    if (validated(newTitle)) {
      updateTag(title, newTitle)
      updateTaskTags(title, newTitle)
      setTimeout(() => updateTagInDB(page, newTitle), 100)
    } else {
      setTagName(title)
    }
    setTagEditMode(false)
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
            isDisabled={noEditableTag} //disabled in non-tag pages
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
          <Menu>
            <Tooltip label='Settings'>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<Icon as={FaCog} />}
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
                  icon={<Icon as={colorMode === 'light' ? FaRegMoon : FaSun} />}
                  onClick={toggleColorMode}
                >
                  {colorMode === 'light' ? 'Dark' : 'Light'} mode
                </MenuItem>
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
                  hidden={noEditableTag} //hidden in non-tag pages
                  icon={<Icon as={FaEdit} />}
                >
                  Rename tag
                </MenuItem>
                <MenuItem
                  onClick={() => removeTasksByTag()}
                  hidden={noEditableTag} //hidden in non-tag pages
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
