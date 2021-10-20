import { useState } from 'react'
import { Box, Input } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import TagDropdown from '../components/Sidebar/TagDropdown'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatTaskTime } from '../helpers/tasksHelpers'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

// const subtasks = [
//   { id: '1', text: 'task 1', done: false },
//   { id: '2', text: 'task 2', done: false },
//   { id: '3', text: 'task 3', done: false },
//   { id: '4', text: 'task 4', done: false },
//   { id: '5', text: 'task 5', done: false },
// ]

const TestScreen = () => {
  const [foo, setFoo] = useState(false)
  const [date, setDate] = useState(new Date())

  const toggleFoo = (e) => {
    console.log(e.target)
    setFoo((v) => !v)
  }

  const format = {
    daysSince: (date = '2021-10-10') => dayjs(date).diff(new Date(), 'days'),
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
          {/* <Input type='date' />
          <input type='date' onChange={(e) => console.log(e.target.value)} />
          <br />
          <input type='time' name='timePicker' id='' />
          <Input type='time' /> */}
          <ReactDatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            timeInputLabel='Time:'
            dateFormat='MM/dd/yyyy h:mm aa'
            shouldCloseOnSelect={false}
            showTimeInput
          />
          <br />
          <p>Yesterday: {formatTaskTime('2021-10-19 10:55')}</p>
          <p>Today: {formatTaskTime('2021-10-20 19:30')}</p>
          <p>Tomorrow: {formatTaskTime('2021-10-21 17:30')}</p>
          <p>After tomorrow: {formatTaskTime('2021-10-22 17:30')}</p>
        </Box>
      </div>
    </>
  )
}

export default TestScreen
