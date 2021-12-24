import { dateDiff, daysToEndTheYear, testUpcoming } from './dateHelpers'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import dayjs from 'dayjs'
dayjs.extend(dayOfYear)

// describe('dateDiff tests', () => {
//   test('past date', () => {
//     expect(dateDiff(new Date(), new Date('12/22/2021'))).toEqual({
//       status: 'Past',
//       diff: 1,
//     })
//   })
//   test('present date', () => {
//     expect(dateDiff(new Date(), new Date('12/23/2021'))).toEqual({
//       status: 'Present',
//       diff: 0,
//     })
//   })
//   test('tomorrow date', () => {
//     expect(dateDiff(new Date(), new Date('12/24/2021'))).toEqual({
//       status: 'Future',
//       diff: 1,
//     })
//   })
//   test('future date', () => {
//     expect(dateDiff(new Date(), new Date('12/25/2021'))).toEqual({
//       status: 'Future',
//       diff: 2,
//     })
//   })
//   test('next year date', () => {
//     expect(dateDiff(new Date(), new Date('01/10/2022'))).toEqual({
//       status: 'Future',
//       diff: 18,
//     })
//   })
//   test('long next year', () => {
//     expect(dateDiff(new Date(), new Date('05/03/2022'))).toEqual({
//       status: 'Future',
//       diff: 8 + dayjs('05/03/2022').dayOfYear(),
//     })
//   })
// })

describe('isUpcoming tests', () => {
  // test('past date should be false ', () => {
  //   expect(testUpcoming('12/22/2021')).toBe(false)
  // })
  // test('present date should be false ', () => {
  //   expect(testUpcoming('12/23/2021')).toBe(false)
  // })
  // test('tomorrow date should be false ', () => {
  //   expect(testUpcoming('12/24/2021')).toBe(false)
  // })
  // test('future date should be true ', () => {
  //   expect(testUpcoming('12/25/2021')).toBe(true)
  // })
  test('next year date should be true ', () => {
    expect(testUpcoming('01/10/2022')).toBe(true)
  })
  test('long next year should be true ', () => {
    expect(testUpcoming('05/03/2022')).toBe(true)
  })
})
