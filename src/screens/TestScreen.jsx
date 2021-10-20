import { useState } from 'react'
import { Box, Input } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import TagDropdown from '../components/Sidebar/TagDropdown'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'

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
          <p>Selected date: {dayjs(date).format('MMM D, YYYY h:mm A')}</p>
        </Box>
      </div>
    </>
  )
}

export default TestScreen
