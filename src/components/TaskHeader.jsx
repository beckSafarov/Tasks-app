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
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Tooltip,
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
  const [tagName, setTagName] = useState('')
  const [tagEditMode, setTagEditMode] = useState(false)
  const tagEditInput = useRef(null)
  const { update: updateTag } = useContext(TagsContext)
  const { updateMany: updateTaskTags } = useContext(TasksContext)

  useEffect(() => {
    if (title !== tagName) setTagName(title)
  }, [title])

  const tagUpdated = (value) => {
    if (tagName) {
      updateTag(title, value)
      updateTaskTags(title, value)
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
      top='10px'
      ml='20px'
      mr='20px'
      boxShadow='base'
      right='5px'
      left='5px'
      rounded='md'
      zIndex={10}
    >
      <HStack px='50px' display='flex'>
        <Heading size='lg' color='gray.800' flex='1'>
          <Editable
            value={tagName}
            onSubmit={tagUpdated}
            onCancel={tagUpdated}
            isDisabled={isMainPage}
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
                  hidden={isMainPage}
                  icon={<Icon as={FaEdit} />}
                >
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
                {/* sort by creation date */}
                <MenuItem
                  onClick={() => onSort('creation_date')}
                  icon={<Icon as={FaRegCalendarPlus} />}
                >
                  <Flex>
                    <Box>Creation Date</Box>
                    <Spacer />
                    <Box>
                      <Icon
                        hidden={sortType !== 'creation_date'}
                        as={FaCheck}
                      />
                    </Box>
                  </Flex>
                </MenuItem>
                {/* sort by due date */}
                <MenuItem
                  onClick={() => onSort('due_date')}
                  icon={<Icon as={FaRegCalendarAlt} />}
                >
                  <Flex>
                    <Box>Due Date</Box>
                    <Spacer />
                    <Box>
                      <Icon hidden={sortType !== 'due_date'} as={FaCheck} />
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
  isMainPage: true,
  sortType: 'none',
  onSort: () => void 0,
  removeTasksByTag: () => void 0,
}

export default TaskHeader
