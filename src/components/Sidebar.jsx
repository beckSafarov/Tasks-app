import { useState } from 'react'
import {
  Container,
  HStack,
  VStack,
  Box,
  useDisclosure,
  Icon,
  Flex,
  Collapse,
  Text,
  Image,
  Divider,
  useColorMode,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaCaretRight,
  FaCaretDown,
  FaTasks,
  FaSun,
  FaRegMoon,
  FaCalendarDay,
  FaTags,
  FaHammer,
} from 'react-icons/fa'
import AddTagModal from './Modals/AddTagModal'
import CustomAvatar from './CustomAvatar'
import AccountModal from './Modals/AccountModal'
import { usePrefsContext, useTagsContext } from '../hooks/ContextHooks'
import { getAuth } from '@firebase/auth'
import { defUser } from '../firebase/auth'

export const mainPageLinks = [
  { text: 'Today', link: '/today', icon: FaSun },
  { text: 'Tomorrow', link: '/tomorrow', icon: FaRegMoon },
  {
    text: 'Upcoming',
    link: '/upcoming',
    icon: FaCalendarDay,
  },
  {
    text: 'All Tasks',
    link: '/all-tasks',
    icon: FaTasks,
  },
  { text: 'Test', link: '/test', icon: FaHammer },
]

const Sidebar = () => {
  const { preferences: prefs, sidebarTagsToggle } = usePrefsContext()
  const {
    isOpen: isAddTagModalOpen,
    onOpen: onAddTagModalOpen,
    onClose: onAddTagModalClosed,
  } = useDisclosure()

  const [caret, setCaret] = useState(prefs.sidebarTagsToggle)
  const [accountModal, setAccountModal] = useState(false)
  const { tags, add: addTag } = useTagsContext()
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: prefs.sidebarTagsToggle,
  })
  const { colorMode: mode } = useColorMode()
  const user = getAuth()?.currentUser || defUser
  const loc = useLocation()

  const toggleClicked = () => {
    setCaret(!caret)
    onToggle()
    sidebarTagsToggle()
  }

  const addTagModalSubmit = (tag) => {
    addTag(tag)
    onAddTagModalClosed()
  }

  const handleActiveBg = (link) =>
    loc.pathname === link ? `${mode}.sidebarActiveLink` : ''

  const menuOptionHover = {
    color: `${mode}.sidebarHoverText`,
  }

  return (
    <Container mt='7'>
      <AddTagModal
        isOpen={isAddTagModalOpen}
        onSubmit={addTagModalSubmit}
        onClose={onAddTagModalClosed}
        tags={tags}
      />
      {/* profile info button place */}
      <HStack
        spacing={2}
        cursor='pointer'
        p='2'
        _hover={menuOptionHover}
        borderRadius='md'
        onClick={() => setAccountModal(true)}
      >
        <Image
          hidden={true}
          borderRadius='full'
          boxSize='40px'
          src={user?.photoURL || ''}
          alt='Avatar'
        />
        <CustomAvatar
          mode={mode}
          hidden={false}
          fullName={user.displayName}
          width='40'
        />
        <Text isTruncated>{user.displayName}</Text>
      </HStack>

      <AccountModal
        show={accountModal}
        onClose={() => setAccountModal(false)}
      />

      {/* page links */}
      <VStack w='full' alignItems='flex-start' pt='3' spacing={0}>
        {/* main task page links */}
        {mainPageLinks.map((page, i) => (
          <Link key={i} to={page.link} style={{ width: '100%' }}>
            <Box
              p={2}
              position='relative'
              bg={handleActiveBg(page.link)}
              fontSize='18'
              fontWeight='600'
              _hover={loc.pathname !== page.link ? menuOptionHover : {}}
              borderRadius='md'
            >
              <HStack spacing={2}>
                <Icon as={page.icon} /> <span>{page.text}</span>
              </HStack>
            </Box>
          </Link>
        ))}
        <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
        {/* tags toggle */}
        <Flex
          p={2}
          alignItems='flex-start'
          justifyContent='space-between'
          w={'full'}
          fontSize={18}
          fontWeight='600'
          borderRadius='md'
          cursor='pointer'
          onClick={toggleClicked}
          _hover={menuOptionHover}
        >
          <HStack spacing={2}>
            <Icon as={FaTags} /> <span>Tags</span>
          </HStack>
          <span>
            <Icon as={caret ? FaCaretDown : FaCaretRight}></Icon>
          </span>
        </Flex>
        {/* tags toggle contents */}
        <Box w='full'>
          <Collapse in={isOpen} animateOpacity>
            <VStack spacing={0}>
              {tags.map((tag, i) => (
                <Link key={i} to={`/tag/${tag.id}`} style={{ width: '100%' }}>
                  <Box
                    p={1}
                    paddingLeft={'20px'}
                    _hover={menuOptionHover}
                    w='full'
                    bg={handleActiveBg(`/tag/${tag.id}`)}
                    borderRadius='10px'
                  >
                    <Flex
                      alignItems='center'
                      justifyContent='space-between'
                      pr='5px'
                    >
                      <Text isTruncated>{tag.tag}</Text>{' '}
                    </Flex>
                  </Box>
                </Link>
              ))}
              <Box
                p={1}
                paddingLeft={'20px'}
                cursor='pointer'
                _hover={{ ...menuOptionHover, color: 'blue.200' }}
                w='full'
                borderRadius='10px'
              >
                <Text onClick={onAddTagModalOpen}>+ New Tag</Text>
              </Box>
            </VStack>
          </Collapse>
        </Box>
      </VStack>
    </Container>
  )
}

export default Sidebar
