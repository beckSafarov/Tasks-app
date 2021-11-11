import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react'

const ShowAlert = ({ show, status, title, children, showClose, onClose }) => {
  return (
    <Alert hidden={!show} status={status}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
      <CloseButton
        onClick={onClose}
        hidden={!showClose}
        position='absolute'
        right='8px'
        top='8px'
      />
    </Alert>
  )
}

ShowAlert.defaultProps = {
  status: 'error',
  title: '',
  showClose: true,
  onClose: () => void 0,
}

export default ShowAlert
