import { useContext, useState, useEffect } from 'react'
import { VStack, Flex, Tag, TagLabel } from '@chakra-ui/react'
import Task from './Task'
import { TasksContext } from '../Context/TasksContext'

const CompletedTasks = ({ show, onOpen, tag }) => {
  const { tasks: store } = useContext(TasksContext)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(store.filter((t) => (tag ? t.tag === tag && t.done : t.done)))
  }, [store, tag])

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
  tag: null,
}

export default CompletedTasks
