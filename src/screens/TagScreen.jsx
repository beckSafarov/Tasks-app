import { useContext, useEffect } from 'react'
import TasksScreen from '../components/TasksScreen'
import { TagsContext } from '../Context/TagsContext'
import { TasksContext } from '../Context/TasksContext'
import { findPropByVal } from '../helpers'

const TagScreen = ({ history, location }) => {
  const { tags } = useContext(TagsContext)
  const { tasks } = useContext(TasksContext)
  const tagId = location.pathname.split('/').slice(-1)[0]
  const tag = findPropByVal(tags, tagId)

  useEffect(() => {
    if (!tags[tag]) history.push('/')
  }, [tags, tag, history])

  return (
    <>
      <TasksScreen
        store={tasks.filter((t) => t.tag === tag)}
        tag={tag}
        title={tag}
      />
    </>
  )
}

export default TagScreen
