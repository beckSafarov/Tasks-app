import { defUser, getCurrUser, logout } from '../../firebase/auth'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Image,
  Flex,
  Box,
  Text,
  useColorMode,
  Button,
} from '@chakra-ui/react'
import CustomAvatar from '../CustomAvatar'

const AccountModal = ({ show, onClose }) => {
  const user = getCurrUser() || defUser
  const { colorMode: mode } = useColorMode()
  const dataFields = [
    { label: 'Name', value: user.displayName },
    { label: 'Email', value: user.email },
  ]
  const handleLogout = async () => {
    await logout()
    onClose()
    window.location.reload()
  }

  const handleClose = (e) => onClose(e)
  return (
    <Modal isOpen={show} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          py='0'
          pt='5px'
          display='flex'
          justifyContent='space-between'
        >
          <Box fontSize='0.8em'>Account Info</Box>

          {/* logout btn */}
          <Box textAlign='right'>
            <Button
              colorScheme='red'
              variant='ghost'
              size='sm'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </ModalHeader>
        <ModalBody>
          <Flex w='full' justifyContent='center' alignItems='center' pb='10px'>
            {/* profile photo */}
            <Flex h='full' flex='1'>
              {user.photoURL ? (
                <Image
                  borderRadius='full'
                  boxSize='90px'
                  src={user.photoURL}
                  alt='Avatar'
                />
              ) : (
                <CustomAvatar fullName={user.displayName} width='90' />
              )}
            </Flex>

            {/* the info fields */}
            <Box fontSize='0.8em' px='10px' flex='3'>
              {dataFields.map((d, i) => (
                <Box key={i} py='5px'>
                  <Text as='small' color={`${mode}.accountLabel`}>
                    {d.label}
                  </Text>
                  <Text as='p' color={`${mode}.text`} fontSize='1rem'>
                    {d.value}
                  </Text>
                </Box>
              ))}
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

AccountModal.defaultProps = {
  show: false,
  onClose: () => void 0,
}

export default AccountModal
