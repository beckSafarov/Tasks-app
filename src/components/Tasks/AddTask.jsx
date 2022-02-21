import { useRef, useState, useEffect } from 'react'
import {
  FormControl,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Box,
  useColorMode,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
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

const AddTask = ({ defaultTag, defaultDate, onSubmit: addTask }) => {
  const { pathname: path } = useLocation()
  const { tags } = useTagsContext()
  const { preferences: prefs, set: setPrefs } = usePrefsContext()
  const { colorMode: mode } = useColorMode()
  const [fullForm, setFullForm] = useState(false)
  const [formVals, setFormVals] = useState({
    name: '',
    tag: prefs.lastSelectedTag,
    dueDate: prefs.lastSelectedDate,
    upcomingDate: new Date(dayjs().add(2, 'days').toString()),
  })

  // vars
  const refToInput = useRef(null)
  const isTagPage = path.includes('tag')
  const isDatePage = Boolean(path.match(/today|tomorrow|upcoming/gi))
  const hideDatePicker =
    formVals.dueDate !== 'Upcoming' && defaultDate !== 'upcoming'
  const dpInput = useQuerySelector('#dpInputAddTask').style || {}
  dpInput.background = mode === 'dark' ? cd.input : ''

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
    window.addEventListener('click', onMouseClick)
    return () => {
      window.removeEventListener('click', onMouseClick)
    }
  }, [path, defaultTag, defaultDate])

  const handleChange = ({ target }) => {
    setFormVals(
      produce((draft) => {
        draft[target.name] = target.value
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formVals.name) return
    const chosenDate = textToDate(formVals.dueDate, formVals.upcomingDate)

    addTask({
      ...taskSchema,
      name: formVals.name,
      id: uuid4(),
      tag: formVals.tag,
      dueDate: chosenDate,
      upcomingDate: formVals.upcomingDate,
    })
    setPrefs({
      ...prefs,
      lastSelectedDate: formVals.dueDate,
      lastSelectedTag: formVals.tag,
    })
    setFormVals({ ...formVals, name: '' })
  }

  const submitOnEnter = (e) => {
    if (e.key === 13) handleSubmit({ preventDefault: () => void 0 })
  }

  const onInputFocus = () => setFullForm(true)

  const onMouseClick = (e) => {
    if (e.target.id.match(/main|container|completedTasksList|tasksContainer/)) {
      setFullForm(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: 'inherit' }}>
      <FormControl pr='20px'>
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
            onChange={handleChange}
            value={formVals.name}
            variant='flushed'
            onKeyDown={submitOnEnter}
            onFocus={onInputFocus}
            _focus={{ borderColor: `${mode}.addTaskOnFocus` }}
          />
        </InputGroup>
      </FormControl>
      <HStack pt={5} hidden={!fullForm} spacing={10}>
        {selects.map((s, i) => (
          <Box key={i} hidden={s.hidden}>
            <Select
              name={s.name}
              onChange={handleChange}
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
        <Box hidden={hideDatePicker}>
          <DatePicker
            id='dpInputAddTask'
            placeholderText='Date'
            className={`calendar-input ${mode}`}
            selected={formVals.upcomingDate}
            onChange={(v) =>
              handleChange({ target: { name: 'upcomingDate', value: v } })
            }
            dateFormat='MM/dd/yyyy'
            onCalendarOpen={() => handleCalendarTheme(mode)}
            minDate={new Date()}
          />
        </Box>
        <Button
          disabled={!formVals.name}
          type='submit'
          size='sm'
          colorScheme='blue'
        >
          Add
        </Button>
      </HStack>
    </form>
  )
}

AddTask.defaultProps = {
  defaultTag: 'untagged',
  page: 'All Tasks',
  onSubmit: () => void 0,
}

export default AddTask
