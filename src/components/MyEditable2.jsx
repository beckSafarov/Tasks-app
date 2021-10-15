import { useState, useEffect } from 'react'
import { Textarea } from '@chakra-ui/react'

const MyEditable2 = () => {
  const [text, setText] = useState('')
  const [cols, setCols] = useState(50)
  const [rows, setRows] = useState(1)

  useEffect(() => {
    console.log(document.querySelector('#myTextField').rows)
    console.log(document.querySelector('#myTextField').cols)
  }, [])
  // console.log(document.querySelector('#myTextField').rows)
  // console.log(document.querySelector('#myTextField').cols)

  const handleChange = (e) => {
    if (e.target.value.length % cols === 0) {
      setRows(rows + 1)
    }
  }

  return (
    <div>
      <Textarea
        id='myTextField'
        defaultValue='fewfefewf weewfe ewfew fwefewf we ewfewew fewewfwf'
        width={'fit-content'}
        resize='none'
        cols={cols}
        rows={rows}
        onChange={handleChange}
      />
      {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit
      nihil commodi voluptates sapiente pariatur aperiam vel omnis, ad eius!
      Tempora aut sunt, ea repellendus cupiditate voluptates est maiores aliquam
      provident facilis dignissimos eius corrupti, voluptatibus natus odit
      voluptatum assumenda quae? Nihil ab doloribus minus sed fugiat, eaque
      ducimus autem aliquid? */}
    </div>
  )
}

export default MyEditable2
