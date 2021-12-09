import { useState, useContext, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaCaretRight, FaCaretDown } from 'react-icons/fa'
import { TagsContext } from '../../Context/TagsContext'
import AddTagModal from '../AddTagModal'
import { useHistory } from 'react-router'
import { PreferencesContext } from '../../Context/PreferencesContext'
import CustomAvatar from '../CustomAvatar'
import AccountModal from '../AccountModal'
import { useAppContext } from '../../hooks/ContextHooks'
import { getAuth } from '@firebase/auth'

const menuOptionHover = {
  background: 'light.sidebar_hover',
  cursor: 'pointer',
  color: 'white',
}

const Sidebar = () => {
  const { preferences: prefs, sidebarTagsToggle } =
    useContext(PreferencesContext)
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: prefs.sidebarTagsToggle,
  })
  const history = useHistory()
  const {
    isOpen: isAddTagModalOpen,
    onOpen: onAddTagModalOpen,
    onClose: onAddTagModalClosed,
  } = useDisclosure()

  const [caret, setCaret] = useState(prefs.sidebarTagsToggle)
  const [newTag, setNewTag] = useState('')
  const [accountModal, setAccountModal] = useState(false)
  const { tags, add: addTag } = useContext(TagsContext)
  const context = useAppContext()
  const user = context?.user || getAuth().currentUser

  useEffect(() => {
    if (newTag && tags[newTag]) {
      setNewTag('')
      history.push(`/tag/${tags[newTag]}`)
    }
  }, [tags, newTag, history])

  const toggleClicked = (e) => {
    setCaret(!caret)
    onToggle()
    sidebarTagsToggle()
  }

  const addTagModalSubmit = (tag) => {
    setNewTag(tag)
    addTag(tag)
    onAddTagModalClosed()
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
        color='#fff'
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
      <VStack
        w='full'
        alignItems='flex-start'
        pt='3'
        spacing={0}
        color='light.sidebar_text'
      >
        {/* all tasks link */}
        <Link to='/all-tasks' style={{ width: '100%' }}>
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
            All Tasks
          </Box>
        </Link>
        {/* today's tasks link */}
        <Link to='/today' style={{ width: '100%' }}>
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
            Today
          </Box>
        </Link>
        {/* tomorrow's tasks link */}
        <Link to='/tomorrow' style={{ width: '100%' }}>
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
            Tomorrow
          </Box>
        </Link>
        {/* tomorrow's tasks link */}
        <Link to='/upcoming' style={{ width: '100%' }}>
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
            Upcoming
          </Box>
        </Link>
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
          onClick={toggleClicked}
          _hover={menuOptionHover}
        >
          <span>Tags</span>
          <span>
            <Icon as={caret ? FaCaretDown : FaCaretRight}></Icon>
          </span>
        </Box>
        {/* tags toggle contents */}
        <Box color='light.sidebar_text' w='full'>
          <Collapse in={isOpen} animateOpacity>
            <VStack spacing={0}>
              {Object.keys(tags).map((tag, i) => (
                <Link
                  key={i}
                  to={`/tag/${tags[tag]}`}
                  style={{ width: '100%' }}
                >
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
                      <Text isTruncated>{tag}</Text>{' '}
                    </Flex>
                  </Box>
                </Link>
              ))}
              <Box
                p={1}
                paddingLeft={'20px'}
                _hover={{ ...menuOptionHover, color: 'blue.200' }}
                w='full'
                borderRadius='10px'
              >
                <Text onClick={onAddTagModalOpen}>+ New Tag</Text>
              </Box>
            </VStack>
          </Collapse>
        </Box>

        {/* link to test page */}
        <Link to='/test' style={{ width: '100%' }}>
          <Box
            p={2}
            position='relative'
            display='flex'
            alignItems='flex-start'
            fontSize={18}
            fontWeight='600'
            _hover={menuOptionHover}
            borderRadius='10px'
          >
            Test
          </Box>
        </Link>
      </VStack>
    </Container>
  )
}

export default Sidebar
