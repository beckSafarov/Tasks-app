import { extendTheme, theme as base } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    light: {
      tasks: '#EFF1F6', //tasks
      taskDarker: '#DEE2ED',
      sidebar_text: '#f2f2f2', //sidebar text color
      sidebar_text_highlighted: '#e6e6e6', //sidebar highlighted text color
      placeholderLight: '#8C8C8C', //lighter placeholder
      placeholder: '#808080', //input outlines, labels, placeholders, shadow
      sidebar: '#4D4D4D', //sidebar
      sidebar_hover: '#737373',
      text: '#333333', //darkest
    },
  },
  fonts: {
    heading: `Poppins, ${base.fonts?.heading}`,
    body: `Poppins, ${base.fonts?.body}`,
  },
  components: {
    Textarea: {},
    // Input: InputStyles,
    // Select: SelectStyles,
  },
})

// console.log(Object.keys(theme.components))
// console.log(Object.keys(theme.components.Textarea))
// console.log(theme.components.Textarea.variants)
// console.log(Object.keys(theme.components.Textarea.baseStyle))

export default theme
