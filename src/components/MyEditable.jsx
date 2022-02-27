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
  isEditableOnClick,
  isEditable: editStatus,
  submitOnEnter,
}) => {
  const [value, setValue] = useState('')
  const [isEditable, setEditable] = useState(false)
  const style = { width, outline: 'none', fontSize, color }
  const editInput = useRef(0)

  useEffect(() => {
    if (children !== value) setValue(children)
    if (isEditable) editInput.current.focus()
    if (!isEditableOnClick) setEditable(editStatus)
  }, [children, isEditable, editStatus, isEditableOnClick, value])

  const handleSubmit = (e) => {
    const updated = e.target.textContent.trim()
    setValue(updated)
    setEditable(false)
    if (updated !== children) onSubmit(updated)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (submitOnEnter) {
        e.preventDefault()
        handleSubmit(e)
      }
    } else {
      onChange(e)
    }
  }

  const handleClick = () => {
    if (isEditableOnClick) setEditable(true)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={isEditable ? 'hidden' : ''}
        name={name}
        style={{ ...style }}
      >
        {value || <span style={{ color: '#A0AEC0' }}>{placeholder}</span>}
      </div>
      <div
        id='editableDiv'
        className={!isEditable ? 'hidden' : ''}
        name={name}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
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
  isEditableOnClick: true,
  isEditable: false,
  children: '',
  color: 'inherit',
  fontSize: 'inherit',
  placeholder: '',
  name: 'MyEditable',
  submitOnEnter: false,
}

export default MyEditable
