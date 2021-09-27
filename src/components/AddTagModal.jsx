import { useState, useEffect } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

const AddTagModal = ({ isOpen, onSubmit, onClose }) => {
  const [tag, setTag] = useState('')
  const [error, setError] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (tag) {
      onSubmit(tag, e)
      setTag('')
      setError('')
    } else {
      setError('Please enter a tag title')
    }
  }

  const closeHandler = (e) => {
    setError('')
    setTag('')
    onClose(e)
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Tag</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                type='text'
                onChange={(e) => setTag(e.target.value)}
                placeholder='Title'
                borderColor={error ? 'red' : 'none'}
              />
              <Text color='red' pt='10px'>
                {error}
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={closeHandler}>
              Cancel
            </Button>
            <Button onClick={submitHandler} colorScheme='green'>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

AddTagModal.defaultProps = {
  onSubmit: () => void 0,
  isOpen: () => void 0,
  onClose: () => void 0,
}

export default AddTagModal
