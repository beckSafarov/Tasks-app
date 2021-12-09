import { useState, useEffect, useContext } from 'react'
import { Box } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import TagDropdown from '../components/Sidebar/TagDropdown'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import AddTask2 from '../components/AddTask2'
import { taskSchema, TasksContext } from '../Context/TasksContext'
import { AppContext } from '../Context/AppContext'
import Auth from '../components/Auth'
import usePageData from '../hooks/usePageData'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const TestScreen = () => {
  const [foo, setFoo] = useState(false)
  const [date, setDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const {
    loading: updateLoading,
    add: addTaskToDB,
    data: updatedData,
    error,
  } = useContext(TasksContext)
  const {
    loading: appLoading,
    getData,
    data,
    error: appErr,
  } = useContext(AppContext)

  const pageData = usePageData({
    pathname: 'http://localhost:3000/',
  })
  console.log(pageData)

  const loading = updateLoading || appLoading

  const toggleFoo = async (e) => {
    await getData()
  }

  const addTask = async () => {
    await addTaskToDB({ ...taskSchema, id: 'sixth_data', tag: 'tag_2' })
  }

  const format = {
    daysSince: (date = '2021-10-10') => dayjs(date).diff(new Date(), 'days'),
  }

  return (
    <Auth redirect='/login'>
      <div>
        {loading ? 'Loading...' : ''}
        {/* {data && console.log(data)}
        {error && console.log(error)} */}
      </div>
      <br />
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
        <button className='btn' onClick={addTask}>
          Add Task
        </button>

        <br />
        <p>Past Date: {format.daysSince('2021-10-18')}</p>
        <br />

        {/* <AccountModal show /> */}

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
    </Auth>
  )
}

export default TestScreen
