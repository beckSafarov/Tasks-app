import { Box, Flex } from '@chakra-ui/layout'

import React from 'react'

const CustomAvatar = ({ fullName, width, bg, hidden, mode }) => {
  const nameSplit = fullName.trim().split(' ')
  const firstLetter = fullName.charAt(0).toUpperCase()
  const lastLetter =
    nameSplit.length > 1 ? nameSplit.pop().charAt(0).toUpperCase() : ''

  const center = (width / 100) * 50
  const radius = (width / 100) * 50
  const fontSize = width / 2 + 'px'
  return (
    <Box hidden={hidden} h={width + 'px'} w={width + 'px'}>
      <Box position='absolute' zIndex='0'>
        <svg height={width} width={width}>
          <circle cx={center} cy={center} r={radius} fill={bg} />
        </svg>
      </Box>
      <Flex
        position='relative'
        zIndex='10'
        textAlign='center'
        w='full'
        h='full'
        justifyContent='center'
        alignItems='center'
        fontSize={fontSize}
        color={`${mode}.custom_avatar_color`}
      >
        {firstLetter + lastLetter}
      </Flex>
    </Box>
  )
}

CustomAvatar.defaultProps = {
  fullName: 'User',
  width: '80',
  bg: '#80ccff',
  hidden: false,
  mode: 'light',
}

export default CustomAvatar
