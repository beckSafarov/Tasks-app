import { useState, useEffect } from 'react'

const TestScreen = () => {
  const [foo, setFoo] = useState(false)

  const toggleFoo = (e) => {}

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeydown)

  //   return () => {
  //     document.removeEventListener('keydown', handleKeydown)
  //   }
  // }, [])

  // const handleKeydown = ({ shiftKey, metaKey, key }) => {
  //   // console.log(e)
  //   if (shiftKey && metaKey && key === 'l') {
  //     console.log('you have changed the theme')
  //   }
  // }

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
