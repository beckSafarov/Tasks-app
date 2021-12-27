import { useState } from 'react'
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
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { defUser, getCurrUser, logout } from '../firebase/auth'
import CustomAvatar from './CustomAvatar'
import { FaEllipsisH } from 'react-icons/fa'
import * as Yup from 'yup'
import FormBuild from './FormBuild'
import ShowAlert from './ShowAlert'
import { updateCurrUser } from '../firebase/controllers'
import { renameProp } from '../helpers'

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(32, 'Too Long!')
    .required('Please enter your name'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  newPass: Yup.string()
    .min(6, 'Too Short')
    .max(32, 'Too Long!')
    .required('Please enter your new password'),
})

const defAlert = { status: 'error', text: '' }

const AccountModal = ({ show, onClose }) => {
  const user = getCurrUser() || defUser
  const [editMode, setEditMode] = useState(false)
  const [alert, setAlert] = useState(defAlert)
  const initialValues = {
    name: user.displayName,
    email: user.email,
    password: '',
    newPass: '',
  }

  const handleLogout = async () => {
    await logout()
    onClose()
    window.location.reload()
  }

  const handleUpdate = async (vals) => {
    console.log(vals)
    let updates = { ...vals }
    updates.password = updates.newPass
    updates = renameProp(vals, 'name', 'displayName')
    delete updates.newPass
    const res = await updateCurrUser(updates)
    console.log(res)
    setAlert({
      status: res.success ? 'success' : 'error',
      text: res.success ? 'Updated successfully!' : res.message,
    })
    setEditMode(!res.success)
  }

  const handleClose = (e) => {
    setEditMode(false)
    setAlert(defAlert)
    onClose(e)
  }

  return (
    <Modal isOpen={show} onClose={handleClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display='flex'>
          <Box flex='2' textAlign='right'>
            Account Info
          </Box>
          {/* edit button and icon */}

          <Box flex='1' textAlign='right'>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='menu'
                icon={<Icon as={FaEllipsisH} />}
                variant='flushed'
                borderRadius='50%'
                _hover={{ background: 'gray.100' }}
              />
              <MenuList fontSize='0.8rem'>
                <MenuItem onClick={() => setEditMode(false)}>
                  {editMode ? 'Cancel Edit' : 'Edit'}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </ModalHeader>
        <ModalBody>
          {/* read only */}
          <Flex justifyContent='center' alignItems='center' w='full' pb='10px'>
            <Flex flex='1' justifyContent='center' alignItems='center' h='full'>
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

            <Box flex='3' px='30px'>
              {/* update */}
              <ShowAlert
                show={alert.text ? 1 : 0}
                status={alert.status}
                onClose={() => setAlert(defAlert)}
              >
                {alert.text}
              </ShowAlert>
              <FormBuild
                show={editMode}
                onCancel={() => setEditMode(false)}
                onSubmit={handleUpdate}
                validationSchema={validationSchema}
                initialValues={initialValues}
              />
              {/* read only */}
              <Box hidden={editMode}>
                <Box>
                  <Text as='small' color='gray.500'>
                    Name:
                  </Text>
                  <Text as='p' color='gray.700' fontSize='1rem'>
                    {user.displayName}
                  </Text>
                </Box>
                <Box mt='2px'>
                  <Text as='small' color='gray.500'>
                    Email:
                  </Text>
                  <Text as='p' color='gray.700' fontSize='1rem'>
                    {user.email}
                  </Text>
                </Box>
                {/* <Box mt='2px'>
                  <Text as='small' color='gray.500'>
                    Password:
                  </Text>
                  <Flex justifyContent='space-between'>
                    <Text as='p' color='gray.700' fontSize='1rem'>
                      ********
                    </Text>
                  </Flex>
                </Box> */}
              </Box>
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
{
  /* <Box hidden={editMode}>
                <Text as='small' color='gray.500'>
                  Name:
                </Text>
                <Text as='p' color='gray.700' fontSize='1rem'>
                  {user.displayName}
                </Text>
              </Box>
              <Box mt='2px'>
                <Text as='small' color='gray.500'>
                  Email:
                </Text>
                <Text as='p' color='gray.700' fontSize='1rem'>
                  {user.email}
                </Text>
              </Box>
              <Box mt='2px'>
                <Text as='small' color='gray.500'>
                  Password:
                </Text>
                <Flex justifyContent='space-between'>
                  <Text as='p' color='gray.700' fontSize='1rem'>
                    ********
                  </Text>
                </Flex>
              </Box> */
}
