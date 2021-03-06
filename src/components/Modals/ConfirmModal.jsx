import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

const ConfirmModal = ({
  title,
  body,
  isOpen,
  onClose,
  onProceed,
  proceedTitle,
}) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{body}</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onProceed} colorScheme={'blue'}>
              {proceedTitle}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

ConfirmModal.defaultProps = {
  title: 'Are you sure?',
  body: '',
  isOpen: false,
  proceedTitle: 'Continue',
  proceedScheme: 'blue',
  onClose: () => void 0,
  onProceed: () => void 0,
}

export default ConfirmModal
