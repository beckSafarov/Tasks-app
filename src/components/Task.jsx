import { CheckCircleIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import CircleIcon from './CircleIcon'

const Task = ({ task, onOpen, completed }) => {
  return (
    <div style={{ width: '100%', marginTop: '0.3rem' }}>
      <Flex
        w='full'
        bg='gray.100'
        pl={'10px'}
        py='5px'
        borderRadius='10px'
        fontSize='lg'
      >
        <Flex justifyContent='center' alignItems='center' mr='10px'>
          {!completed ? (
            <CircleIcon color='#808080' />
          ) : (
            <CheckCircleIcon color='blue.200' />
          )}
        </Flex>
        <Text w='full' onClick={() => onOpen(task)} py={1} cursor='pointer'>
          {!completed ? (
            task.name
          ) : (
            <Text as='s' color='gray.500'>
              {task.name}
            </Text>
          )}
        </Text>
      </Flex>
    </div>
  )
}

Task.defaultProps = {
  task: {
    name: 'unnamed',
    description: '',
  },
  onOpen: () => false,
  completed: false,
}

export default Task
