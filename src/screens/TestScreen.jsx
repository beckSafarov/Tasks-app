import { useState } from 'react'
import { add, remove, update } from '../helpers/tasksLCS'

const TestScreen = () => {
  const [foo, setFoo] = useState(false)

  const toggleFoo = () => setFoo((v) => !v)

  const addLCS = () => {
    add({ name: 'first task', id: 1, done: false })
  }

  const removeLCS = () => remove(1)
  const updateLCS = () => update({ id: 2, done: true })

  return (
    <>
      <div style={{ width: '100%', padding: '50px' }}>
        <h2>
          <strong>Foo value: </strong>
          <span style={{ color: foo ? 'green' : 'red' }}>
            {foo ? 'true' : 'false'}
          </span>
        </h2>
        <br />
        <button style={{ border: '1px solid #ccc' }} onClick={toggleFoo}>
          Click to toggle foo
        </button>
        <br />
        <button onClick={addLCS}>add</button>
        <br />
        <button onClick={removeLCS}>remove</button>
        <br />
        <button onClick={updateLCS}>update</button>
      </div>
    </>
  )
}

export default TestScreen
