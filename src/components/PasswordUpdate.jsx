import { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
// import { ShowAlert } from './ShowAlert'

const PasswordUpdate = ({ onSubmit, hidden, onCancel }) => {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [passShow, setPassShow] = useState(false)
  const [pass2Show, setPass2Show] = useState(false)
  const [alert, setAlert] = useState({
    msg: '',
    variant: '',
  })

  const submitHandler = (e) => {
    e.preventDefault()
    console.log({ oldPass, newPass })
    onSubmit({ oldPass, newPass })
  }

  return (
    <FormControl onSubmit={submitHandler} hidden={hidden}>
      {/* <ShowAlert></ShowAlert> */}
      <Box py='10px'>
        <Box pb='4px'>
          <FormLabel>Current Password: </FormLabel>
          <InputGroup size='md'>
            <Input
              pr='4.5rem'
              type={passShow ? 'text' : 'password'}
              onChange={(e) => setOldPass(e.target.value)}
            />
            <InputRightElement w='4.5rem' r='10px'>
              <Button
                h='1.75rem'
                size='sm'
                onClick={() => setPassShow(!passShow)}
                _focus={{ borderColor: 'transparent' }}
                colorScheme='gray'
              >
                {passShow ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box py='4px'>
          <FormLabel>New Password: </FormLabel>
          <InputGroup>
            <Input
              type={pass2Show ? 'text' : 'password'}
              onChange={(e) => setNewPass(e.target.value)}
            />
            <InputRightElement w='4.5rem' r='10px'>
              <Button
                h='1.75rem'
                size='sm'
                _focus={{ borderColor: 'transparent' }}
                onClick={() => setPass2Show(!pass2Show)}
                colorScheme='gray'
              >
                {pass2Show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
      <Flex py='15px' w='full' justifyContent='flex-start'>
        <Button
          type='reset'
          colorScheme='gray'
          flex='1'
          mr='10px'
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          colorScheme='green'
          flex='1'
          ml='10px'
          onClick={() => onSubmit({ oldPass, newPass })}
        >
          Submit
        </Button>
      </Flex>
    </FormControl>
  )
}

PasswordUpdate.defaultProps = {
  onSubmit: () => void 0,
  onCancel: () => void 0,
  hidden: false,
}

export default PasswordUpdate
