import { useState, useContext } from 'react'
import {
  FormControl,
  Input,
  Container,
  VStack,
  Box,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react'
import { TasksContext } from '../../Context/TasksContext'
import { Link } from 'react-router-dom'
import { capitalize, groupByTag } from '../../helpers'
const menuOptionHover = {
  background: 'light.sidebar_hover',
  cursor: 'pointer',
  color: 'white',
}

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const [caret, setCaret] = useState(false)
  const { tasks } = useContext(TasksContext)

  const toggleClicked = (e) => {
    onToggle(e)
    setCaret(!caret)
  }
  return (
    <Container mt='7'>
      <FormControl>
        <Input
          type='text'
          placeholder='Search a task'
          bg='white'
          borderRadius='10px'
          borderColor='light.text'
        />
      </FormControl>
      <VStack w='full' alignItems='flex-start' mt={10}>
        <Link to='/' style={{ width: '100%' }}>
          <Box
            p={2}
            display='flex'
            alignItems='flex-start'
            w={'full'}
            fontSize={18}
            color='light.sidebar_text'
            fontWeight='600'
            _hover={menuOptionHover}
            borderRadius='10px'
          >
            All Tasks
          </Box>
        </Link>
        <Box
          p={2}
          display='flex'
          alignItems='flex-start'
          justifyContent='space-between'
          w={'full'}
          fontSize={18}
          color='light.sidebar_text'
          fontWeight='600'
          borderRadius='10px'
          onClick={toggleClicked}
          _hover={menuOptionHover}
        >
          <span>Tags</span>
          <span>
            <i className={`fas fa-caret-${caret ? 'up' : 'down'}`}></i>
          </span>
        </Box>
        <Box color='light.sidebar_text' w='full'>
          <Collapse in={isOpen} animateOpacity>
            <VStack>
              {Object.keys(groupByTag(tasks)).map((tag, i) => (
                <Link key={i} to={`/tag/${tag}`} style={{ width: '100%' }}>
                  <Box
                    p={1}
                    paddingLeft={'20px'}
                    _hover={menuOptionHover}
                    w='full'
                    borderRadius='10px'
                  >
                    {capitalize(tag)}
                  </Box>
                </Link>
              ))}
            </VStack>
          </Collapse>
        </Box>
      </VStack>
    </Container>
  )
}

export default Sidebar
