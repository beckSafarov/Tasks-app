import { extendTheme, theme as base } from '@chakra-ui/react'

export const calendarDarkTheme = {
  input: '#2D384D',
  modal: {
    bg: '#2D384D',
    color: '#edf2f7',
    border: '1px solid #e2e8f0',
  },
  header: { color: '#fff', bg: '#1a202c' },
  currMonth: { color: '#edf2f7' },
  dayNames: { color: '#fff' },
}

const theme = extendTheme({
  colors: {
    light: {
      // generals
      text: '#333',

      // landing screen
      landing: {
        bg: '#fffefc',
        titleColor: '#333',
        title: {
          color: '#333',
          highlighted: '#319795',
        },
      },

      auth: {
        bg: '#FFFEFC',
        linkColor: '#3182ce',
        googleBtn: {
          bg: '#e16259',
          color: '#EDF2F7',
          borderColor: '#c22e24',
        },
        emailBtn: {
          bg: 'inherit',
          color: '#333',
          borderColor: '#333',
        },
        forgot: {
          color: '#4A5568',
          hoverColor: '#2b6cb0',
        },
        formLabelColor: '#718096',
      },

      // sidebar
      sidebar: '#f7f6f3',
      sidebarText: '#333',
      sidebarHoverText: '#000',
      sidebarActiveLink: '#dfe5ef',
      customAvatarColor: '#2D3748', //gray.700

      // task header
      taskHeaderBg: '#fff',
      taskHeaderTxt: '#333',
      headerBorder: '#f4f4f4',
      headerHeading: '#1A202C',
      headerMenuBtnHover: '#EDF2F7',

      // add task
      addIcon: '#808080',
      addTaskOnFocus: '#808080',

      // tasks
      tasks: '#f7f6f3', //tasks
      taskActive: '#E7EAEE',
      taskTag: '#718096', //gray.500
      taskText: '#333',
      taskCircle: '#718096', //gray.500
      taskFuture: '#718096', //gray.500
      taskPast: '#F56565',
      completedTaskCircle: '#90cdf4',
      crossedTask: '#718096',
      taskIcon: '#4A5568', //gray.600

      //taskdrawer
      taskDrawer: 'whiteAlpha.200',
      taskDrawerText: '#333',
      drawerBorder: '#E2E8F0',
      drawerActionsHover: '#E2E8F0',
      subTasksHover: '#D5EEF8',

      //search task
      searchBg: '#f7f6f3',
      searchIcon: '#808080',
      searchOnFocus: '#808080',

      // account window
      accountLabel: '#718096', //gray.500
    },
    dark: {
      //generals
      text: '#EDF2F7',

      // landing screen
      landing: {
        bg: '#1A202C',
        title: {
          color: 'EDF2F7',
          highlighted: '#4FD1C5',
        },
      },

      auth: {
        bg: '#1A202C',
        linkColor: '#5a9bd8',
        googleBtn: {
          bg: '#e16259',
          color: '#EDF2F7',
          borderColor: '#fc1d1d',
        },
        emailBtn: {
          bg: 'inherit',
          color: '#EDF2F7',
          borderColor: '#EDF2F7',
        },
        forgot: {
          color: '#b9cbdf',
          hoverColor: '#2b6cb0',
        },
        formLabeLColor: 'b9cbdf',
      },

      // sidebar
      sidebar: '#2D384D',
      sidebarText: '#D5E0EC',
      sidebar_hover: '#262F40',
      sidebarHoverText: '#fff',
      sidebarActiveLink: '#262F40',
      customAvatarColor: '#2D3748', //gray.700

      //task header
      taskHeaderBg: '#1A202C',
      taskHeaderTxt: '#EDF2F7',
      headerBorder: '#2D384D',
      headerHeading: '#EDF2F7',
      headerMenuBtnHover: '#2D384D',

      // add task
      addIcon: '#2D384D',
      addTaskOnFocus: '#2D384D',

      // tasks
      tasks: '#2D384D',
      taskActive: '#262F40',
      taskTag: '#b9cbdf',
      taskText: '#EDF2F7',
      taskCircle: '#EDF2F7',
      taskFuture: '#b9cbdf',
      taskPast: '#F56565',
      completedTaskCircle: '#90cdf4',
      crossedTask: '#718096',
      taskIcon: '#b9cbdf',

      // task drawer
      taskDrawer: '#2D384D',
      taskDrawerText: '#EDF2F7',
      drawerBorder: '#E2E8F0',
      drawerActionsHover: '#394760',
      subTasksHover: '#272E3F',

      // search
      searchBg: '#2D384D',
      searchIcon: '#808080',
      searchOnFocus: '#3E4B65',

      // account window
      accountLabel: '#b9cbdf',
    },
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
