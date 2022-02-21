import produce from 'immer'
import { useState, useEffect } from 'react'
import MyEditable from '../components/MyEditable'

const TestScreen = () => {
  const [foo, setFoo] = useState(false)
  const [obj, setObj] = useState({ name: 'Begzod' })

  const toggleFoo = (e) => {
    setObj(
      produce((draft) => {
        draft.name = 'Tomo'
      })
    )
  }

  return (
    <div style={{ padding: '50px' }}>
      <h2>
        <strong>Foo value: </strong>
        <span style={{ color: foo ? 'green' : 'red' }}>
          {foo ? 'true' : 'false'}
        </span>
      </h2>
      <br />
      <MyEditable onSubmit={(r) => console.log(r)}>Sample text</MyEditable>
      <button
        className='jobona'
        name='my name is d'
        style={{ border: '1px solid #ccc' }}
        onClick={toggleFoo}
      >
        Click to toggle foo
      </button>
    </div>
  )
}

export default TestScreen
