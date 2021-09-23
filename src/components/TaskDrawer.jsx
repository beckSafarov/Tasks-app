import { useContext, useState, useCallback, useEffect } from 'react'
import {
  HStack,
  VStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Editable,
  EditablePreview,
  EditableInput,
  Select,
  Textarea,
} from '@chakra-ui/react'
import { TasksContext } from '../Context/TasksContext'
import produce from 'immer'
import { isEmpty } from '../helpers'

const TaskDrawer = ({ isOpen, onClose, task }) => {
  const { update } = useContext(TasksContext)
  const [vals, setVals] = useState({})
  const [change, setChange] = useState(false)
  useEffect(() => {
    if (!isEmpty(task) && (isEmpty(vals) || task.id !== vals.id)) {
      setVals({ ...task })
    }

    if (change) {
      update(vals)
      setChange(false)
    }
  }, [vals, task, update])

  const handleChanges = useCallback(
    (e) => {
      setVals(
        produce((draft) => {
          draft[e.target.name] = e.target.value
        })
      )
      setChange(true)
    },
    [vals]
  )

  return (
    <Drawer isOpen={isOpen} onClose={onClose} trapFocus={false}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader mt={6}>
          <Editable value={vals.name || ''}>
            <EditablePreview />
            <EditableInput
              value={vals.name || ''}
              name='name'
              onChange={handleChanges}
            />
          </Editable>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={8}>
            <HStack
              display='flex'
              alignItems='center'
              justifyContent='center'
              w='full'
              spacing={5}
            >
              <Text>Tag: </Text>
              <Select
                variant='filled'
                size='sm'
                borderRadius='10px'
                defaultValue={vals.tag}
                name='tag'
                onChange={handleChanges}
                _focus={{ borderColor: 'transparent' }}
              >
                <option value='untagged'>Untagged</option>
                <option value='work'>Work</option>
              </Select>
            </HStack>
            <Textarea
              placeholder='Add note...'
              resize='none'
              variant='unstyled'
              height={'700px'}
              name='description'
              onChange={handleChanges}
              defaultValue={vals.description}
            />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
TaskDrawer.defaultProps = {
  isOpen: () => false,
  onClose: () => false,
  task: {},
}

export default TaskDrawer
