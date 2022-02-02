import { Skeleton as Sk, Stack } from '@chakra-ui/react'

const SkeletonLoading = ({ show, count, height, spacing }) => {
  return (
    <>
      <Stack hidden={!show} spacing={spacing}>
        {[...Array(count).keys()].map((x) => (
          <Sk key={x} h={height}></Sk>
        ))}
      </Stack>
    </>
  )
}

SkeletonLoading.defaultProps = {
  show: false,
  count: 5,
  height: '50px',
  spacing: 2,
}

export default SkeletonLoading
