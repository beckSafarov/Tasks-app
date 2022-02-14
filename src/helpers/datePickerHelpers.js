import { calendarDarkTheme as cd } from '../themes'

const classes = {
  modal: '.react-datepicker',
  header: '.react-datepicker__header',
  month: '.react-datepicker__current-month',
  week: '.react-datepicker__week',
  dayName: '.react-datepicker__day-name',
  day: '.react-datepicker__day',
  dayDisabled: '.react-datepicker__day--disabled',
}

export const handleCalendarTheme = (mode) => {
  if (mode !== 'dark') return
  const dpModal = document.querySelector(classes.modal).style
  const dpHeader = document.querySelector(classes.header).style
  const currMonth = document.querySelector(classes.month).style
  const dayNames = [...document.querySelectorAll(classes.dayName)]
  dpModal.backgroundColor = cd.modal.bg
  dpModal.color = cd.modal.color
  dpModal.border = cd.modal.border
  dpHeader.backgroundColor = cd.header.bg
  dpHeader.color = cd.header.color
  currMonth.color = cd.currMonth.color
  dayNames.forEach((d) => {
    d.style.color = cd.dayNames.color
  })
}
