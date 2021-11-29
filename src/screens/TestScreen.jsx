import { useState, useEffect, useContext } from 'react'
import { Box } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import TagDropdown from '../components/Sidebar/TagDropdown'
import ReactDatePicker from 'react-datepicker'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { taskTimeHandler } from '../helpers/tasksHelpers'
import AddTask2 from '../components/AddTask2'
import { getFromDB } from '../firebase/controllers'
import { signInWithGoogle } from '../firebase/auth'
import { UserContext } from '../Context/UserContext'
import { taskSchema } from '../Context/TasksContext'
import { getUserData } from '../firebase/controllers'
import {
  addTagToDB,
  removeTag,
  updateTagName,
} from '../firebase/tagsControllers'
import {
  addTaskToDB,
  removeTasksByTag,
  updateTask,
  updateTaskTags,
} from '../firebase/tasksControllers'
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

const TestScreen = () => {
  const [foo, setFoo] = useState(false)
  const [date, setDate] = useState(new Date())

  const toggleFoo = async (e) => {
    // console.log(e.target)
    // setFoo((v) => !v)
    // const db = await getFromDB('tasks')
    // console.log(db[1].id)
    console.log(await getUserData())
  }

  const addTask = async () => {
    // const addTask = await addTaskToDB({
    //   ...taskSchema,
    //   id: 'third_data',
    //   tag: 'tag_2',
    // })
    const updateTasks = updateTaskTags('tag_2', 'tag_1')
    console.log(updateTasks)
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
    </>
  )
}

export default TestScreen
