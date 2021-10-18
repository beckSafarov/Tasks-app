import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import TagDropdown from '../components/Sidebar/TagDropdown'

// const subtasks = [
//   { id: '1', text: 'task 1', done: false },
//   { id: '2', text: 'task 2', done: false },
//   { id: '3', text: 'task 3', done: false },
//   { id: '4', text: 'task 4', done: false },
//   { id: '5', text: 'task 5', done: false },
// ]

const TestScreen = () => {
  const [foo, setFoo] = useState(false)

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
      </div>
    </>
  )
}

export default TestScreen
