import { useRef } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'

const AddTagModal = ({ isOpen, onSubmit, onClose, tags }) => {
  const refToInput = useRef(null)
  const hasError = (form) => form.touched.tag && form.errors.tag
  const validate = ({ tag }) => {
    const res = {}
    if (!tag) res.tag = 'Please enter a tag title'
    if (tags.find((t) => t.tag.toLowerCase() === tag.toLowerCase()))
      res.tag = 'Such tag already exists'
    return res
  }

  const handleSubmit = ({ tag }) => onSubmit(tag)
  const closeHandler = (e) => onClose(e)

  return (
    <Modal isOpen={isOpen} onClose={closeHandler} initialFocusRef={refToInput}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Tag</ModalHeader>
        <ModalCloseButton _focus={{ border: 'none' }} />
        <ModalBody>
          <Formik
            initialValues={{ tag: '' }}
            onSubmit={handleSubmit}
            validate={validate}
          >
            {() => (
              <Form style={{ width: '100%' }}>
                <Field name='tag'>
                  {({ field, form }) => (
                    <FormControl isInvalid={hasError(form)}>
                      <Input
                        id='tag'
                        ref={refToInput}
                        type='text'
                        placeholder='Title'
                        variant='flushed'
                        {...field}
                      />
                      <FormErrorMessage>{hasError(form)}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Box py='20px'>
                  <Button type='submit' colorScheme='blue' w='full'>
                    Save
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

AddTagModal.defaultProps = {
  onSubmit: () => void 0,
  isOpen: () => void 0,
  onClose: () => void 0,
  tags: {},
}

export default AddTagModal
