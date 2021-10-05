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
import { capitalize, isEmpty } from '../helpers'
import { TagsContext } from '../Context/TagsContext'

const TaskDrawer = ({ isOpen, onClose, task }) => {
  const { update } = useContext(TasksContext)
  const { tags } = useContext(TagsContext)
  const [vals, setVals] = useState({ ...task })
  let updated = {}
  useEffect(() => setVals({ ...task }), [task])

  const handleChanges = useCallback(
    (e) => {
      updated = { ...vals }
      updated[e.target.name] = e.target.value
      setVals(updated)
      if (e.target.name === 'tag') update({ ...task, tag: e.target.value })
    },
    [vals]
  )

  const closeHandler = (e) => {
    update(vals)
    setVals({})
    onClose(e)
  }

  return (
    <Drawer isOpen={isOpen} onClose={closeHandler} trapFocus={false}>
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
                {Object.keys(tags).map((t, i) => (
                  <option key={i} value={t}>
                    {capitalize(t)}
                  </option>
                ))}
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
