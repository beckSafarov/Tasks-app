import { useState, useEffect, useRef } from 'react'

const MyEditable = ({
  onSubmit,
  onChange,
  children,
  width,
  color,
  fontSize,
  placeholder,
  name,
}) => {
  const [value, setValue] = useState('')
  const [isEditable, setEditable] = useState(false)
  const style = { width, outline: 'none', fontSize, color }
  const editInput = useRef(0)

  useEffect(() => {
    if (children !== value) setValue(children)
    if (isEditable) editInput.current.focus()
  }, [children, isEditable])

  const submitHandler = (e) => {
    const updated = e.target.textContent
    setValue(updated)
    setEditable(false)
    if (updated !== children) onSubmit(updated)
  }

  const changeHandler = (e) =>
    e.keyCode === 27 ? submitHandler(e) : onChange(e)

  return (
    <>
      <div
        onClick={() => {
          setEditable(true)
        }}
        className={isEditable ? 'hidden' : ''}
        name={name}
        style={{ ...style }}
      >
        {value || <span style={{ color: '#A0AEC0' }}>{placeholder}</span>}
      </div>
      <div
        className={!isEditable ? 'hidden' : ''}
        name={name}
        onBlur={submitHandler}
        onKeyDown={changeHandler}
        style={{ ...style }}
        placeholder='Something'
        ref={editInput}
        contentEditable
        suppressContentEditableWarning
      >
        {value}
      </div>
    </>
  )
}

MyEditable.defaultProps = {
  width: 'inherit',
  onSubmit: () => void 0,
  onChange: () => void 0,
  children: '',
  color: 'inherit',
  fontSize: 'inherit',
  placeholder: '',
  name: 'MyEditable',
}

export default MyEditable
