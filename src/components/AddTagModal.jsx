import { useState, useEffect, useRef } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  FormControl,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const AddTagModal = ({ isOpen, onSubmit, onClose, tags }) => {
  const validate = ({ tag }) => {
    const res = {}
    if (!tag) res.tag = 'Please enter a tag title'
    if (tags[tag]) res.tag = 'Such tag already exists'
    return res
  }

  const submitHandler = ({ tag }) => onSubmit(tag)
  const closeHandler = (e) => onClose(e)
  const handleBorderColor = ({ tag }) => ({
    borderColor: tag ? 'red.500' : '',
  })

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Tag</ModalHeader>
        <ModalCloseButton _focus={{ border: 'none' }} />
        <ModalBody>
          <Formik
            initialValues={{ tag: '' }}
            onSubmit={submitHandler}
            validate={validate}
          >
            {({ errors }) => (
              <Form style={{ width: '100%' }}>
                <Field name='tag'>
                  {({ field }) => (
                    <Input
                      id='tag'
                      type='text'
                      placeholder='Title'
                      variant='flushed'
                      borderColor={handleBorderColor(errors)}
                      _focus={handleBorderColor(errors)}
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage name='tag'>
                  {(msg) => (
                    <Text py='2' color='red.500'>
                      {msg}
                    </Text>
                  )}
                </ErrorMessage>
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
