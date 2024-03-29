import {
  Box,
  FormLabel,
  Input,
  Flex,
  Button,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'

const lookUp = {
  name: { type: 'text', label: 'Name' },
  email: { type: 'email', label: 'Email' },
  password: { type: 'password', label: 'Password' },
  confirmpass: { type: 'password', label: 'Confirm Password' },
  newPass: { type: 'password', label: 'New Password' },
}

const FormBuild = ({
  show,
  onCancel,
  onSubmit,
  validationSchema,
  initialValues,
  mode,
  dontClearAfterSubmit,
}) => {
  const hasError = (form, prop) => form.touched[prop] && form.errors[prop]
  const handleSubmit = (values, onSubmitProps) => {
    if (!dontClearAfterSubmit) {
      onSubmitProps.resetForm()
      onSubmitProps.setSubmitting(false)
    }
    onSubmit(values)
  }

  return (
    <div style={{ display: !show ? 'none' : 'block' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form style={{ width: '100%' }}>
          {Object.keys(initialValues).map((prop, i) => (
            <Box mt='2' key={i}>
              <Field name={prop}>
                {({ field, form }) => (
                  <FormControl isInvalid={hasError(form, prop)}>
                    <FormLabel
                      htmlFor={prop}
                      fontSize='0.8em'
                      color={`${mode}.auth.formLabelColor`}
                    >
                      {lookUp[prop].label}
                    </FormLabel>
                    <Input
                      {...field}
                      type={lookUp[prop].type}
                      variant='outline'
                    />
                    <FormErrorMessage>{hasError(form, prop)}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
          ))}

          {/* cancel and submit buttons */}
          <Flex spacing={2} mt='5'>
            <Box px={2} flex='1'>
              <Button
                type='reset'
                onClick={onCancel}
                w='full'
                colorScheme='gray'
                boxShadow='md'
              >
                Cancel
              </Button>
            </Box>
            <Box px={2} flex='1'>
              <Button type='submit' boxShadow='md' w='full' colorScheme='blue'>
                Submit
              </Button>
            </Box>
          </Flex>
        </Form>
      </Formik>
    </div>
  )
}

FormBuild.defaultProps = {
  show: false,
  onCancel: () => void 0,
  onSubmit: () => void 0,
  validationSchema: () => {},
  dontClearAfterSubmit: false,
  mode: 'light',
}

export default FormBuild
