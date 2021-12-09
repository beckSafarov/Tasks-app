import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const SkeletonStack = ({ show, n, height }) => {
  return (
    <Stack hidden={!show}>
      {[...Array(n).keys()].map((s) => (
        <Skeleton key={s} height={height} />
      ))}
    </Stack>
  )
}

SkeletonStack.defaultProps = {
  show: false,
  n: 5,
  height: '30px',
}

export default SkeletonStack
