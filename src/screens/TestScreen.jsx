import { useState } from 'react'
import { Box, Input } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import TagDropdown from '../components/Sidebar/TagDropdown'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { taskTimeHandler } from '../helpers/tasksHelpers'
import AddTask2 from '../components/AddTask2'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

// const subtasks = [
//   { id: '1', text: 'task 1', done: false },
//   { id: '2', text: 'task 2', done: false },
//   { id: '3', text: 'task 3', done: false },
//   { id: '4', text: 'task 4', done: false },
//   { id: '5', text: 'task 5', done: false },
// ]

/**
 * <p>Yesterday: {formatTaskTime('2021-10-19 10:55')}</p>
          <p>Today: {formatTaskTime('2021-10-20 19:30')}</p>
          <p>Tomorrow: {formatTaskTime('2021-10-21 17:30')}</p>
          <p>After tomorrow: {formatTaskTime('2021-10-22 17:30')}</p>
 */

const TestScreen = () => {
  const [foo, setFoo] = useState(false)
  const [date, setDate] = useState(new Date())
  const pastDate = taskTimeHandler('2021-10-18 10:00')
  const today = taskTimeHandler('2021-10-21 9:00')
  const recentFuture = taskTimeHandler('2021-10-22')
  const future = taskTimeHandler('2021-10-23')

  const colorify = (v) => (new Date() > v ? 'red' : 'inherit')

  const toggleFoo = (e) => {
    console.log(e.target)
    setFoo((v) => !v)
  }

  const format = {
    daysSince: (date = '2021-10-10') => dayjs(date).diff(new Date(), 'days'),
  }

  const getDiff = (d1, d2) => {
    const date1 = dayjs(d1)
    const date2 = dayjs(d2)
    return date1.diff(date, 'days')
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          padding: '50px',
        }}
      >
        <Box>
          <SearchTask onSubmit={(v) => console.log(v)} />
        </Box>
        {/* <AddTagModal show={show} close={close} onSubmit={proceed} /> */}
        <TagDropdown />
        <h2>
          <strong>Foo value: </strong>
          <span style={{ color: foo ? 'green' : 'red' }}>
            {foo ? 'true' : 'false'}
          </span>
        </h2>
        <br />
        <button
          className='jobona'
          name='my name is d'
          style={{ border: '1px solid #ccc' }}
          onClick={toggleFoo}
        >
          Click to toggle foo
        </button>

        <br />
        <p>Past Date: {format.daysSince('2021-10-18')}</p>
        <br />

        <Box mt='30px'>
          <ReactDatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            timeInputLabel='Time:'
            dateFormat='MM/dd/yyyy h:mm aa'
            shouldCloseOnSelect={false}
            showTimeInput
          />
          <br />
          <AddTask2 defaultDate='Someday' page='All Tasks' />
        </Box>
      </div>
    </>
  )
}

export default TestScreen
