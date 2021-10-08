import { useContext, useState, useEffect } from 'react'
import { TagsContext } from '../Context/TagsContext'
import { Box } from '@chakra-ui/react'
import SearchTask from '../components/SearchTask'
import { PreferencesContext } from '../Context/PreferencesContext'
import TagDropdown from '../components/Sidebar/TagDropdown'

const TestScreen = () => {
  const [foo, setFoo] = useState(false)
  const { tags, add, update, remove } = useContext(TagsContext)

  const myTask = {
    name: 'Sample task',
    tag: 'work',
    description: '',
  }
  const myTags = {
    untagged: '',
    work: '',
    personal: '',
  }
  const toggleFoo = (e) => {
    console.log(e.target)
    setFoo((v) => !v)
  }

  const addLCS = () => add('personal')

  const removeLCS = () => remove('aromat')
  const updateLCS = () => update('personal', 'aromat')

  const proceed = (tag) => {
    console.log(tag)
    // setClose(true)
  }

  const changeHandler = (newValue) => {
    console.log(newValue)
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
          style={{ border: '1px solid #ccc' }}
          onClick={toggleFoo}
        >
          Click to toggle foo
        </button>
        {/* <br />
        <button onClick={addLCS}>add</button>
        <br />
        <button onClick={removeLCS}>remove</button>
        <br />
        <button onClick={updateLCS}>update</button>
        <br /> */}
        {/* <button onClick={() => console.log(tags)}>print</button>
        <br />
        <button onClick={() => setShow(true)}>open modal</button> */}
      </div>
    </>
  )
}

export default TestScreen
