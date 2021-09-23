import React from 'react'

const CircleIcon = ({ color }) => (
  <i style={{ color, cursor: 'pointer' }} className='far fa-circle'></i>
)

CircleIcon.defaultProps = {
  color: '#808080',
}

export default CircleIcon
