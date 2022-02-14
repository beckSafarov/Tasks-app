import { useRef, useState, useEffect } from 'react'
import {
  FormControl,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Box,
  useColorMode,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useFormik, Formik, Form, Field } from 'formik'
import { taskSchema } from '../../Context/TasksContext'
import { v4 as uuid4 } from 'uuid'
import { textToDate } from '../../helpers/dateHelpers'
import { usePrefsContext, useTagsContext } from '../../hooks/ContextHooks'
import { useLocation } from 'react-router-dom'
import { capitalize, collect } from '../../helpers'
import produce from 'immer'
import DatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import { handleCalendarTheme } from '../../helpers/datePickerHelpers'
import useQuerySelector from '../../hooks/useQuerySelector'
import { calendarDarkTheme as cd } from '../../themes'

const dueDates = ['today', 'tomorrow', 'upcoming', 'someday']

/**
 * @TODO
 * 1. get rid of tag select ✅
 * 2. down the input build a formfield with date and tag select
 *    2.1. build the basic form ✅
 *    2.2. make the form functional ✅
 * 3. make the formfield appear only when the input is clicked or focused
 * 4. make the tag select removable in the tag pages ✅
 * 5. make the date select removable in the date pages ✅
 * 6.
 */

const BigAddTask = ({ defaultTag, defaultDate, onSubmit: addTask }) => {
  const { pathname: path } = useLocation()
  const { tags } = useTagsContext()
  const { preferences: prefs, set: setPrefs } = usePrefsContext()
  const { colorMode: mode } = useColorMode()
  const [formVals, setFormVals] = useState({
    tag: prefs.lastSelectedTag,
    dueDate: prefs.lastSelectedDate,
    upcomingDate: new Date(dayjs().add(2, 'days').toString()),
  })

  // vars
  const refToInput = useRef(null)
  const isTagPage = path.includes('tag')
  const isDatePage = Boolean(path.match(/today|tomorrow|upcoming/gi))
  const dpInput = useQuerySelector('#dpInput').style || {}
  dpInput.backgroundColor = mode === 'dark' ? cd.input : ''

  const selects = [
    { name: 'tag', list: collect(tags, 'tag'), hidden: isTagPage },
    {
      name: 'dueDate',
      list: dueDates.map((d) => capitalize(d)),
      hidden: isDatePage,
    },
  ]

  useEffect(() => {
    if (isTagPage) setFormVals({ ...formVals, tag: defaultTag })
    if (isDatePage) setFormVals({ ...formVals, dueDate: defaultDate })
  }, [path, defaultTag, defaultDate])

  const formik = useFormik({
    initialValues: {
      ...taskSchema,
      tag: formVals.tag,
      dueDate: formVals.dueDate,
      upcomingDate: formVals.upcomingDate,
    },
    validate: (v) => (v) => !v.name ? { name: 'empty' } : {},
    onSubmit: (todo, { resetForm, setSubmitting }) => {
      const chosenTag = formVals.tag || defaultTag || 'untagged'
      let chosenDate = formVals.dueDate || textToDate(defaultDate)
      if (formVals.dueDate === 'upcoming') chosenDate = todo.upcomingDate
      console.log({
        ...todo,
        id: 'uuid4()',
        tag: chosenTag,
        dueDate: chosenDate,
        upcomingDate: todo.upcomingDate,
      })
      resetForm()
      setSubmitting(false)
    },
  })
  // console.log(formik.values.upcomingDate)

  const onChange = (e) => {
    formik.handleChange(e)
    const { name, value } = e.target
    setFormVals(
      produce((draft) => {
        draft[name] = value
      })
    )
    if (name.match(/tag|dueDate/)) {
      setPrefs(
        name === 'dueDate'
          ? { ...prefs, lastSelectedDate: value }
          : { ...prefs, lastSelectedTag: value }
      )
    }
  }

  const onDateSelected = (e) => {
    console.log(e)
  }

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: 'inherit' }}>
      <FormControl pr={'20px'}>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<AddIcon color={`${mode}.addIcon`} />}
          />
          <Input
            name='name'
            ref={refToInput}
            placeholder='Add task'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            variant='flushed'
            _focus={{ borderColor: `${mode}.addTaskOnFocus` }}
          />
        </InputGroup>
      </FormControl>
      <HStack pt={5} pb={2} spacing={10}>
        {selects.map((s, i) => (
          <Box key={i} hidden={s.hidden}>
            <Select
              name={s.name}
              onChange={onChange}
              onBlur={formik.handleBlur}
              value={formVals[s.name]}
              variant='filled'
              _focus={{ borderColor: `${mode}.addTaskOnFocus` }}
              isTruncated
            >
              {s.list.map((elem, i) => (
                <option key={i} value={elem}>
                  {elem}
                </option>
              ))}
            </Select>
          </Box>
        ))}
        <Box mr={10}>
          <DatePicker
            id='dpInput'
            name='upcomingDate'
            placeholderText='Date'
            className={`calendar-input ${mode}`}
            selected={formVals.upcomingDate}
            onChange={onChange}
            onBlur={formik.onBlur}
            timeInputLabel='Time:'
            dateFormat='MM/dd/yyyy'
            onCalendarOpen={() => handleCalendarTheme(mode)}
            // shouldCloseOnSelect
            minDate={new Date()}
          />
        </Box>
        <Button type='submit' size='sm' colorScheme='blue'>
          Add
        </Button>
      </HStack>
    </form>
  )
}

BigAddTask.defaultProps = {
  page: 'All Tasks',
  onSubmit: () => void 0,
}

export default BigAddTask
