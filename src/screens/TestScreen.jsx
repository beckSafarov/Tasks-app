import { useState } from 'react'

const TestScreen = () => {
  const [foo, setFoo] = useState(false)

  const toggleFoo = (e) => {}

  return (
    <div style={{ padding: '50px' }}>
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
  )
}

export default TestScreen
