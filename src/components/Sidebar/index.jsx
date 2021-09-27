import { useState, useContext, useEffect } from 'react'
import {
  FormControl,
  Input,
  Container,
  VStack,
  Box,
  useDisclosure,
  Collapse,
  Icon,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { capitalize, groupByTag, hasProp } from '../../helpers'
import { FaCaretRight, FaCaretDown } from 'react-icons/fa'
import { TagsContext } from '../../Context/TagsContext'
import AddTagModal from '../AddTagModal'
import { useHistory } from 'react-router'

const menuOptionHover = {
  background: 'light.sidebar_hover',
  cursor: 'pointer',
  color: 'white',
}

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const history = useHistory()
  const {
    isOpen: isAddTagModalOpen,
    onOpen: onAddTagModalOpen,
    onClose: onAddTagModalClosed,
  } = useDisclosure()
  const [caret, setCaret] = useState(false)
  const [newTag, setNewTag] = useState('')
  const { tags, add: addTag } = useContext(TagsContext)

  useEffect(() => {
    if (newTag && tags[newTag]) {
      history.push(`/tag/${tags[newTag]}`)
    }
  }, [tags])

  const toggleClicked = (e) => {
    onToggle(e)
    setCaret(!caret)
  }

  const addTagModalSubmit = (tag, e) => {
    addTag(tag)
    setNewTag(tag)
    onAddTagModalClosed(e)
  }

  return (
    <Container mt='7'>
      <AddTagModal
        isOpen={isAddTagModalOpen}
        onSubmit={addTagModalSubmit}
        onClose={onAddTagModalClosed}
      />
      <FormControl>
        <Input
          type='text'
          placeholder='Search a task'
          bg='white'
          borderRadius='10px'
          borderColor='light.text'
        />
      </FormControl>
      <VStack
        w='full'
        alignItems='flex-start'
        mt={10}
        color='light.sidebar_text'
      >
        {/* all tasks link */}
        <Link to='/' style={{ width: '100%' }}>
          <Box
            p={2}
            display='flex'
            alignItems='flex-start'
            w={'full'}
            fontSize={18}
            fontWeight='600'
            _hover={menuOptionHover}
            borderRadius='10px'
          >
            All Tasks
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
          borderRadius='10px'
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
                    // border='1px solid white'
                    borderRadius='10px'
                  >
                    {capitalize(tag)}
                  </Box>
                </Link>
              ))}
            </VStack>
          </Collapse>
        </Box>

        <Box
          cursor='pointer'
          position='absolute'
          bottom='20px'
          width='100%'
          fontSize='1rem'
        >
          <Text fontWeight='700' onClick={onAddTagModalOpen}>
            + New Tag
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default Sidebar
