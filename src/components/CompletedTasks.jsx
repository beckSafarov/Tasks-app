import { VStack, Flex, Tag, TagLabel } from '@chakra-ui/react'
import Task from './Task'

const CompletedTasks = ({ show, onOpen, tasks }) => {
  console.log(tasks)
  return (
    <div className={show && tasks.length > 0 ? '' : 'hidden'}>
      <VStack mt='50px'>
        <Flex mb='15px' w='full'>
          <Tag
            size='lg'
            variant='outline'
            colorScheme='green'
            justifyContent='flex-start'
          >
            <TagLabel>Completed</TagLabel>
          </Tag>
        </Flex>
        {tasks.map((t, i) => (
          <Task key={i} task={t} onOpen={onOpen} completed />
        ))}
      </VStack>
    </div>
  )
}

CompletedTasks.defaultProps = {
  show: false,
  onOpen: () => false,
  tasks: [],
}

export default CompletedTasks
