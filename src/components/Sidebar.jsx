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
  useColorMode,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCaretRight, FaCaretDown } from 'react-icons/fa'
import AddTagModal from './Modals/AddTagModal'
import CustomAvatar from './CustomAvatar'
import AccountModal from './Modals/AccountModal'
import { usePrefsContext, useTagsContext } from '../hooks/ContextHooks'
import { getAuth } from '@firebase/auth'
import { defUser } from '../firebase/auth'

const mainPageLinks = [
  { text: 'All Tasks', link: '/all-tasks' },
  { text: 'Today', link: '/today' },
  { text: 'Tomorrow', link: '/tomorrow' },
  { text: 'Upcoming', link: '/upcoming' },
  { text: 'Test', link: '/test' },
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

  const toggleClicked = () => {
    setCaret(!caret)
    onToggle()
    sidebarTagsToggle()
  }

  const addTagModalSubmit = (tag) => {
    addTag(tag)
    onAddTagModalClosed()
  }

  const menuOptionHover = {
    background: `${mode}.sidebar_hover`,
    color: `${mode}.sidebar_hover_text`,
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
        {user.photoURL ? (
          <Image
            borderRadius='full'
            boxSize='40px'
            src={user.photoURL}
            alt='Avatar'
          />
        ) : (
          <CustomAvatar fullName={user.displayName} width='40' />
        )}
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
              display='flex'
              alignItems='flex-start'
              fontSize={18}
              fontWeight='600'
              _hover={menuOptionHover}
              borderRadius='md'
            >
              {page.text}
            </Box>
          </Link>
        ))}

        {/* tags toggle */}
        <Box
          p={2}
          display='flex'
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
          <span>Tags</span>
          <span>
            <Icon as={caret ? FaCaretDown : FaCaretRight}></Icon>
          </span>
        </Box>
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
