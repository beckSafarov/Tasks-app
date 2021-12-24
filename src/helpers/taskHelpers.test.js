import { sortTasks } from './tasksHelpers'

const tags = [{ tag: 'work' }, { tag: 'life' }, { tag: 'untagged' }]
const tasks = [
  { id: '1', tag: 'untagged' },
  { id: '2', tag: 'work' },
  { id: '3', tag: 'untagged' },
  { id: '4', tag: 'work' },
  { id: '5', tag: 'life' },
  { id: '6', tag: 'work' },
  { id: '7', tag: 'untaggaed' },
  { id: '8', tag: 'work' },
  { id: '9', tag: 'life' },
  { id: '10', tag: 'work' },
]

const tagSortOutcome = [
  { id: '2', tag: 'work' },
  { id: '4', tag: 'work' },
  { id: '6', tag: 'work' },
  { id: '8', tag: 'work' },
  { id: '10', tag: 'work' },
  { id: '5', tag: 'life' },
  { id: '9', tag: 'life' },
  { id: '1', tag: 'untagged' },
  { id: '3', tag: 'untagged' },
  { id: '7', tag: 'untaggaed' },
]

describe('sort tasks tests', () => {
  test('sort by tag', () => {
    expect(sortTasks(tasks, 'tag', tags)).toStrictEqual(tagSortOutcome)
  })
})
