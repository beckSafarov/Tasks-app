import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
} from '@chakra-ui/react'
import { FaEdit, FaEllipsisH, FaTrash } from 'react-icons/fa'

const TagDropdown = ({ onDelete, onRename, hidden }) => {
  return (
    <Menu variant='gray' color='#fff'>
      <MenuButton
        as={IconButton}
        size='sm'
        aria-label='Options'
        icon={<Icon fontSize='0.8rem' as={FaEllipsisH} />}
        variant='unstyled'
        _focus={{ border: 'none' }}
      />
      <MenuList>
        <MenuItem onClick={onDelete} icon={<Icon as={FaEdit} />}>
          Rename
        </MenuItem>
        <MenuItem onClick={onRename} icon={<Icon as={FaTrash} />}>
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

TagDropdown.defaultProps = {
  hidden: true,
  onDelete: () => void 0,
  onRename: () => void 0,
}

export default TagDropdown
