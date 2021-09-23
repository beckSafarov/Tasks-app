import { useState } from 'react'

const TestScreen = () => {
  const [foo, setFoo] = useState(false)

  const toggleFoo = () => setFoo((v) => !v)

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
      </div>
    </>
  )
}

export default TestScreen
