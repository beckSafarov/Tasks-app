import { useState } from 'react'
import { Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import MyEditable from '../MyEditable'
import {
  FaRegCircle as EmptyCircle,
  FaCheckCircle as FullCircle,
  FaTimes,
} from 'react-icons/fa'

const SubTask = ({ task, onUpdate, onRemove, setDragTask, onDragDrop }) => {
  const [opacity, setOpacity] = useState('1')
  const { colorMode: mode } = useColorMode()
  const defBg = `${mode}.taskDrawer`
  const [bg, setBg] = useState('inherit')

  const onDragStart = () => {
    setOpacity('0.5')
    setDragTask(task)
  }

  const onDragEnd = () => setOpacity('1')
  const onDragEnter = () => setBg(`${mode}.subTasksHover`)
  const onDragLeave = () => setBg(defBg)
  const onDragOver = (e) => e.preventDefault()

  const onDrop = () => {
    setBg(defBg)
    onDragDrop(task)
  }

  return (
    <Flex
      alignItems='center'
      pl='2px'
      pb='2px'
      flexWrap='wrap'
      textOverflow='scroll'
      draggable='true'
      bg={bg}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragOver={onDragOver}
      opacity={opacity}
      id={task.id}
    >
      <Flex alignItems='center' flex='4'>
        <Icon
          cursor='pointer'
          mr='5px'
          onClick={() => onUpdate(task.id, 'done', !task.done)}
          as={task.done ? FullCircle : EmptyCircle}
        />
        <MyEditable onSubmit={(v) => onUpdate(task.id, 'text', v)}>
          <Text as={task.done ? 's' : ''} color={task.done ? 'gray.500' : ''}>
            {task.text || ''}
          </Text>
        </MyEditable>
      </Flex>
      {/* delete subtask icon */}
      <Flex
        onClick={() => onRemove(task.id)}
        cursor='pointer'
        flex='1'
        justifyContent='flex-end'
      >
        <Icon color='gray.500' as={FaTimes} />
      </Flex>
    </Flex>
  )
}

export default SubTask
