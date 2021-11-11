import { Box, FormLabel, Input, Flex, Button, Text } from '@chakra-ui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { capitalize } from '../helpers'

const FormBuild = ({
  show,
  onCancel,
  onSubmit,
  validationSchema,
  initialValues,
}) => {
  return (
    <div style={{ display: !show ? 'none' : 'block' }}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form style={{ width: '100%' }}>
          {Object.keys(initialValues).map((prop, i) => (
            <Box mt='2' key={i}>
              <Field name={prop}>
                {({ field, meta }) => (
                  <>
                    <FormLabel fontSize='0.8em' color='gray.500'>
                      {capitalize(prop)}
                    </FormLabel>
                    <Input
                      {...field}
                      type={prop === 'name' ? 'text' : prop}
                      variant='outline'
                      borderColor={
                        meta.touched && meta.error ? 'red.500' : 'gray.300'
                      }
                      _focus={{
                        borderColor: meta.error ? 'red.500' : 'blue.500',
                        borderWidth: '2px',
                      }}
                    />
                  </>
                )}
              </Field>
              <ErrorMessage name={prop}>
                {(msg) => <Text color='red.400'>{msg}</Text>}
              </ErrorMessage>
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
}

export default FormBuild
