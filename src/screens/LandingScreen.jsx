import { Image, useColorMode, Text } from '@chakra-ui/react'
import { Flex, Heading } from '@chakra-ui/layout'
import PublicHeader from '../components/PublicHeader'

const LandingScreen = () => {
  const { colorMode: mode } = useColorMode()
  const c = `${mode}.landing`
  return (
    <Flex height='100vh' w='full' background={`${c}.bg`} alignItems='center'>
      <PublicHeader mode={mode} showLinks />
      <Flex px='70px' w='full'>
        <Flex flex='1' w='full' alignItems='center'>
          <Heading size='4xl' color={`${c}.title.color`}>
            Welcome to <br />
            <Text color={`${c}.title.highlighted`}>TaskX</Text>
          </Heading>
        </Flex>
        <Image
          boxShadow='2xl'
          flex='1'
          boxSize='400px'
          src={`/screenshot/${mode}.png`}
        />
      </Flex>
    </Flex>
  )
}

export default LandingScreen
