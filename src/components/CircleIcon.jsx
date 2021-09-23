import React from 'react'

const CircleIcon = ({ color, onClick }) => (
  <i
    onClick={onClick}
    style={{ color, cursor: 'pointer' }}
    className='far fa-circle'
  ></i>
)

CircleIcon.defaultProps = {
  color: '#808080',
  onClick: () => false,
}

export default CircleIcon
