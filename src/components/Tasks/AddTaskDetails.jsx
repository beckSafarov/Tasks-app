import { useEffect, useState } from 'react'
import { useFormik, Formik, Form, Field } from 'formik'
import { useLocation } from 'react-router-dom'
import { usePrefsContext, useTagsContext } from '../../hooks/ContextHooks'
const dueDates = ['today', 'tomorrow', 'upcoming', 'someday']

const AddTaskDetails = ({ isTagPage, isDatePage, tags, mode }) => {
  const [formVals, setFormVals] = useState({
    tag: 'untagged',
    dueDate: 'today',
  })
  const { pathname: path } = useLocation()
  const { tags } = useTagsContext()

  useEffect(() => {
    if (isTagPage) setFormVals({ ...formVals, tag: defaultTag })
    if (isDatePage) setFormVals({ ...formVals, dueDate: defaultDate })
  }, [isTagPage, isDatePage])

  return (
    <Formik initialValues={{ tag: '', dueDate: '' }}>
      <Form style={{ width: '100%' }}>
        <HStack pt={5} pb={2} spacing={10}>
          <Box hidden={isTagPage} px='5px'>
            <Field name='tag'>
              {({ field }) => (
                <Select
                  {...field}
                  variant='filled'
                  _focus={{ borderColor: `${mode}.addTaskOnFocus` }}
                  isTruncated
                >
                  {tags.map((t) => (
                    <option key={t.id} value={t.tag}>
                      {t.tag}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </Box>
          <Box hidden={isDatePage} px='5px'>
            <Field>
              {({ field }) => (
                <Select
                  {...field}
                  variant='filled'
                  _focus={{ borderColor: `${mode}.addTaskOnFocus` }}
                  isTruncated
                >
                  {dueDates.map((d, i) => (
                    <option key={i} value={d}>
                      {capitalize(d)}
                    </option>
                  ))}
                </Select>
              )}
            </Field>
          </Box>
          <Box hidden={true} px='5px'>
            <p>Some date</p>
          </Box>
          <Button type='submit' size='sm' colorScheme='blue'>
            Add
          </Button>
        </HStack>
      </Form>
    </Formik>
  )
}

export default AddTaskDetails
