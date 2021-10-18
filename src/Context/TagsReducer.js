import produce, { current } from 'immer'
import { renameProp } from '../helpers'
import { setStore } from '../helpers/lcs'

const TagsReducer = produce((draft, action) => {
  let { tags } = draft
  switch (action.type) {
    case 'add':
      tags[action.tag] = action.id
      break
    case 'update':
      draft.tags = renameProp(tags, action.currTag, action.newTag)
      break
    case 'remove':
      delete draft.tags[action.tag]
      break
    default:
      return draft
  }
  setStore(draft.tags, 'tags')
})

export default TagsReducer
