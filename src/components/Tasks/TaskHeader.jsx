import {
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  FaSortAmountDown,
} from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { useTagsContext, useTasksContext } from '../../hooks/ContextHooks'
import { useLocation } from 'react-router-dom'
import { toastDefs } from '../../helpers/tasksHelpers'

const sorts = [
  {
    label: 'Alphabetically',
    type: 'alphabetically',
    icon: FaSortAlphaDown,
  },
  { label: 'Tag', type: 'tag', icon: FaTag },
  { label: 'Creation Date', type: 'creationDate', icon: FaRegCalendarPlus },
  {
    label: 'Due Date',
    type: 'dueDate',
    icon: FaRegCalendarAlt,
  },
  { label: 'Importance', type: 'starred', icon: FaRegStar },
]

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
  const { update: updateTag, updateTagInDB, tags } = useTagsContext()
  const { updateTag: updateTaskTags } = useTasksContext()

  // color themes
  const { colorMode: mode, toggleColorMode } = useColorMode()

  const tagEditInput = useRef(null)
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

  const settings = [
    {
      icon: mode === 'light' ? FaRegMoon : FaSun,
      command: '⌘+Shift+L',
      onClick: toggleColorMode,
      label: (mode === 'light' ? 'Dark' : 'Light') + ' mode',
    },
    {
      icon: !showCompTasks ? FaEye : FaEyeSlash,
      command: '⌘+⌥+A',
      onClick: toggleCompTasks,
      label: (!showCompTasks ? 'Show' : 'Hide') + ' completed tasks',
    },
    {
      icon: FaEdit,
      hidden: noEditableTag,
      onClick: () => tagEditInput.current.focus(),
      label: 'Rename tag',
    },
    {
      icon: FaTrash,
      hidden: noEditableTag,
      onClick: () => removeTasksByTag(),
      label: 'Delete tag',
    },
  ]

  return (
    <Box
      position='sticky'
      bg={`${mode}.taskHeaderBg`}
      pt='20px'
      pb='10px'
      top='0'
      ml='20px'
      mr='20px'
      right='0'
      left='0'
      zIndex={10}
      borderBottom='1px solid'
      borderBottomColor={`${mode}.headerBorder`}
    >
      <HStack px='50px' display='flex'>
        <Heading size='lg' color={`${mode}.headerHeading`} flex='1'>
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

        <Box flex='1' display='flex' justifyContent='right'>
          {/* --- sorts menu --- */}
          <Menu>
            <Tooltip label='Sort' closeOnClick closeOnMouseDown>
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<Icon as={FaSortAmountDown} />}
                variant='flushed'
                _focus={{ borderColor: 'none' }}
                borderRadius='50%'
                _hover={{ background: `${mode}.headerMenuBtnHover` }}
              />
            </Tooltip>
            <MenuList fontSize='0.8rem'>
              {sorts.map((sort, i) => (
                <MenuItem
                  onClick={() => onSort(sort.type)}
                  key={i}
                  icon={<Icon as={sort.icon} />}
                >
                  <Flex>
                    <Box>{sort.label}</Box>
                    <Spacer />
                    <Box>
                      <Icon hidden={sortType !== sort.type} as={FaCheck} />
                    </Box>
                  </Flex>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* --- settings menu */}
          <Menu>
            <Tooltip
              aria-label='A tooltip'
              label='Settings'
              closeOnClick
              closeOnMouseDown
            >
              <MenuButton
                as={IconButton}
                aria-label='Menu'
                icon={<Icon as={FaCog} />}
                variant='flushed'
                _focus={{ borderColor: 'none' }}
                borderRadius={'50%'}
                _hover={{ background: `${mode}.headerMenuBtnHover` }}
              />
            </Tooltip>
            <MenuList fontSize='0.8rem'>
              {settings.map((action, i) => (
                <MenuItem
                  icon={<Icon as={action.icon} />}
                  command={action.command || ''}
                  hidden={action.hidden || false}
                  onClick={action.onClick}
                  key={i}
                >
                  {action.label}
                </MenuItem>
              ))}
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
