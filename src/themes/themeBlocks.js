// --- sidebar themes ---

// the old dark grey sidebar
const darkGreySB = {
  sidebar: '#4D4D4D',
  sidebar_text: '#f2f2f2',
  sidebar_hover: '#737373',
  sidebar_hover_text: '#fff',
}
const lightGreySB = {
  sidebar: '#EFF1F6',
  sidebar_text: '#333',
  sidebar_hover: '#dfe5ef',
  sidebar_hover_text: '#333',
}
const notionSB = {
  sidebar: '#f7f6f3',
  sidebar_text: '#333',
  sidebar_hover: '#dfe5ef',
  sidebar_hover_text: '#333',
}

// --- themes ---
const darkGreyTheme = {
  ...darkGreySB,
  tasks: '#EFF1F6',
  taskText: '#333',
  taskTag: '#718096',
  searchBg: '#EFF1F6',
  tasks: '#EFF1F6', //tasks
  taskDrawer: 'whiteAlpha.200',
  taskDrawerText: 'gray.800',
}
const lightGreyTheme = {
  ...lightGreySB,
  tasks: '#EFF1F6',
  taskText: '#333',
  taskTag: '#718096',
  searchBg: '#EFF1F6',
  tasks: '#EFF1F6', //tasks
  taskDrawer: 'whiteAlpha.200',
  taskDrawerText: 'gray.800',
}
const notionTheme = {
  ...notionSB,
  tasks: '#f7f6f3', //tasks
  tasksText: '#333',
  taskTag: '#718096',
  taskDrawer: 'whiteAlpha.200',
  taskDrawerText: '#333',
  searchBg: '#f7f6f3',
}

export { darkGreyTheme, lightGreyTheme, notionTheme }
