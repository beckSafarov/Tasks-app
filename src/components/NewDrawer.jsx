import { useEffect, useState, useCallback, useContext } from 'react'
import { Box, Heading, HStack, VStack, Text, Divider } from '@chakra-ui/layout'
import { Select } from '@chakra-ui/select'
import { Editable, EditablePreview, EditableInput } from '@chakra-ui/editable'
import { Textarea } from '@chakra-ui/textarea'
import { TasksContext } from '../Context/TasksContext'
import { Collapse } from '@chakra-ui/transition'

const NewDrawer = ({ show, width, transition, onClose, task, tags }) => {
  const { update } = useContext(TasksContext)
  const styles = document?.querySelector('#main')?.style || {}
  const [fields, setFields] = useState({ ...task })
  let updated = {}
  useEffect(() => {
    styles.marginRight = show ? width : '0'
    styles.transition = transition
    document.addEventListener('click', outsideClicked)

    if (task && task.id !== fields.id) setFields(task)

    return () => {
      document.removeEventListener('click', outsideClicked)
    }
  }, [show, task, fields])

  const handleChanges = useCallback(
    (e) => {
      updated = { ...fields }
      updated[e.target.name] = e.target.value
      setFields(updated)
      if (e.target.name === 'tag') update({ ...task, tag: e.target.value })
    },
    [fields]
  )

  const outsideClicked = (e) => {
    if (show && !e.target.id.match(/drawer|task/)) {
      update(fields)
      onClose(fields)
    }
  }

  return (
    <Collapse in={show} animateOpacity>
      <Box
        w={width}
        position='fixed'
        zIndex='1'
        top='10px'
        bottom='20px'
        right='10px'
        bg='whiteAlpha.200'
        boxShadow='base'
        overflowX='hidden'
        transition={transition}
        color='gray.800'
        boxSizing='border-box'
        rounded='md'
        id='drawer'
      >
        <Box py={7} px='20px' id='drawer_box'>
          <Heading size='md' id='drawer_heading'>
            <Editable value={fields.name} id='drawer_editable'>
              <EditablePreview id='drawer_editable_preview' />
              <EditableInput
                id='drawer_editable_input'
                name='name'
                value={fields.name}
                onChange={handleChanges}
              />
            </Editable>
          </Heading>
          <Divider mt={2} />
          <VStack pt={8} id='drawer_body' spacing={8}>
            <HStack
              display='flex'
              alignItems='center'
              justifyContent='center'
              w='full'
              spacing={5}
              id='drawer_form'
            >
              <Text id='drawer_label' whiteSpace='nowrap'>
                Tag:{' '}
              </Text>
              <Select
                id='drawer_select'
                variant='filled'
                background='gray.100'
                size='sm'
                borderRadius='10px'
                value={fields.tag}
                name='tag'
                onChange={handleChanges}
                _focus={{ borderColor: 'transparent' }}
                isTruncated
              >
                {Object.keys(tags).map((tag, i) => (
                  <option id={`drawer_select_option_${i}`} key={i} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
            </HStack>
            <Textarea
              placeholder='Add note...'
              id='drawer_textarea'
              resize='none'
              variant='unstyled'
              height={'500px'}
              name='description'
              onChange={handleChanges}
              value={fields.description}
              hidden={!show}
            />
          </VStack>
        </Box>
      </Box>
    </Collapse>
  )
}

NewDrawer.defaultProps = {
  show: false,
  width: '250px',
  transition: '0.3s',
  onClose: () => void 0,
  task: {
    name: '',
    tag: 'untagged',
    description: '',
  },
  tags: {},
}

export default NewDrawer
/**
 * <Box
      h='100%'
      w={show ? width : '0'}
      position='fixed'
      zIndex='1'
      top='0'
      right='0'
      bg='#111'
      overflowX='hidden'
      py={7}
      px='20px'
      transition={transition}
      color='#fff'
      boxSizing='border-box'
      isTruncated
    >
      <h2>New Drawer</h2>
    </Box>
 */

/**
   * <div className={`newDrawer ${show ? 'active' : ''}`}>
      <div className='content'>
        <h1>Hello world</h1>
      </div>
    </div>
   */
