import { extendTheme, theme as base } from '@chakra-ui/react'
import { darkGreyTheme, lightGreyTheme, notionTheme } from './themeBlocks'

const theme = extendTheme({
  colors: {
    light: {
      // # defaults
      text: '#333333',
      // ##task related
      tasks: '#EFF1F6',
      taskText: '#333',
      taskTag: '#718096',
      addIcon: '#808080',
      addTaskOnFocus: '#808080',
      // ## search related
      searchBg: '#EFF1F6',
      searchIcon: '#808080',
      searchOnFocus: '#808080',
      // ## final designs
      ...notionTheme,
    },
    dark: {},
  },
  fonts: {
    heading: `Poppins, ${base.fonts?.heading}`,
    body: `Poppins, ${base.fonts?.body}`,
  },
  components: {
    Button: {
      baseStyle: {
        _focus: { boxShadow: 'none' },
        _active: { boxShadow: 'none' },
      },
    },
    Textarea: {},
    Editable: {
      baseStyle: {
        input: {
          width: 'sm',
        },
      },
    },
    Tooltip: {
      baseStyle: {
        borderRadius: 'md',
      },
    },

    // Input: InputStyles,
    // Select: SelectStyles,
  },
})

// console.log(Object.keys(theme.components.Button.baseStyle._focus))
// console.log(Object.keys(theme.components.Editable.baseStyle.preview))
// console.log(theme.components.Tooltip)
// console.log(Object.keys(theme.componen1ts.Textarea.baseStyle))

export default theme
