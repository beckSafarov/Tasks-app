import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Text, Box } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import { Formik, Form, Field } from 'formik'
import { useState, useRef } from 'react'

const MyEditable = ({ defaultValue, onSubmit }) => {
  return (
    <>
      <Textarea
        defaultValue={defaultValue}
        variant='unstyled'
        onBlur={(e) => onSubmit(e.target.value)}
      />
    </>
  )
}

MyEditable.defaultProps = {
  defaultValue: 'lorem ipsum',
  onSubmit: () => void 0,
}

export default MyEditable
