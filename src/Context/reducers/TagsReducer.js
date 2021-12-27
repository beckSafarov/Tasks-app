import produce from 'immer'
import { v4 } from 'uuid'

const TagsReducer = produce((draft, action) => {
  switch (action.type) {
    case 'loading':
      draft.loading = true
      break
    case 'error':
      draft.loading = false
      draft.error = action.error
      break
    case 'set':
      draft.loading = false
      draft.tags = action.tags
      break
    case 'add':
      draft.tags.push(action.tag)
      break
    case 'update':
      for (let tag in draft.tags) {
        if (tag.tag === action.currTag) {
          tag.tag = action.newTag
        }
      }
      break
    case 'remove':
      draft.tags = draft.tags.filter((t) => t.tag !== action.tag)
      break
    default:
      return draft
  }
})

export default TagsReducer
