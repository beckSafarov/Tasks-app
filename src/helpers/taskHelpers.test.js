import { sortTasks } from './tasksHelpers'

const tags = [{ tag: 'work' }, { tag: 'life' }, { tag: 'untagged' }]
const tasks = [
  { id: '1', tag: 'untagged' },
  { id: '2', tag: 'untagged' },
  { id: '3', tag: 'work' },
  { id: '4', tag: 'work' },
  { id: '5', tag: 'life' },
  { id: '6', tag: 'life' },
]

const tagSortOutcome = [
  { id: '3', tag: 'work' },
  { id: '4', tag: 'work' },
  { id: '5', tag: 'life' },
  { id: '6', tag: 'life' },
  { id: '1', tag: 'untagged' },
  { id: '2', tag: 'untagged' },
]

describe('sort tasks tests', () => {
  test('sort by tag', () => {
    expect(sortTasks(tasks, 'tag', tags)).toStrictEqual(tagSortOutcome)
  })
})
